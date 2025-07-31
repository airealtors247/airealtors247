import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText as LeadMagnetIcon, Download, Users, TrendingUp, Star } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function LeadMagnetStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <LeadMagnetIcon className="w-5 h-5 text-indigo-600" />
        </div>
        <CardTitle className="text-lg">Lead Magnets</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Magnets Created" value="5" />
        <StatItem label="Total Downloads" value="215" />
        <StatItem label="Leads Generated" value="48" />
        <StatItem label="Top Performing" value="Market Report" />
        <StatItem label="Conversion Rate" value="22.3%" />
      </CardContent>
    </Card>
  );
}