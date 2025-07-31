import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from 'lucide-react';

export default function LeadMagnets() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><FileText /> Lead Magnets</h1>
      <Card>
        <CardHeader><CardTitle>AI-Powered Lead Magnets</CardTitle></CardHeader>
        <CardContent><p>This is where you'll generate compelling real estate reports, guides, and home valuations to capture new leads. This feature is under construction.</p></CardContent>
      </Card>
    </div>
  );
}