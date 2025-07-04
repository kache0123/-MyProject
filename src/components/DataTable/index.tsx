import { Table } from 'antd';

export interface Order {
  id: string;
  customer: string;
  date: string;
  status: string;
}

interface Props {
  data: Order[];
}

const columns = [
  { title: 'Order ID', dataIndex: 'id', key: 'id' },
  { title: 'Customer', dataIndex: 'customer', key: 'customer' },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Status', dataIndex: 'status', key: 'status' }
];

export default function DataTable({ data }: Props) {
  return <Table rowKey="id" columns={columns} dataSource={data} pagination={false} />;
}
