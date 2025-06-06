// prompt.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { PromptsService } from "./prompts.service";
import { Prompt } from "../../entities/prompt.entity/prompt.entity";
import { CreatePromptDto } from "../../prompts/dto/create-prompt.dto/create-prompt.dto";
import { UpdatePromptDto } from "../../prompts/dto/update-prompt.dto/update-prompt.dto";

@ApiTags("提示词管理")
@Controller("prompts")
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Post()
  @ApiOperation({ summary: "创建提示词" })
  @ApiResponse({ status: 201, description: "提示词创建成功", type: Prompt })
  create(@Body() createPromptDto: CreatePromptDto): Promise<Prompt> {
    return this.promptsService.create(createPromptDto);
  }

  @Get()
  @ApiOperation({ summary: "获取所有提示词" })
  @ApiResponse({
    status: 200,
    description: "返回所有提示词列表",
    type: [Prompt],
  })
  findAll(): Promise<Prompt[]> {
    return this.promptsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "获取指定提示词" })
  @ApiParam({ name: "id", description: "提示词ID" })
  @ApiResponse({ status: 200, description: "返回指定提示词", type: Prompt })
  @ApiResponse({ status: 404, description: "提示词不存在" })
  findOne(@Param("id") id: string): Promise<Prompt> {
    return this.promptsService.findOne(id);
  }

  @Put(":id")
  @ApiOperation({ summary: "更新提示词" })
  @ApiParam({ name: "id", description: "提示词ID" })
  @ApiResponse({ status: 200, description: "提示词更新成功", type: Prompt })
  @ApiResponse({ status: 404, description: "提示词不存在" })
  update(
    @Param("id") id: string,
    @Body() updatePromptDto: UpdatePromptDto
  ): Promise<Prompt> {
    return this.promptsService.update(id, updatePromptDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "删除提示词" })
  @ApiParam({ name: "id", description: "提示词ID" })
  @ApiResponse({ status: 200, description: "提示词删除成功" })
  @ApiResponse({ status: 404, description: "提示词不存在" })
  remove(@Param("id") id: string): Promise<void> {
    return this.promptsService.remove(id);
  }

  @Get("category/:category")
  @ApiOperation({ summary: "按分类获取提示词" })
  @ApiParam({ name: "category", description: "提示词分类" })
  @ApiResponse({
    status: 200,
    description: "返回指定分类的提示词列表",
    type: [Prompt],
  })
  findByCategory(@Param("category") category: string): Promise<Prompt[]> {
    return this.promptsService.findByCategory(category);
  }
}
