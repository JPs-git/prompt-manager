import { Prompt } from "@/types/Prompts";

// 使用策略模式根据登录状态判断使用本地存储或者调用接口(接口待定)
interface DeletePromptStrategy {
  deletePrompt: (id: string) => Promise<boolean>;
}

class LocalDeletePrompt implements DeletePromptStrategy {
  deletePrompt(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const prompts = JSON.parse(localStorage.getItem("prompts") || "[]");
        const index = prompts.findIndex((p: Prompt) => p.id === id);
        if (index !== -1) {
          prompts.splice(index, 1);
        }
        localStorage.setItem("prompts", JSON.stringify(prompts));
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
}

class ApiDeletePrompt implements DeletePromptStrategy {
  deletePrompt(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // 调用接口删除
    });
  }
}

class DeletePrompt {
  private strategy: DeletePromptStrategy;

  constructor(strategy: DeletePromptStrategy) {
    this.strategy = strategy;
  }

  delete(id: string): Promise<boolean> {
    return this.strategy.deletePrompt(id);
  }
}

const deletePrompt = (id: string, isLogin: boolean) => {
  return new DeletePrompt(!isLogin ? new LocalDeletePrompt() : new ApiDeletePrompt());
};



export default deletePrompt;
