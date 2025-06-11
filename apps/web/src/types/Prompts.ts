import { UUIDTypes } from "uuid";

// 提示词的类型
export type Prompt = {
  id: UUIDTypes;
  title: string;
  content: string;
  category: string;
  tags: string[];
  updatedAt: string;
};
