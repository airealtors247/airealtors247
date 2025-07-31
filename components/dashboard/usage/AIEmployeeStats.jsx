import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, CheckSquare, Clock, Zap, Calendar } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function AIEmployeeStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Bot className="w-5 h-5 text-gray-600" />
        </div>
        <CardTitle className="text-lg">AI Employee</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Tasks Delegated" value="45" />
        <StatItem label="Tasks Completed" value="42" />
        <StatItem label="Hours Saved (Est.)" value="~15 hours" />
        <StatItem label="Efficiency Gain" value="+25%" />
        <StatItem label="Next Task Due" value="1 hour" />
      </CardContent>
    </Card>
  );
}