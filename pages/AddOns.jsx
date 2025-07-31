import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusSquare } from 'lucide-react';

export default function AddOns() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><PlusSquare /> Add-Ons</h1>
      <Card>
        <CardHeader><CardTitle>Marketplace Add-Ons</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Browse and purchase premium add-ons for your agency and sub-accounts.</p></CardContent>
      </Card>
    </div>
  );
}