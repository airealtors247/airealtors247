import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from 'lucide-react';

export default function Integrations() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Zap /> Integrations</h1>
      <Card>
        <CardHeader><CardTitle>Connect Your Tools</CardTitle></CardHeader>
        <CardContent><p>This is where you'll connect to your favorite external tools, CRMs, and platforms. This feature is under construction.</p></CardContent>
      </Card>
    </div>
  );
}