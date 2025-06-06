export class CreatePromptDto {
  title: string;
  content: string;
  category?: string;
  status?: string;
  userId: string;
  tagIds?: string[];
}