import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  
  // 全局验证管道
  app.useGlobalPipes(new ValidationPipe())
  
  // 配置 Swagger
  const config = new DocumentBuilder()
    .setTitle('提示词管理器 API')
    .setDescription('提示词管理器的 API 文档')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document)
  
  // 配置 CORS
  app.enableCors()
  
  await app.listen(4000)
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap() 