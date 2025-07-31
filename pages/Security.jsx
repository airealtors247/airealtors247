import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from 'lucide-react';

export default function Security() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Lock /> Security</h1>
      <Card>
        <CardHeader><CardTitle>Account Security</CardTitle></CardHeader>
        <CardContent><p>This is where you'll manage your password, enable two-factor authentication (2FA), and view account activity. This feature is under construction.</p></CardContent>
      </Card>
    </div>
  );
}