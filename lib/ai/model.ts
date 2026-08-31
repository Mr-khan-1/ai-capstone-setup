import { google } from '@ai-sdk/google';

// Use the stable identifier to avoid high demand preview endpoints
export const chatModel = google('gemini-1.5-flash');
