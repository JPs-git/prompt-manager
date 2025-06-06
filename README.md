# 提示词管理器

一个用于管理和组织 AI 提示词的工具，支持提示词的创建、编辑、分类、搜索等功能。

## 功能特点

- 提示词管理：创建、编辑、删除提示词
- 模板管理：创建和管理提示词模板
- 标签系统：使用标签对提示词进行分类
- 搜索功能：支持全文搜索和标签筛选
- 导入导出：支持提示词的导入导出
- 版本控制：支持提示词的版本管理
- 协作功能：支持团队协作和权限管理

## 技术栈

### 前端

- React 18
- TypeScript
- Ant Design
- Material-UI
- Zustand
- React Router

### 后端

- NestJS
- TypeScript
- MongoDB
- JWT 认证
- Swagger API 文档

## 开发环境设置

1. 克隆仓库

```bash
git clone [repository-url]
cd prompt-manager
```

2. 安装依赖

```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install
```

3. 配置环境变量

```bash
# 在 backend 目录下创建 .env 文件
cp .env.example .env
# 编辑 .env 文件，配置必要的环境变量
```

4. 启动开发服务器

```bash
# 启动后端服务
cd backend
npm run start:dev

# 启动前端服务
cd frontend
npm start
```

## 项目结构

```
prompt-manager/
├── frontend/                # 前端项目
│   ├── src/
│   │   ├── components/     # 组件
│   │   ├── pages/         # 页面
│   │   ├── services/      # API 服务
│   │   ├── utils/         # 工具函数
│   │   ├── hooks/         # 自定义 Hooks
│   │   ├── styles/        # 样式文件
│   │   └── assets/        # 静态资源
│   └── public/            # 公共资源
├── backend/                # 后端项目
│   ├── src/
│   │   ├── controllers/   # 控制器
│   │   ├── services/      # 服务
│   │   ├── models/        # 数据模型
│   │   ├── middlewares/   # 中间件
│   │   ├── utils/         # 工具函数
│   │   └── config/        # 配置文件
│   └── test/              # 测试文件
└── docs/                  # 项目文档
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License
