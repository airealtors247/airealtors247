import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Send, Check, Share, ShieldAlert } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function ReviewStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Star className="w-5 h-5 text-yellow-600" />
        </div>
        <CardTitle className="text-lg">Review Management</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Requests Sent" value="88" />
        <StatItem label="Reviews Received" value="54" />
        <StatItem label="Average Rating" value="4.9 / 5" />
        <StatItem label="Posted to Google" value="21" />
        <StatItem label="Negative Feedback Handled" value="3" />
      </CardContent>
    </Card>
  );
}