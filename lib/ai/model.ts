import { google } from '@ai-sdk/google';

// Using gemini-2.5-flash as it is fully supported by your API key and avoids 'latest' alias demand limits
export const chatModel = google('gemini-2.5-flash');
