import { google } from '@ai-sdk/google';

// Use the pro model to avoid the high demand limits of the flash-latest endpoint
export const chatModel = google('gemini-1.5-pro-latest');
