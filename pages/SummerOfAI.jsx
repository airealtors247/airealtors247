import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun } from 'lucide-react';

export default function SummerOfAI() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Sun /> Summer of AI</h1>
      <Card>
        <CardHeader><CardTitle>Join the Summer of AI Event</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Learn about our summer event, special offers, and training sessions.</p></CardContent>
      </Card>
    </div>
  );
}