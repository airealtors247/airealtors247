import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard } from 'lucide-react';

export default function AgencyDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><LayoutDashboard /> Agency Dashboard</h1>
      <Card>
        <CardHeader><CardTitle>Welcome to your Agency Hub</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Here you will manage your sub-accounts, view aggregate analytics, and control your white-label settings.</p></CardContent>
      </Card>
    </div>
  );
}