import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@/entities/user.entity/user.entity";
import { Prompt } from "@/entities/prompt.entity/prompt.entity";
import { Tag } from "@/entities/tag.entity/tag.entity";
import { Template } from "@/entities/template.entity/template.entity";
import { PromptVersion } from "@/entities/prompt-version.entity/prompt-version.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "5432"),
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "123.com",
      database: process.env.DB_DATABASE || "prompt_manager",
      entities: [User, Prompt, Tag, Template, PromptVersion],
      synchronize: process.env.NODE_ENV !== "production",
      logging: true,
      retryAttempts: 10,
      retryDelay: 1000,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
