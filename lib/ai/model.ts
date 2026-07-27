import { google } from '@ai-sdk/google';

// Export the configured model instance to keep route handlers clean
// Using gemini-1.5-flash as it's the standard for fast, high-quality streaming chat
export const chatModel = google('gemini-1.5-flash');
