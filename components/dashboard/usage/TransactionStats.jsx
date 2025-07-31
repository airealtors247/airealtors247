import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, FileCheck, Clock, DollarSign, TrendingUp } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function TransactionStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-slate-100 rounded-lg">
          <ClipboardList className="w-5 h-5 text-slate-600" />
        </div>
        <CardTitle className="text-lg">Transactions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Under Contract" value="5" />
        <StatItem label="Pending Closing" value="3" />
        <StatItem label="Closed (This Month)" value="2" />
        <StatItem label="Total GCI" value="$85,200" />
        <StatItem label="Avg. Deal Cycle" value="45 Days" />
      </CardContent>
    </Card>
  );
}