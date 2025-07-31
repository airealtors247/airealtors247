import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Users, DollarSign, Trophy, TrendingUp } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function ReferralDashboardStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-pink-100 rounded-lg">
          <Gift className="w-5 h-5 text-pink-600" />
        </div>
        <CardTitle className="text-lg">Referral Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Total Referrals Sent" value="67" />
        <StatItem label="Successful Conversions" value="23" />
        <StatItem label="Credits Earned" value="2,300" />
        <StatItem label="Leaderboard Rank" value="#3" />
        <StatItem label="Monthly Earnings" value="$450" />
      </CardContent>
    </Card>
  );
}