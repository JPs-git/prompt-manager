import { ReactNode } from "react";
import { Layout } from "antd";
import Navbar from "./Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * 主布局组件
 * 包含导航栏和内容区域
 * @param children - 子组件
 */
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Layout className="layout-container min-h-screen">
      <Navbar />
      <Layout className="content-container flex-1">
        <div className="max-w-7xl mx-auto w-full">{children}</div>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
