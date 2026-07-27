import { streamText } from 'ai';
import { AI_CONFIG } from '@/lib/ai/config';

// Next.js Route Handler for streaming chat
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: AI_CONFIG.model,
      system: AI_CONFIG.system,
      messages,
      temperature: AI_CONFIG.temperature,
      maxTokens: AI_CONFIG.maxTokens,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
