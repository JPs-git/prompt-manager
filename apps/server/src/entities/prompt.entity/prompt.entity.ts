// prompt.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../user.entity/user.entity";
import { Tag } from "../tag.entity/tag.entity";
import { PromptVersion } from "../prompt-version.entity/prompt-version.entity";

@Entity()
export class Prompt {
  @ApiProperty({ description: "提示词ID" })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({ description: "提示词标题" })
  @Column({ length: 255 })
  title: string;

  @ApiProperty({ description: "提示词内容" })
  @Column("text")
  content: string;

  @ApiProperty({ description: "提示词分类", required: false })
  @Column({ length: 50, nullable: true })
  category: string;

  @ApiProperty({
    description: "提示词状态",
    enum: ["draft", "published", "archived"],
  })
  @Column({ length: 20, default: "published" })
  status: string;

  @ApiProperty({ description: "版本号" })
  @Column({ default: 1 })
  version: number;

  @ApiProperty({ description: "创建时间" })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @ApiProperty({ description: "更新时间" })
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @ApiProperty({ description: "创建用户", type: () => User })
  @ManyToOne(() => User, (user) => user.prompts)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ApiProperty({ description: "标签列表", type: () => [Tag] })
  @ManyToMany(() => Tag, (tag) => tag.prompts)
  @JoinTable({
    name: "prompt_tags",
    joinColumn: { name: "prompt_id" },
    inverseJoinColumn: { name: "tag_id" },
  })
  tags: Tag[];

  @ApiProperty({ description: "版本历史", type: () => [PromptVersion] })
  @OneToMany(() => PromptVersion, (version) => version.prompt)
  versions: PromptVersion[];
}
