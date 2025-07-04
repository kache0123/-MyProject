import { useEffect, useState } from 'react';
import { Row, Col, TreeSelect } from 'antd';
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
import { getOrders } from '@/services/api';
import { Order } from '@/components/DataTable';
import { formatNumber } from '@/utils';

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  const handleUpdate = (order: Order) => {
    setOrders((prev) => prev.map((item) => (item.id === order.id ? order : item)));
  };

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

  const treeData = [
    {
      title: '浙江省',
      value: 'zhejiang',
      children: [
        { title: '杭州市', value: 'hangzhou' },
        { title: '宁波市', value: 'ningbo' },
        { title: '温州市', value: 'wenzhou' }
      ]
    },
    {
      title: '江苏省',
      value: 'jiangsu',
      children: [
        { title: '南京市', value: 'nanjing' },
        { title: '苏州市', value: 'suzhou' },
        { title: '无锡市', value: 'wuxi' }
      ]
    },
    {
      title: '广东省',
      value: 'guangdong',
      children: [
        { title: '广州市', value: 'guangzhou' },
        { title: '深圳市', value: 'shenzhen' },
        { title: '珠海市', value: 'zhuhai' }
      ]
    }
  ];

  const handleProvinceCityChange = (values: string[]) => {
    console.log('Selected provinces/cities:', values);
  };

  return (
    <AppLayout>
      <Row gutter={16}>
        <Col flex="240px">
          <div style={{ width: 240, height: '100%' }}>
            <TreeSelect
              style={{ width: '100%' }}
              multiple
              showSearch
              treeCheckable
              treeCheckStrictly={false}
              treeData={treeData}
              placeholder="选择省/市"
              onChange={(values) =>
                handleProvinceCityChange(Array.isArray(values) ? values : [])
              }
            />
          </div>
        </Col>
        <Col flex="auto">
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
            <DataTable data={orders} onUpdate={handleUpdate} />
          </div>
        </Col>
      </Row>
    </AppLayout>
  );
}
