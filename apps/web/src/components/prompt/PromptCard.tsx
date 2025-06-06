import { EditOutlined, CopyOutlined } from "@ant-design/icons";

interface PromptCardProps {
  title: string;
  content: string;
  category: string;
  tags: string[];
  updatedAt: string;
  onEdit: () => void;
  onCopy: () => void;
}

/**
 * 提示词卡片组件
 * 显示提示词的标题、内容、分类和标签
 */
const PromptCard = ({
  title,
  content,
  category,
  tags,
  updatedAt,
  onEdit,
  onCopy,
}: PromptCardProps) => {
  return (
    <div className="prompt-card bg-white rounded-lg shadow p-6 max-w-full min-w-0">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="flex space-x-2">
          <button
            className="text-gray-400 hover:text-gray-500 p-1"
            onClick={onEdit}
            aria-label="编辑"
          >
            <EditOutlined />
          </button>
          <button
            className="text-gray-400 hover:text-gray-500 p-1"
            onClick={onCopy}
            aria-label="复制"
          >
            <CopyOutlined />
          </button>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{content}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {category}
        </span>
        {tags.map((tag, idx) => (
          <span
            key={tag}
            className={`px-2 py-1 rounded-full text-xs ${
              idx % 3 === 0
                ? "bg-blue-100 text-blue-800"
                : idx % 3 === 1
                ? "bg-green-100 text-green-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="text-sm text-gray-500">最后更新：{updatedAt}</div>
    </div>
  );
};

export default PromptCard;
