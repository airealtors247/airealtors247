import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library } from 'lucide-react';

export default function TemplateLibrary() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Library /> Template Library</h1>
      <Card>
        <CardHeader><CardTitle>Community & Official Templates</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Find pre-built campaign templates, workflows, and account snapshots here.</p></CardContent>
      </Card>
    </div>
  );
}