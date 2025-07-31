import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, ThumbsUp, MessageSquare, UserPlus, Repeat } from 'lucide-react';

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-b-0">
    <span className="text-slate-600">{label}</span>
    <span className="font-bold text-slate-900">{value}</span>
  </div>
);

export default function SocialAIStats() {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="p-2 bg-pink-100 rounded-lg">
          <Share2 className="w-5 h-5 text-pink-600" />
        </div>
        <CardTitle className="text-lg">Social Media AI</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <StatItem label="Connected Accounts" value="3" />
        <StatItem label="Posts This Week" value="14" />
        <StatItem label="Total Engagement" value="1.5k" />
        <StatItem label="Comments Needing Reply" value="5" />
        <StatItem label="Follower Growth" value="+45" />
      </CardContent>
    </Card>
  );
}