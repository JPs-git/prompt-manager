// prompt.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Prompt } from '../../entities/prompt.entity/prompt.entity';
import { CreatePromptDto } from '../../prompts/dto/create-prompt.dto/create-prompt.dto';
import { UpdatePromptDto } from '../../prompts/dto/update-prompt.dto/update-prompt.dto';
import { Tag } from '../../entities/tag.entity/tag.entity';
import { PromptVersion } from '../../entities/prompt-version.entity/prompt-version.entity';

@Injectable()
export class PromptsService {
  constructor(
    @InjectRepository(Prompt)
    private promptRepository: Repository<Prompt>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    @InjectRepository(PromptVersion)
    private promptVersionRepository: Repository<PromptVersion>
  ) {}

  async create(createPromptDto: CreatePromptDto): Promise<Prompt> {
    const { tagIds, ...promptData } = createPromptDto;
    const prompt = this.promptRepository.create(promptData);
    
    if (tagIds && tagIds.length) {
      prompt.tags = await this.tagRepository.findBy({ id: In(tagIds) });
    }
    
    return this.promptRepository.save(prompt);
  }

  async findAll(): Promise<Prompt[]> {
    return this.promptRepository.find({ relations: ['tags', 'user'] });
  }

  async findOne(id: string): Promise<Prompt> {
    return this.promptRepository.findOne({ 
      where: { id },
      relations: ['tags', 'user', 'versions'] 
    });
  }

  async update(id: string, updatePromptDto: UpdatePromptDto): Promise<Prompt> {
    const prompt = await this.promptRepository.preload({
      id,
      ...updatePromptDto
    });
    
    if (!prompt) {
      throw new Error('Prompt not found');
    }
    
    if (updatePromptDto.tagIds) {
      prompt.tags = await this.tagRepository.findBy({ 
        id: In(updatePromptDto.tagIds) 
      });
    }
    
    return this.promptRepository.save(prompt);
  }

  async remove(id: string): Promise<void> {
    await this.promptRepository.delete(id);
  }

  async findByCategory(category: string): Promise<Prompt[]> {
    return this.promptRepository.find({ 
      where: { category },
      relations: ['tags'] 
    });
  }
}