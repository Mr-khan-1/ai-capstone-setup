import { tool } from 'ai';
import { z } from 'zod';

export const auditPageTool = tool({
  description: 'Fetches raw HTML for a given URL and extracts basic SEO/accessibility signals.',
  parameters: z.object({
    url: z.string().describe("The full URL to audit, including https://"),
  }),
  execute: async ({ url }) => {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'SiteScope-AI-Bot/1.0',
        },
      });

      if (!response.ok) {
        return { error: `Could not fetch ${url}. It may be unreachable or blocking automated requests.` };
      }

      const html = await response.text();

      // Extract title
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : 'No title found';

      // Extract meta description
      const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i) 
                          || html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["'][^>]*>/i);
      const description = metaDescMatch ? metaDescMatch[1].trim() : 'No meta description found';

      // Count H1 tags
      const h1Matches = html.match(/<h1[^>]*>/gi);
      const h1Count = h1Matches ? h1Matches.length : 0;

      // Count images and images missing alt
      const imgMatches = html.match(/<img[^>]*>/gi) || [];
      const totalImages = imgMatches.length;
      
      let imagesMissingAlt = 0;
      for (const img of imgMatches) {
        // check if it has an alt attribute
        if (!/alt=["']/i.test(img)) {
          imagesMissingAlt++;
        }
      }

      return {
        url,
        title,
        description,
        h1Count,
        totalImages,
        imagesMissingAlt,
      };
    } catch (error) {
      return { error: `Could not fetch ${url}. It may be unreachable or blocking automated requests.` };
    }
  },
});
