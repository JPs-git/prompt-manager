import { Prompt } from "@/types/Prompts";

// 提示词工厂
export const promptFactory = (prompt: Prompt) => {
  const { title, content, category, tags } = prompt;
  const newPrompt = {
    title,
    content,
    category,
    tags: tags || [],
    updatedAt: new Date().toISOString(),
  };
  return newPrompt;
};



