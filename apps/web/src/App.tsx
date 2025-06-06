import { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import { HomeOutlined, FileTextOutlined, TagsOutlined } from '@ant-design/icons'

const { Header, Content, Sider } = Layout

function App() {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <h1 style={{ color: 'white', margin: 0 }}>提示词管理器</h1>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={200}
          style={{ background: colorBgContainer }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            items={[
              {
                key: '1',
                icon: <HomeOutlined />,
                label: '首页',
              },
              {
                key: '2',
                icon: <FileTextOutlined />,
                label: '提示词管理',
              },
              {
                key: '3',
                icon: <TagsOutlined />,
                label: '标签管理',
              },
            ]}
          />
        </Sider>
        <Layout style={{ padding: '24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <h2>欢迎使用提示词管理器</h2>
            <p>这是一个用于管理和组织 AI 提示词的工具。</p>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default App 