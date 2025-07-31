import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from 'lucide-react';

export default function AILeadFinder() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8">
        <Search className="w-8 h-8 text-purple-600" />
        AI Lead Finder (Smart Prospecting)
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Smart Lead Discovery & Prospecting</CardTitle>
        </CardHeader>
        <CardContent>
          <p>AI-powered lead finding and smart prospecting tools. This feature is under construction.</p>
        </CardContent>
      </Card>
    </div>
  );
}