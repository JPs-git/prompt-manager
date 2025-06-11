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

 export default {
    categories,
    tags,
    prompts
 }