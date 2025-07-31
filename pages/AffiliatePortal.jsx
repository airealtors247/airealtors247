import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from 'lucide-react';

export default function AffiliatePortal() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Share2 /> Affiliate Portal</h1>
      <Card>
        <CardHeader><CardTitle>Your Affiliate Dashboard</CardTitle></CardHeader>
        <CardContent><p>This page is under construction. Track your referrals, commissions, and access marketing materials here.</p></CardContent>
      </Card>
    </div>
  );
}