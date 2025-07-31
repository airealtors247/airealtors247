import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Users } from 'lucide-react';

export default function LeadSourceChart() {
  const data = [
    { name: 'Facebook', value: 35, color: '#3b82f6' },
    { name: 'Google', value: 28, color: '#10b981' },
    { name: 'Instagram', value: 20, color: '#f59e0b' },
    { name: 'LinkedIn', value: 12, color: '#8b5cf6' },
    { name: 'Referrals', value: 5, color: '#ef4444' }
  ];

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="w-5 h-5 text-green-600" />
          Lead Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t">
          {data.slice(0, 4).map((source, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: source.color }}
              ></div>
              <span className="text-xs text-slate-600">{source.name}: {source.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}