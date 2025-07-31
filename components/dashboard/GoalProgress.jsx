import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Calendar } from 'lucide-react';

export default function GoalProgress() {
  const goals = [
    {
      title: 'Monthly Leads',
      current: 156,
      target: 200,
      color: 'blue',
      daysLeft: 8
    },
    {
      title: 'Deals to Close',
      current: 31,
      target: 40,
      color: 'green',
      daysLeft: 8
    },
    {
      title: 'Revenue Goal',
      current: 95000,
      target: 120000,
      color: 'purple',
      daysLeft: 8,
      format: 'currency'
    }
  ];

  const formatValue = (value, format) => {
    if (format === 'currency') {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return value;
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5 text-orange-600" />
          Goal Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal, index) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-900 text-sm">{goal.title}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {goal.daysLeft}d left
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">
                  {formatValue(goal.current, goal.format)}
                </span>
                <span className="text-sm text-slate-500">
                  of {formatValue(goal.target, goal.format)}
                </span>
              </div>
              <Progress value={Math.min(progress, 100)} className="h-2" />
              <div className="text-right">
                <span className={`text-xs font-semibold ${
                  progress >= 100 ? 'text-green-600' : 
                  progress >= 80 ? 'text-blue-600' : 
                  'text-orange-600'
                }`}>
                  {progress.toFixed(0)}% Complete
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}