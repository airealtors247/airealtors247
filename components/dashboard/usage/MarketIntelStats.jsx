import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users2, Search, Lightbulb, Bell } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function MarketIntelStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-purple-100 rounded-lg">
          <BarChart3 className="w-5 h-5 text-purple-600" />
        </div>
        <CardTitle className="text-lg">Market Intelligence</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Market Reports Run" value="6" />
        <StatItem label="Competitors Tracked" value="10" />
        <StatItem label="New Opportunities" value="3" />
        <StatItem label="Key Insights Found" value="8" />
        <StatItem label="Watchdog Alerts" value="2" />
      </CardContent>
    </Card>
  );
}