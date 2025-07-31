import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Repeat } from 'lucide-react';

export default function Reselling() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Repeat /> Reselling</h1>
      <Card>
        <CardHeader><CardTitle>SaaS Reselling Configuration</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Configure your white-label plans, pricing, and features here.</p></CardContent>
      </Card>
    </div>
  );
}