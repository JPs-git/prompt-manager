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

CREATE TABLE tags (
    id UUID PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    parent_id UUID REFERENCES tags(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_tags_parent_id ON tags(parent_id);

CREATE TABLE prompt_tags (
    prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (prompt_id, tag_id)
);
CREATE INDEX idx_prompt_tags_tag_id ON prompt_tags(tag_id);

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