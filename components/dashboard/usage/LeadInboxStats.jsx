import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Inbox, MessageSquare, Users, CheckCircle, Clock } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function LeadInboxStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Inbox className="w-5 h-5 text-blue-600" />
        </div>
        <CardTitle className="text-lg">Lead Inbox & Tracker</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Unread Messages" value="24" />
        <StatItem label="Active Conversations" value="67" />
        <StatItem label="Leads Responded Today" value="18" />
        <StatItem label="Response Rate" value="94%" />
        <StatItem label="Avg Response Time" value="4 min" />
      </CardContent>
    </Card>
  );
}