import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Users, PhoneForwarded, CalendarCheck, ShieldX } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function VoiceOutboundStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-green-100 rounded-lg">
          <Phone className="w-5 h-5 text-green-600" />
        </div>
        <CardTitle className="text-lg">Voice AI - Outbound</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Raw Leads in Queue" value="1,250" />
        <StatItem label="Verified & Callable" value="980" />
        <StatItem label="AI Calls Made Today" value="152" />
        <StatItem label="Appointments Booked" value="7" />
        <StatItem label="Do Not Call (DNC)" value="270" />
      </CardContent>
    </Card>
  );
}