import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, CheckSquare, TrendingUp, Lightbulb, Calendar } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function AIBusinessCoachStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Target className="w-5 h-5 text-amber-600" />
        </div>
        <CardTitle className="text-lg">AI Business Coach</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Action Plans Created" value="156" />
        <StatItem label="Goals on Track" value="8/10" />
        <StatItem label="Coaching Sessions" value="23" />
        <StatItem label="Revenue Growth" value="+34%" />
        <StatItem label="Productivity Score" value="87%" />
      </CardContent>
    </Card>
  );
}