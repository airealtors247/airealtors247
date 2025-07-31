import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Target, UserPlus, XCircle } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function CampaignStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Mail className="w-5 h-5 text-purple-600" />
        </div>
        <CardTitle className="text-lg">Email & SMS Campaigns</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Active Campaigns" value="4" />
        <StatItem label="Emails Sent" value="5,670" />
        <StatItem label="SMS Sent" value="850" />
        <StatItem label="Leads Generated" value="43" />
        <StatItem label="Unsubscribes" value="12" />
      </CardContent>
    </Card>
  );
}