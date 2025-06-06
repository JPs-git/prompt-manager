# 提示词管理器 MVP 阶段数据库表结构设计

> 本文档基于项目功能文档和demo页面，结合实际业务需求，设计MVP阶段的核心数据库表结构，适用于 PostgreSQL。

## 1. 用户表（users）

用于管理系统用户，支持后续协作、权限等扩展。

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user', -- user/admin
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 2. 提示词表（prompts）

存储所有提示词，支持分类、状态、版本、归属用户。

```sql
CREATE TABLE prompts (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50),
    status VARCHAR(20) DEFAULT 'published', -- draft/published/archived
    version INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES users(id)
);
CREATE INDEX idx_prompts_user_id ON prompts(user_id);
CREATE INDEX idx_prompts_category ON prompts(category);
CREATE INDEX idx_prompts_status ON prompts(status);
```

## 3. 标签表（tags）

支持标签的增删改查、层级结构、描述。

```sql
CREATE TABLE tags (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    parent_id UUID REFERENCES tags(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_tags_parent_id ON tags(parent_id);
```

## 4. 提示词-标签关联表（prompt_tags）

实现多对多关联，支持一个提示词多个标签。

```sql
CREATE TABLE prompt_tags (
    prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (prompt_id, tag_id)
);
CREATE INDEX idx_prompt_tags_tag_id ON prompt_tags(tag_id);
```

## 5. 模板表（templates）

存储提示词模板，支持变量、归属用户。

```sql
CREATE TABLE templates (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    variables JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES users(id)
);
CREATE INDEX idx_templates_user_id ON templates(user_id);
```

## 6. 提示词版本表（prompt_versions）

记录提示词的历史版本，支持回溯。

```sql
CREATE TABLE prompt_versions (
    id UUID PRIMARY KEY,
    prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
    version INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50),
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES users(id)
);
CREATE INDEX idx_prompt_versions_prompt_id ON prompt_versions(prompt_id);
```

---

## 字段说明与设计说明

- 所有主键均为UUID，便于分布式和扩展。
- `prompts`、`templates`、`tags`等表均有`created_at`、`updated_at`字段，便于审计和排序。
- `prompt_tags`为多对多关系表，便于灵活标签管理。
- `prompt_versions`用于提示词的版本历史。
- `variables`字段为JSONB，支持模板变量的灵活扩展。
- 预留`user_id`，支持多用户和协作。
- 主要字段均加索引，提升查询性能。

---

## 后续可扩展方向

- 权限与协作（如团队、角色、邀请等）
- 收藏、评论、评分等社交功能
- 操作日志、审计表
- 搜索优化（全文检索、标签统计等）
- 数据归档与恢复
