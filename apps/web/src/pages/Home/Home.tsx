import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import SearchAndFilter from "../../components/prompt/SearchAndFilter";
import PromptCard from "../../components/prompt/PromptCard";
import HomeMockData from "../../mock/Home";
import { Empty, message } from "antd";
import { Prompt } from "@/types/Prompts";
import { useNavigate } from "react-router-dom";
import { UUIDTypes } from "uuid";

/**
 * 首页组件
 * 展示提示词列表，包含搜索、筛选和展示功能
 */
const Home = (props: { getPrompts: () => void; prompts: Prompt[] }) => {
  // 状态管理
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const { getPrompts, prompts } = props;

  const { categories, tags } = HomeMockData;

  useEffect(() => {
    getPrompts();
  }, [getPrompts]);

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

  const handleEdit = (id: UUIDTypes) => {
    console.log("编辑提示词:", id);
    navigate(`/create/${id}`);
  };

  const handleCopy = (id: UUIDTypes) => {
    console.log("复制提示词:", id);
    navigator.clipboard.writeText(prompts.find((prompt) => prompt.id === id)?.content || "");
    message.success("复制成功");
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
          <div className="grid grid-cols-3 gap-6">
            {prompts.map((prompt) => (
              <div key={prompt.id as string}>
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
            ))}
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
