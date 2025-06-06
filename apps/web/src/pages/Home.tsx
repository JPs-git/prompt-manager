import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import SearchAndFilter from "../components/prompt/SearchAndFilter";
import PromptCard from "../components/prompt/PromptCard";

/**
 * 首页组件
 * 展示提示词列表，包含搜索、筛选和展示功能
 */
const Home = () => {
  // 状态管理
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 模拟数据
  const categories = ["文本生成", "图像生成", "代码生成", "数据分析"];
  const tags = ["AI助手", "代码优化", "内容创作", "SEO", "性能"];
  const prompts = [
    {
      id: 1,
      title: "代码优化助手",
      content: "优化代码性能，提高可读性，添加注释...",
      category: "代码生成",
      tags: ["代码优化", "性能"],
      updatedAt: "2024-03-20",
    },
    {
      id: 2,
      title: "内容创作助手",
      content: "生成高质量的文章、博客、社交媒体内容...",
      category: "文本生成",
      tags: ["内容创作", "SEO"],
      updatedAt: "2024-03-19",
    },
    {
      id: 3,
      title: "AI 助手模板",
      content: "通用 AI 助手提示词模板，可自定义角色和任务...",
      category: "文本生成",
      tags: ["模板", "AI助手"],
      updatedAt: "2024-03-18",
    },
  ];

  // 事件处理函数
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleEdit = (id: number) => {
    console.log("编辑提示词:", id);
  };

  const handleCopy = (id: number) => {
    console.log("复制提示词:", id);
  };

  return (
    <MainLayout>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
        <div className="mb-6">
          <SearchAndFilter
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            categories={categories}
            tags={tags}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
            onTagSelect={handleTagSelect}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <div key={prompt.id} className="flex justify-center">
              <div className="w-full max-w-md">
                <PromptCard
                  title={prompt.title}
                  content={prompt.content}
                  category={prompt.category}
                  tags={prompt.tags}
                  updatedAt={prompt.updatedAt}
                  onEdit={() => handleEdit(prompt.id)}
                  onCopy={() => handleCopy(prompt.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </MainLayout>
  );
};

export default Home;
