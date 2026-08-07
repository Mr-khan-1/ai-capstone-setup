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
      
      const checks: Array<{ id: string, label: string, status: "good" | "warning" | "critical", detail: string }> = [];

      // Extract title
      const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : '';
      
      if (!title) {
        checks.push({ id: "title-length", label: "Title Length", status: "critical", detail: "Missing title tag." });
      } else if (title.length < 30) {
        checks.push({ id: "title-length", label: "Title Length", status: "warning", detail: `${title.length} characters — too short (ideal is 30-60).` });
      } else if (title.length > 60) {
        checks.push({ id: "title-length", label: "Title Length", status: "warning", detail: `${title.length} characters — too long (ideal is 30-60).` });
      } else {
        checks.push({ id: "title-length", label: "Title Length", status: "good", detail: `${title.length} characters — within the ideal 30-60 range.` });
      }

      // Extract meta description
      const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i) 
                          || html.match(/<meta[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["'][^>]*>/i);
      const description = metaDescMatch ? metaDescMatch[1].trim() : '';
      
      if (!description) {
        checks.push({ id: "meta-description", label: "Meta Description", status: "critical", detail: "Missing meta description." });
      } else if (description.length < 70) {
        checks.push({ id: "meta-description", label: "Meta Description", status: "warning", detail: `${description.length} characters — too short (ideal is 70-160).` });
      } else if (description.length > 160) {
        checks.push({ id: "meta-description", label: "Meta Description", status: "warning", detail: `${description.length} characters — too long (ideal is 70-160).` });
      } else {
        checks.push({ id: "meta-description", label: "Meta Description", status: "good", detail: `${description.length} characters — within the ideal 70-160 range.` });
      }

      // Headings
      const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
      const h2Count = (html.match(/<h2[^>]*>/gi) || []).length;
      const h3Count = (html.match(/<h3[^>]*>/gi) || []).length;
      
      if (h1Count === 0) {
        checks.push({ id: "h1-presence", label: "Heading Structure", status: "critical", detail: `No H1 tag found. Found ${h2Count} H2s, ${h3Count} H3s.` });
      } else if (h1Count > 1) {
        checks.push({ id: "h1-presence", label: "Heading Structure", status: "warning", detail: `Multiple H1 tags found (${h1Count}). There should ideally be exactly one per page.` });
      } else {
        checks.push({ id: "h1-presence", label: "Heading Structure", status: "good", detail: `Exactly one H1 tag found. Found ${h2Count} H2s, ${h3Count} H3s.` });
      }

      // Canonical tag
      const hasCanonical = /<link[^>]*rel=["']canonical["'][^>]*>/i.test(html) || /<link[^>]*href=["'][^"']*["'][^>]*rel=["']canonical["'][^>]*>/i.test(html);
      if (hasCanonical) {
        checks.push({ id: "canonical", label: "Canonical Tag", status: "good", detail: "Canonical tag is present." });
      } else {
        checks.push({ id: "canonical", label: "Canonical Tag", status: "warning", detail: "Missing canonical tag." });
      }

      // Viewport meta tag
      const hasViewport = /<meta[^>]*name=["']viewport["'][^>]*>/i.test(html) || /<meta[^>]*content=["'][^"']*["'][^>]*name=["']viewport["'][^>]*>/i.test(html);
      if (hasViewport) {
        checks.push({ id: "viewport", label: "Viewport Tag", status: "good", detail: "Viewport meta tag is present." });
      } else {
        checks.push({ id: "viewport", label: "Viewport Tag", status: "critical", detail: "Missing viewport meta tag (affects mobile accessibility)." });
      }

      // Count images and images missing alt
      const imgMatches = html.match(/<img[^>]*>/gi) || [];
      const totalImages = imgMatches.length;
      
      let imagesMissingAlt = 0;
      for (const img of imgMatches) {
        if (!/alt=["']/i.test(img)) {
          imagesMissingAlt++;
        }
      }
      
      if (totalImages === 0) {
         checks.push({ id: "image-alt", label: "Image Alt Text", status: "good", detail: "No images found on page." });
      } else {
         const coverage = Math.round(((totalImages - imagesMissingAlt) / totalImages) * 100);
         if (imagesMissingAlt === 0) {
           checks.push({ id: "image-alt", label: "Image Alt Text", status: "good", detail: `100% coverage (${totalImages} images).` });
         } else if (coverage >= 80) {
           checks.push({ id: "image-alt", label: "Image Alt Text", status: "warning", detail: `${coverage}% coverage (${imagesMissingAlt} of ${totalImages} missing alt).` });
         } else {
           checks.push({ id: "image-alt", label: "Image Alt Text", status: "critical", detail: `Only ${coverage}% coverage (${imagesMissingAlt} of ${totalImages} missing alt).` });
         }
      }

      // Compute score
      let score = 100;
      for (const check of checks) {
        if (check.status === "critical") score -= 15;
        if (check.status === "warning") score -= 5;
      }
      if (score < 0) score = 0;

      return {
        url,
        title: title || 'No title found',
        description: description || 'No meta description found',
        h1Count,
        totalImages,
        imagesMissingAlt,
        checks,
        score
      };
    } catch (error) {
      return { error: `Could not fetch ${url}. It may be unreachable or blocking automated requests.` };
    }
  },
});
