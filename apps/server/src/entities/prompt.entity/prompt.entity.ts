// prompt.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user.entity/user.entity';
import { Tag } from '../tag.entity/tag.entity';
import { PromptVersion } from '../prompt-version.entity/prompt-version.entity';

@Entity()
export class Prompt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  content: string;

  @Column({ length: 50, nullable: true })
  category: string;

  @Column({ length: 20, default: 'published' })
  status: string;

  @Column({ default: 1 })
  version: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => User, user => user.prompts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Tag, tag => tag.prompts)
  @JoinTable({
    name: 'prompt_tags',
    joinColumn: { name: 'prompt_id' },
    inverseJoinColumn: { name: 'tag_id' }
  })
  tags: Tag[];

  @OneToMany(() => PromptVersion, version => version.prompt)
  versions: PromptVersion[];
}