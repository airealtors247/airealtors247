import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Phone, CalendarCheck, Home, Eye, ZoomIn, CheckSquare } from 'lucide-react';

const metrics = [
  { key: 'leads', label: 'Leads Generated', value: 78, icon: Users, color: 'text-blue-500' },
  { key: 'calls', label: 'Calls Made by AI', value: 1250, icon: Phone, color: 'text-green-500' },
  { key: 'appointments', label: 'Appointments Booked', value: 12, icon: CalendarCheck, color: 'text-purple-500' },
  { key: 'listings', label: 'Listings Secured', value: 2, icon: Home, color: 'text-red-500' },
  { key: 'showings', label: 'Buyer Showings', value: 24, icon: Eye, color: 'text-orange-500' },
  { key: 'zooms', label: 'Zooms Booked', value: 5, icon: ZoomIn, color: 'text-indigo-500' },
  { key: 'deals', label: 'Deals Closed', value: 1, icon: CheckSquare, color: 'text-emerald-500' },
];

export default function PerformanceMetrics() {
  return (
    <Card className="shadow-lg border-0">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {metrics.map(metric => (
            <div key={metric.key} className="text-center p-2 bg-slate-50 rounded-lg">
              <metric.icon className={`w-6 h-6 mx-auto mb-2 ${metric.color}`} />
              <p className="text-xl font-bold text-slate-900">{metric.value}</p>
              <p className="text-xs text-slate-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}