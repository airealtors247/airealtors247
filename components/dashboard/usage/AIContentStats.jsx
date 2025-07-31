import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FileText, Video, ThumbsUp, DollarSign } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function AIContentStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Sparkles className="w-5 h-5 text-blue-600" />
        </div>
        <CardTitle className="text-lg">AI Content & Video</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Blog Posts Written" value="8" />
        <StatItem label="Social Posts Created" value="56" />
        <StatItem label="Videos Generated" value="4" />
        <StatItem label="Total Content Pieces" value="68" />
        <StatItem label="Content Credits Used" value="1,200" />
      </CardContent>
    </Card>
  );
}