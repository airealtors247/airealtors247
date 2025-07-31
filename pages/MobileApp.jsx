import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone } from 'lucide-react';

export default function MobileApp() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Smartphone /> Mobile App</h1>
      <Card>
        <CardHeader><CardTitle>Download Our Mobile App</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Find links to download our iOS and Android apps.</p></CardContent>
      </Card>
    </div>
  );
}