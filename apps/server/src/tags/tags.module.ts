import { Module } from '@nestjs/common';
import { TagsService } from './tags/tags.service';
import { TagsController } from './tags/tags.controller';
import { Tag } from '@/entities/tag.entity/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // 关键：导入所有服务中使用的实体
    TypeOrmModule.forFeature([
      Tag,          // 添加Tag实体
    ]),
  ],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
