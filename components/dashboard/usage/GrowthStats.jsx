import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Gift, CheckCircle, DollarSign } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function GrowthStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-red-100 rounded-lg">
          <TrendingUp className="w-5 h-5 text-red-600" />
        </div>
        <CardTitle className="text-lg">Growth & Referrals</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Active Goals" value="3" />
        <StatItem label="Referral Invites Sent" value="25" />
        <StatItem label="Successful Referrals" value="4" />
        <StatItem label="Credits Earned" value="200" />
        <StatItem label="Next Payout" value="$50" />
      </CardContent>
    </Card>
  );
}