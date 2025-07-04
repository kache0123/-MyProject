import axios from 'axios';
import { Order } from '@/components/DataTable';

export const getOrders = async (): Promise<Order[]> => {
  // Example using axios; returning static data for demo
  // return axios.get('/api/orders').then(res => res.data);
  return Promise.resolve([
    { id: '001', customer: 'John Brown', date: '2023-09-01', status: 'Shipped' },
    { id: '002', customer: 'Jim Green', date: '2023-09-02', status: 'Processing' },
    { id: '003', customer: 'Joe Black', date: '2023-09-03', status: 'Delivered' },
    { id: '004', customer: 'Jane Smith', date: '2023-09-04', status: 'Pending' }
  ]);
};
