import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from 'lucide-react';

export default function AIListingWriter() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Edit /> AI Listing Writer</h1>
      <Card>
        <CardHeader><CardTitle>AI Listing Description Writer</CardTitle></CardHeader>
        <CardContent><p>This is where you'll use AI to craft compelling, SEO-optimized property descriptions that sell. This feature is under construction.</p></CardContent>
      </Card>
    </div>
  );
}