import { ApiProperty } from "@nestjs/swagger";

export class CreatePromptDto {
  @ApiProperty({
    description: "提示词标题",
    example: "写一个产品描述",
  })
  title: string;

  @ApiProperty({
    description: "提示词内容",
    example: "请帮我写一个关于{product}的产品描述，突出其{feature}特点",
  })
  content: string;

  @ApiProperty({
    description: "提示词分类",
    example: "产品文案",
    required: false,
  })
  category?: string;

  @ApiProperty({
    description: "提示词状态",
    example: "published",
    required: false,
    enum: ["draft", "published", "archived"],
  })
  status?: string;

  @ApiProperty({
    description: "用户ID",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  userId: string;

  @ApiProperty({
    description: "标签ID列表",
    example: ["123e4567-e89b-12d3-a456-426614174001"],
    required: false,
    type: [String],
  })
  tagIds?: string[];
}
