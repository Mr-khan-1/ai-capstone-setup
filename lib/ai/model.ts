import { google } from '@ai-sdk/google';

// Export the configured model instance to keep route handlers clean
export const chatModel = google('gemini-flash-latest');
