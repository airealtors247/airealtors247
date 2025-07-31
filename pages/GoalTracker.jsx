import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare } from 'lucide-react';

export default function GoalTracker() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><CheckSquare /> Goal Tracker</h1>
      <Card>
        <CardHeader><CardTitle>AI Goal Tracker & Planner</CardTitle></CardHeader>
        <CardContent><p>This is where you'll set your business goals and let the AI create an actionable plan to achieve them. This feature is under construction.</p></CardContent>
      </Card>
    </div>
  );
}