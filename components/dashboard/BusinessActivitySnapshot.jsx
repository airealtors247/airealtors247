
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, DollarSign, BarChart } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <Card className="border-0 shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
      <Icon className={`h-5 w-5 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-slate-900">{value}</div>
    </CardContent>
  </Card>
);

export default function BusinessActivitySnapshot() {
  const stats = [
    { title: 'Leads This Month', value: '156', icon: Users, color: 'text-blue-600' },
    { title: 'Deals Closed', value: '31', icon: Target, color: 'text-green-600' },
    { title: 'Revenue (GCI)', value: '$95k', icon: DollarSign, color: 'text-purple-600' },
    { title: 'Conversion Rate', value: '19.9%', icon: BarChart, color: 'text-orange-600' }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 h-full">
      {stats.map(stat => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
