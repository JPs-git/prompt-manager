import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, message, Tag, Modal } from "antd";
import { Prompt } from "@/types/Prompts";
import { promptFactory } from "@/utils/promptFactory";
import MainLayout from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "@/store/types";

const { TextArea } = Input;
const { Option } = Select;

interface CreatePromptProps {
  prompt?: Prompt;
  deletePrompt?: (id: string) => void;
}

const CreatePrompt: React.FC<CreatePromptProps> = ({
  prompt,
  deletePrompt,
}) => {
  const [form] = Form.useForm();
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  const { loading, error } = useSelector((state: State) => state);

  useEffect(() => {
    if (prompt) {
      form.setFieldsValue(prompt);
      setTags(prompt.tags || []);
    }
  }, [prompt, form]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const navigate = useNavigate();

  const onFinish = (values: Prompt) => {
    const prompts = JSON.parse(localStorage.getItem("prompts") || "[]");
    const newPrompt = promptFactory({ ...values, tags });

    if (prompt) {
      const index = prompts.findIndex((p: Prompt) => p.id === prompt.id);
      if (index !== -1) {
        prompts[index] = newPrompt;
      }
    } else {
      prompts.push(newPrompt);
    }

    localStorage.setItem("prompts", JSON.stringify(prompts));
    message.success(prompt ? "提示词更新成功！" : "提示词保存成功！");
    navigate("/");
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "确认删除提示词",
      content: "确定要删除该提示词吗？",
      onOk: async () => {
        try {
          if (prompt && deletePrompt) {
            await deletePrompt(prompt.id as string);
            message.success("提示词删除成功！");
            navigate("/");
          }
        } catch (error) {
          message.error("删除失败，请重试");
        }
      },
    });
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              {prompt ? "编辑提示词" : "创建提示词"}
            </h2>

            <Form form={form} onFinish={onFinish} layout="vertical">
              <div className="grid grid-cols-1 gap-6 mb-6">
                <Form.Item
                  name="title"
                  label="标题"
                  rules={[{ required: true, message: "请输入标题" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="category"
                  label="分类"
                  rules={[{ required: true, message: "请选择分类" }]}
                >
                  <Select>
                    <Option value="code">代码生成</Option>
                    <Option value="text">文本生成</Option>
                    <Option value="image">图像生成</Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item
                name="content"
                label="提示词内容"
                rules={[{ required: true, message: "请输入内容" }]}
              >
                <TextArea rows={10} />
              </Form.Item>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  标签
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Tag
                      key={tag}
                      closable
                      onClose={() => handleRemoveTag(tag)}
                    >
                      {tag}
                    </Tag>
                  ))}
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onPressEnter={handleAddTag}
                    placeholder="输入标签"
                    style={{ width: 100 }}
                  />
                  <Button onClick={handleAddTag}>添加标签</Button>
                </div>
              </div>

              <Form.Item>
                <div className="flex justify-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-400"
                    loading={loading}
                  >
                    {prompt ? "更新" : "保存"}
                  </Button>
                  {prompt && (
                    <Button
                      onClick={handleDelete}
                      type="primary"
                      htmlType="button"
                      className="ml-4 bg-red-400"
                      danger
                      loading={loading}
                    >
                      删除
                    </Button>
                  )}
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatePrompt;
