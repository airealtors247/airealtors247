import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag } from 'lucide-react';

export default function SwagStore() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><ShoppingBag /> AIRealtors247 Swag</h1>
      <Card>
        <CardHeader><CardTitle>Get Your Gear</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Shop for branded merchandise and apparel.</p></CardContent>
      </Card>
    </div>
  );
}