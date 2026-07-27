import { streamText } from 'ai';
import { AI_CONFIG } from '@/lib/ai/config';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log('Received messages:', JSON.stringify(messages, null, 2));

    const result = streamText({
      model: AI_CONFIG.model,
      system: AI_CONFIG.system,
      messages,
      temperature: AI_CONFIG.temperature,
      maxTokens: AI_CONFIG.maxTokens,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        console.error('AI SDK Stream Error:', error);
        return String(error);
      }
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
