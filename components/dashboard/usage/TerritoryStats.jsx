import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Activity, Home, Sparkles } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function TerritoryStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-orange-100 rounded-lg">
          <MapPin className="w-5 h-5 text-orange-600" />
        </div>
        <CardTitle className="text-lg">Territory</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Claimed ZIP Codes" value="12" />
        <StatItem label="Total Population" value="2.1M" />
        <StatItem label="Market Activity" value="Hot" />
        <StatItem label="Avg. Property Value" value="$750k" />
        <StatItem label="New Leads from Territory" value="18" />
      </CardContent>
    </Card>
  );
}