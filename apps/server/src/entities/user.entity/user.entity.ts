// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Prompt } from '../prompt.entity/prompt.entity';
import { Template } from '../template.entity/template.entity';
import { PromptVersion } from '../prompt-version.entity/prompt-version.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 255, nullable: true })
  avatar_url: string;

  @Column({ length: 20, default: 'user' })
  role: string;

  @Column({ length: 20, default: 'active' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => Prompt, prompt => prompt.user)
  prompts: Prompt[];

  @OneToMany(() => Template, template => template.user)
  templates: Template[];

  @OneToMany(() => PromptVersion, version => version.user)
  versions: PromptVersion[];
}