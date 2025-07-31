import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, ThumbsUp, MessageCircle, Share2, Calendar } from 'lucide-react';

export default function SocialMediaActivity() {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Instagram className="w-5 h-5 text-pink-600" />
          Social Media Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-slate-500">Posts This Week</p>
          </div>
          <div>
            <p className="text-2xl font-bold">1,287</p>
            <p className="text-xs text-slate-500">Engagements</p>
          </div>
          <div>
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-slate-500">Leads from Content</p>
          </div>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-500" />
                Next Post: "Top 3 Mistakes First-Time Homebuyers Make"
            </p>
            <p className="text-xs text-slate-500 mt-1">Scheduled for today at 4:00 PM on Facebook & Instagram.</p>
        </div>
      </CardContent>
    </Card>
  );
}