import { chatModel } from './model';
import { SYSTEM_PROMPT } from './system-prompt';

export const AI_CONFIG = {
  model: chatModel,
  system: SYSTEM_PROMPT,
  temperature: 0.5,
  maxTokens: 2000,
};
