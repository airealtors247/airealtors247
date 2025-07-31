import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle } from 'lucide-react';

export default function Automations() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><PlayCircle /> Automations</h1>
      <Card>
        <CardHeader><CardTitle>Workflow Automation</CardTitle></CardHeader>
        <CardContent><p>This is where you'll build powerful "if-this-then-that" style automations to streamline your business processes. This feature is under construction.</p></CardContent>
      </Card>
    </div>
  );
}