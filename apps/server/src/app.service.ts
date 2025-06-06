import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return '提示词管理器 API 服务正在运行'
  }
} 