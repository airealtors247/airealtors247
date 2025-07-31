import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2 } from 'lucide-react';

export default function CompetitorWatchdog() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Users2 /> Competitor Watchdog</h1>
      <Card>
        <CardHeader><CardTitle>Competitor Analysis</CardTitle></CardHeader>
        <CardContent><p>This is where you'll use AI to analyze your local competition's listings, social media, and market share to find opportunities. This feature is under construction.</p></CardContent>
      </Card>
    </div>
  );
}