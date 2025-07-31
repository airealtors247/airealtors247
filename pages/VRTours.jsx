import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera } from 'lucide-react';

export default function VRTours() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8">
        <Camera />
        <span>
            <span className="font-light text-slate-400">Virtual</span> Realty <span className="font-light text-slate-400">Tours</span>
        </span>
      </h1>
      <Card>
        <CardHeader><CardTitle>Realty Tour Generation</CardTitle></CardHeader>
        <CardContent><p>This is where you'll create immersive 3D realty tours from your property photos. This feature is under construction.</p></CardContent>
      </Card>
    </div>
  );
}