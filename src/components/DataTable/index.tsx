import React, { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  DatePicker
} from 'antd';
import dayjs from 'dayjs';

export interface Order {
  id: string;
  customer: string;
  date: string;
  status: string;
}

interface Props {
  data: Order[];
  onUpdate?: (order: Order) => void;
}

export default function DataTable({ data, onUpdate }: Props) {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState<Order | null>(null);

  const fieldLabels: Record<keyof Order, string> = {
    id: 'Order ID',
    customer: 'Customer',
    date: 'Date',
    status: 'Status'
  };

  const fieldTypes: Record<keyof Order, string> = {
    id: 'text',
    customer: 'text',
    date: 'date',
    status: 'select'
  };

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' }
  ];

  const handleEdit = (record: Order) => {
    setEditing(record);
    form.setFieldsValue({
      ...record,
      date: dayjs(record.date)
    });
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    const updated: Order = {
      ...editing!,
      ...values,
      date: values.date.format('YYYY-MM-DD')
    };
    onUpdate && onUpdate(updated);
    setEditing(null);
  };

  const columns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Order) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          编辑
        </Button>
      )
    }
  ];

  return (
    <>
      <Table rowKey="id" columns={columns} dataSource={data} pagination={false} />
      <Modal
        open={!!editing}
        title="编辑订单"
        onCancel={() => setEditing(null)}
        onOk={handleSave}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          {editing &&
            (Object.keys(editing) as (keyof Order)[]).map((key) => (
              <Form.Item label={fieldLabels[key]} name={key} key={key} valuePropName={fieldTypes[key] === 'bool' ? 'checked' : 'value'}>
                {fieldTypes[key] === 'text' && <Input />}
                {fieldTypes[key] === 'number' && <InputNumber style={{ width: '100%' }} />}
                {fieldTypes[key] === 'select' && <Select options={statusOptions} />}
                {fieldTypes[key] === 'bool' && <Switch />}
                {fieldTypes[key] === 'date' && <DatePicker style={{ width: '100%' }} />}
              </Form.Item>
            ))}
        </Form>
      </Modal>
    </>
  );
}
