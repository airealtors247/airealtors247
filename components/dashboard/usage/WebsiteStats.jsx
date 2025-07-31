import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, CheckCircle, Users, UserPlus, TrendingDown } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function WebsiteStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-teal-100 rounded-lg">
          <Globe className="w-5 h-5 text-teal-600" />
        </div>
        <CardTitle className="text-lg">Website Builder</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Status" value="Published" />
        <StatItem label="Visitors (This Month)" value="1,200" />
        <StatItem label="Leads Captured" value="34" />
        <StatItem label="Most Visited Page" value="Listings" />
        <StatItem label="Bounce Rate" value="25%" />
      </CardContent>
    </Card>
  );
}