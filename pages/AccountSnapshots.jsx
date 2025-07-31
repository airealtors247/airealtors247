import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from 'lucide-react';

export default function AccountSnapshots() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Camera /> Account Snapshots</h1>
      <Card>
        <CardHeader><CardTitle>Create & Manage Snapshots</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Use snapshots to create templates and deploy settings to new sub-accounts instantly.</p></CardContent>
      </Card>
    </div>
  );
}