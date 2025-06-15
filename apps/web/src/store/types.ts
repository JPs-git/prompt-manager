import { Prompt } from "@/types/Prompts";
import { User } from "@/types/User";

export interface State {
  user: User;
  prompts: Prompt[];
  loading: boolean;
  error: string | null;
}
