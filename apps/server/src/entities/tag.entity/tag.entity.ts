// tag.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn } from 'typeorm';
import { Prompt } from '../prompt.entity/prompt.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => Tag, tag => tag.children)
  @JoinColumn({ name: 'parent_id' })
  parent: Tag;

  @OneToMany(() => Tag, tag => tag.parent)
  children: Tag[];

  @ManyToMany(() => Prompt, prompt => prompt.tags)
  prompts: Prompt[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}