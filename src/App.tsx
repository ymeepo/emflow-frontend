import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RobotOutlined,
  FolderOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, ConfigProvider } from 'antd';
import Projects from './Projects';
import Ask from './Ask';
import Hiring from './Hiring';
import Meetings from './Meetings';
import TeamDevelopment from './TeamDevelopment';
import './App.css';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return <Projects />;
      case '2':
        return <Ask />;
      case '3':
        return <Hiring />;
      case '4':
        return <Meetings />;
      case '5':
        return <TeamDevelopment />;
      default:
        return <Projects />;
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'rgb(244,244,244)',  
        },
        components: {
          Layout: {
            siderBg: 'rgb(39,60,129)',
            bodyBg: 'rgb(244,244,244)', //'rgb(72,127,134)', //'rgb(72,127,134)'. 'rgb(19,76,101)', rgb(240,236,218)
          },
          
          Menu: {
            darkItemBg: 'rgb(39,60,129)',
            darkItemSelectedBg: 'rgb(38, 138, 155)',
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => setSelectedKey(key)}
            items={[
              {
                key: '1',
                icon: <FolderOutlined />,
                label: 'Projects',
              },
              {
                key: '2',
                icon: <RobotOutlined />,
                label: 'Ask AI',
              },
              {
                key: '3',
                icon: <VideoCameraOutlined />,
                label: 'Meetings',
              },
              {
                key: '4',
                icon: <UserAddOutlined />,
                label: 'Hiring',
              },
              {
                key: '5',
                icon: <TeamOutlined />,
                label: 'Team Development',
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
