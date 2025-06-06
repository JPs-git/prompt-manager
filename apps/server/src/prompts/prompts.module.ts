import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptsService } from './prompts/prompts.service';
import { PromptsController } from './prompts/prompts.controller';
import { Prompt } from '@/entities/prompt.entity/prompt.entity';
import { Tag } from '@/entities/tag.entity/tag.entity';
import { PromptVersion } from '@/entities/prompt-version.entity/prompt-version.entity'; // 导入
import { TagsModule } from '../tags/tags.module'; // 导入 TagsModule
import { UsersModule } from '../users/users.module'; // 导入 UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Prompt,
      Tag,
      PromptVersion, // 注册 PromptVersion
    ]),
    forwardRef(() => TagsModule), // 使用 forwardRef 避免循环依赖
    forwardRef(() => UsersModule), // 使用 forwardRef 避免循环依赖
  ],
  controllers: [PromptsController],
  providers: [PromptsService],
  exports: [PromptsService], // 导出服务
})
export class PromptsModule {}