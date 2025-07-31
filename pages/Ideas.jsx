import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from 'lucide-react';

export default function Ideas() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Lightbulb /> Ideas</h1>
      <Card>
        <CardHeader><CardTitle>Community Ideas Board</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Submit your feature ideas and upvote others' suggestions.</p></CardContent>
      </Card>
    </div>
  );
}