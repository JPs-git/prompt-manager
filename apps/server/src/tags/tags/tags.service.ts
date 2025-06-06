// tag.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../../entities/tag.entity/tag.entity';
import { CreateTagDto } from '../../tags/dto/create-tag.dto/create-tag.dto';
import { UpdateTagDto } from '../../tags/dto/update-tag.dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.find({ relations: ['parent', 'children'] });
  }

  async findOne(id: string): Promise<Tag> {
    return this.tagRepository.findOne({ 
      where: { id },
      relations: ['parent', 'children', 'prompts'] 
    });
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.tagRepository.preload({
      id,
      ...updateTagDto
    });
    
    if (!tag) {
      throw new Error('Tag not found');
    }
    
    return this.tagRepository.save(tag);
  }

  async remove(id: string): Promise<void> {
    await this.tagRepository.delete(id);
  }
}