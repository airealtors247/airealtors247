import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, WifiOff, Clock } from 'lucide-react';

export default function ServerStatusIndicator({ isOnline }) {
  return (
    <Card className={`shadow-lg border-0 ${isOnline ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          {isOnline ? (
            <Wifi className="w-5 h-5 text-blue-600" />
          ) : (
            <Clock className="w-5 h-5 text-amber-600" />
          )}
          AI Backend Server
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className={`text-2xl font-bold ${isOnline ? 'text-blue-700' : 'text-amber-700'}`}>
            {isOnline ? 'Ready' : 'Preparing'}
          </div>
          <p className="text-slate-600 text-sm">
            {isOnline ? 'Platform is operational and ready for launch.' : 'AI server deployment in progress.'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}