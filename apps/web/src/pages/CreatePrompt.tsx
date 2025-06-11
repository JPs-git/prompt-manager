import React, { useState } from "react";
import { Form, Input, Select, Button, message } from "antd";
import { Prompt } from "@/types/Prompts";
import { promptFactory } from "@/utils/promptFactory";
import MainLayout from "@/components/layout/MainLayout";

const { TextArea } = Input;
const { Option } = Select;

const CreatePrompt: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: Prompt) => {
    const newPrompt = promptFactory(values);
    const prompts = JSON.parse(localStorage.getItem("prompts") || "[]");
    prompts.push(newPrompt);
    localStorage.setItem("prompts", JSON.stringify(prompts));
    message.success("提示词保存成功！");
    form.resetFields();
  };

  return (
    <MainLayout>

    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">编辑提示词</h2>

          <Form form={form} onFinish={onFinish} layout="vertical" >
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="right-0 absolute bg-blue-400"
              >
                保存
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};

export default CreatePrompt;
