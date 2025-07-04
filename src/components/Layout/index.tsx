import { Layout, Menu } from 'antd';
import { DashboardOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

const { Header, Sider, Content } = Layout;

interface Props {
  children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" mode="inline" items={[{ key: '1', icon: <DashboardOutlined />, label: 'Dashboard' }]} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '16px' }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
