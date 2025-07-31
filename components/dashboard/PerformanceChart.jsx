import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function PerformanceChart() {
  const data = [
    { month: 'Jan', leads: 45, deals: 8, revenue: 24000 },
    { month: 'Feb', leads: 52, deals: 12, revenue: 31000 },
    { month: 'Mar', leads: 78, deals: 15, revenue: 42000 },
    { month: 'Apr', leads: 89, deals: 18, revenue: 58000 },
    { month: 'May', leads: 126, deals: 24, revenue: 73000 },
    { month: 'Jun', leads: 156, deals: 31, revenue: 95000 }
  ];

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Performance Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="leads" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name="Leads"
              />
              <Line 
                type="monotone" 
                dataKey="deals" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Deals"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 pt-3 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">156</div>
            <div className="text-xs text-slate-500">Leads This Month</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">31</div>
            <div className="text-xs text-slate-500">Deals Closed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">19.9%</div>
            <div className="text-xs text-slate-500">Conversion Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}