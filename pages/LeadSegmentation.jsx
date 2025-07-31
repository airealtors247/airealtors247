import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter } from 'lucide-react';

export default function LeadSegmentation() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8">
        <Filter className="w-8 h-8 text-orange-600" />
        Smart Lead Tags & Segmentation
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Advanced Lead Segmentation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Smart tagging and segmentation tools for better lead organization. This feature is under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}