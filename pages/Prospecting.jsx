import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from 'lucide-react';

export default function Prospecting() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Search /> Prospecting</h1>
      <Card>
        <CardHeader><CardTitle>Agency Prospecting Tools</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Here you will find tools to prospect for new clients for your agency.</p></CardContent>
      </Card>
    </div>
  );
}