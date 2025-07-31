import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from 'lucide-react';

export default function ListingAnalytics() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><BarChart3 /> Listing Analytics</h1>
      <Card>
        <CardHeader><CardTitle>Property Listing Analytics</CardTitle></CardHeader>
        <CardContent><p>This is where you'll track the performance of your listings, including views, saves, and inquiries. This feature is under construction.</p></CardContent>
      </Card>
    </div>
  );
}