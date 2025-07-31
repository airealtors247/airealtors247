import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from 'lucide-react';

export default function AppMarketplace() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Store /> App Marketplace</h1>
      <Card>
        <CardHeader><CardTitle>Extend Your Platform</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Discover and install third-party apps and integrations.</p></CardContent>
      </Card>
    </div>
  );
}