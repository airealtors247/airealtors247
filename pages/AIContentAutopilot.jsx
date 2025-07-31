import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from 'lucide-react';

export default function AIContentAutopilot() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Sparkles /> AI Content Autopilot</h1>
      <Card>
        <CardHeader><CardTitle>Content Autopilot</CardTitle></CardHeader>
        <CardContent><p>This is where you'll configure your AI to automatically create and manage content based on your brand, niche, and market. This feature is under construction.</p></CardContent>
      </Card>
    </div>
  );
}