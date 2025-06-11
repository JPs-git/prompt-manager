import { Prompt } from "@/types/Prompts";
import { v4 as uuidv4 } from 'uuid';

// 提示词工厂
export const promptFactory = (prompt: Prompt) => {
  const { title, content, category, tags } = prompt;
  const newPrompt = {
    id: uuidv4(),
    title,
    content,
    category,
    tags: tags || [],
    updatedAt: new Date().toISOString(),
  };
  return newPrompt;
};



