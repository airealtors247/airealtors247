import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  TrendingUp, 
  Users, 
  Phone, 
  MessageSquare, 
  Target
} from 'lucide-react';

export default function AIPerformanceCenter() {
  const aiMetrics = [
    {
      label: 'AI Leads',
      value: 156,
      target: 200,
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Auto Calls',
      value: 847,
      target: 1000,
      icon: Phone,
      color: 'green'
    },
    {
      label: 'Follow-ups',
      value: 1240,
      target: 1500,
      icon: MessageSquare,
      color: 'purple'
    }
  ];

  return (
    <Card className="shadow-lg border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          AI Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* AI Status */}
        <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-semibold text-green-900 text-sm">AI ACTIVE</span>
          </div>
          <p className="text-xs text-green-800">
            247 actions across 12 platforms
          </p>
        </div>

        {/* Compact Metrics */}
        <div className="space-y-3">
          {aiMetrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`w-4 h-4 text-${metric.color}-600`} />
                  <span className="font-medium text-slate-900 text-sm">{metric.label}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900 text-sm">{metric.value}</div>
                  <div className="text-xs text-slate-500">of {metric.target}</div>
                </div>
              </div>
              <Progress value={(metric.value / metric.target) * 100} className="h-1.5" />
            </div>
          ))}
        </div>

        {/* Performance Badge */}
        <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-orange-900">5,247</div>
          <div className="text-xs text-orange-800">Actions Today</div>
          <Badge variant="outline" className="text-xs mt-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            10X Mode
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}