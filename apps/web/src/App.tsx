import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useState } from "react";
import { Layout, Menu, theme } from "antd";
import {
  HomeOutlined,
  FileTextOutlined,
  TagsOutlined,
} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

/**
 * 应用主组件
 * 配置路由和全局布局
 */
function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* 其他路由将在后续添加 */}
      </Routes>
    </Router>
  );
}

export default App;
