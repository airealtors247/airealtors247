import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2 } from 'lucide-react';

export default function SubAccounts() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Users2 /> Sub-Accounts</h1>
      <Card>
        <CardHeader><CardTitle>Manage Your Sub-Accounts</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Here you will add, manage, and view all your client sub-accounts.</p></CardContent>
      </Card>
    </div>
  );
}