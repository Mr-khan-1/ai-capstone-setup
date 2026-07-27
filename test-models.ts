import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testModel() {
  try {
    const { text } = await generateText({
      model: google('gemini-flash-latest'),
      prompt: 'Hello, world!',
    });
    console.log(`Success:`, text);
  } catch (error: any) {
    console.error(`Failed:`, error.message);
  }
}

testModel();
