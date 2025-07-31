import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall, Calendar, UserPlus, MessageSquare, Star } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function VoiceInboundStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-blue-100 rounded-lg">
          <PhoneCall className="w-5 h-5 text-blue-600" />
        </div>
        <CardTitle className="text-lg">Voice AI - Inbound</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Total Calls Handled" value="89" />
        <StatItem label="Appointments Set" value="12" />
        <StatItem label="Leads Captured" value="28" />
        <StatItem label="Messages Taken" value="49" />
        <StatItem label="Avg. Call Rating" value="4.8/5" />
      </CardContent>
    </Card>
  );
}