import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import AppLayout from '@/components/Layout';
import StatCard from '@/components/StatCard';
import LineChart from '@/components/LineChart';
import BarChart from '@/components/BarChart';
import DataTable from '@/components/DataTable';
import { getOrders, Order } from '@/services/api';
import { formatNumber } from '@/utils';

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  const stats = [
    { title: 'Users', value: formatNumber(1024), icon: <UserOutlined /> },
    { title: 'Orders', value: formatNumber(256), icon: <ShoppingCartOutlined /> },
    { title: 'Revenue', value: '$12,345', icon: <DollarOutlined /> },
    { title: 'Completed', value: '85%', icon: <CheckCircleOutlined /> }
  ];

  const lineData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 400 },
    { name: 'May', value: 600 }
  ];

  const barData = [
    { name: 'A', value: 12 },
    { name: 'B', value: 18 },
    { name: 'C', value: 32 },
    { name: 'D', value: 25 },
    { name: 'E', value: 22 }
  ];

  return (
    <AppLayout>
      <Row gutter={[16, 16]}>
        {stats.map((item) => (
          <Col xs={24} sm={12} md={6} key={item.title}>
            <StatCard {...item} />
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <LineChart data={lineData} />
        </Col>
        <Col xs={24} md={12}>
          <BarChart data={barData} />
        </Col>
      </Row>

      <div style={{ marginTop: 16 }}>
        <DataTable data={orders} />
      </div>
    </AppLayout>
  );
}
