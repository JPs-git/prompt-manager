import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface SearchAndFilterProps {
  searchQuery: string;
  selectedCategory: string;
  selectedTags: string[];
  categories: string[];
  tags: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTagSelect: (tag: string) => void;
}

/**
 * 搜索和筛选组件
 * 包含搜索框、分类选择和标签筛选
 */
const SearchAndFilter = ({
  searchQuery,
  selectedCategory,
  selectedTags,
  categories,
  tags,
  onSearchChange,
  onCategoryChange,
  onTagSelect,
}: SearchAndFilterProps) => {
  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <div className="flex-1">
          <Input
            placeholder="搜索提示词..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="w-48">
          <Select
            placeholder="所有分类"
            value={selectedCategory}
            onChange={onCategoryChange}
            className="w-full"
          >
            <Select.Option value="">所有分类</Select.Option>
            {categories.map((category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
              selectedTags.includes(tag)
                ? "bg-indigo-100 text-indigo-800"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </span>
        ))}
        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm cursor-pointer">
          + 更多标签
        </span>
      </div>
    </div>
  );
};

export default SearchAndFilter;
