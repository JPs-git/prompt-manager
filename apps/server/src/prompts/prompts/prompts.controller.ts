// prompt.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { Prompt } from '../../entities/prompt.entity/prompt.entity';
import { CreatePromptDto } from '../../prompts/dto/create-prompt.dto/create-prompt.dto';
import { UpdatePromptDto } from '../../prompts/dto/update-prompt.dto/update-prompt.dto';

@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Post()
  create(@Body() createPromptDto: CreatePromptDto): Promise<Prompt> {
    return this.promptsService.create(createPromptDto);
  }

  @Get()
  findAll(): Promise<Prompt[]> {
    return this.promptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Prompt> {
    return this.promptsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePromptDto: UpdatePromptDto): Promise<Prompt> {
    return this.promptsService.update(id, updatePromptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.promptsService.remove(id);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string): Promise<Prompt[]> {
    return this.promptsService.findByCategory(category);
  }
}