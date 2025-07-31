import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake } from 'lucide-react';

export default function Partners() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Handshake /> Partners</h1>
      <Card>
        <CardHeader><CardTitle>Our Partner Program</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Learn about becoming a certified partner or find one to help you.</p></CardContent>
      </Card>
    </div>
  );
}