import { Card } from 'antd';
import { ReactNode } from 'react';

interface Props {
  title: string;
  value: number | string;
  icon?: ReactNode;
}

export default function StatCard({ title, value, icon }: Props) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon && <span style={{ marginRight: 12, fontSize: 24 }}>{icon}</span>}
        <div>
          <div style={{ fontSize: 12, color: '#888' }}>{title}</div>
          <div style={{ fontSize: 24, fontWeight: 'bold' }}>{value}</div>
        </div>
      </div>
    </Card>
  );
}
