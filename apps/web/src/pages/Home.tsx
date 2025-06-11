import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import SearchAndFilter from "../components/prompt/SearchAndFilter";
import PromptCard from "../components/prompt/PromptCard";
import HomeMockData from "../mock/Home";
import { Prompt } from "@/types/Prompts";
import { Empty } from "antd";

/**
 * 首页组件
 * 展示提示词列表，包含搜索、筛选和展示功能
 */
const Home = () => {
  // 状态管理
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  const { categories, tags } = HomeMockData;

  useEffect(() => {

    // 从localStorage中读取prompts
    const prompts = JSON.parse(localStorage.getItem("prompts") || "[]");
    setPrompts(prompts);
    console.log(prompts);
  }, []);

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
        {prompts.length > 0 ? (
          <div className="flex flex-wrap ">
          { prompts.map((prompt) => (
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
          )) }
        </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <Empty description="暂无提示词" />
          </div>
        )}
      </main>
    </MainLayout>
  );
};

export default Home;
