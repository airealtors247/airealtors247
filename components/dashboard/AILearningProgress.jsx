import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BrainCircuit } from 'lucide-react';

export default function AILearningProgress({ score }) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BrainCircuit className="w-5 h-5 text-purple-600" />
          AI Personalization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-3">
          <div className="text-3xl font-bold text-purple-700">{score}%</div>
          <p className="text-slate-600 text-sm">AI understanding of your business</p>
        </div>
        <Progress value={score} className="h-2" />
        <p className="text-xs text-slate-500 mt-2 text-center">
          The more you use the AI, the better it gets at creating content for your niche.
        </p>
      </CardContent>
    </Card>
  );
}