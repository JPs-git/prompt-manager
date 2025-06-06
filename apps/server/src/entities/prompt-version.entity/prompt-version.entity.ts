import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Prompt } from "@/entities/prompt.entity/prompt.entity";
import { User } from "@/entities/user.entity/user.entity";

@Entity("prompt_versions")
export class PromptVersion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Prompt, (prompt) => prompt.versions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "prompt_id" })
  prompt: Prompt;

  @Column()
  version: number;

  @Column({ length: 255 })
  title: string;

  @Column("text")
  content: string;

  @Column({ length: 50, nullable: true })
  category: string;

  @Column({ length: 20, nullable: true })
  status: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.versions)
  @JoinColumn({ name: "user_id" })
  user: User;
}
