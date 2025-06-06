import { Module } from '@nestjs/common';
import { TemplatesService } from './templates/templates.service';
import { TemplatesController } from './templates/templates.controller';

@Module({
  providers: [TemplatesService],
  controllers: [TemplatesController]
})
export class TemplatesModule {}
