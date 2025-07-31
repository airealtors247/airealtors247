import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Sparkles, Camera, Eye, MessageCircle } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function ListingStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Crown className="w-5 h-5 text-amber-600" />
        </div>
        <CardTitle className="text-lg">Property Listings</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Active Listings" value="15" />
        <StatItem label="AI Descriptions Written" value="15 / 15" />
        <StatItem label="VR Tours Generated" value="8" />
        <StatItem label="Total Views" value="10,2k" />
        <StatItem label="Inquiries Received" value="112" />
      </CardContent>
    </Card>
  );
}