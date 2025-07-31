import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function GoalTracker({ goals }) {
  const goal = goals?.[0]; // Display the primary goal

  if (!goal) return null;

  const progress = (goal.current_progress / goal.target_value) * 100;
  const goalMultiplier = 3; // The 3x safety buffer
  const systemTarget = goal.target_value * goalMultiplier;

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Goal Tracker
          </div>
          <span className="text-xs font-normal text-slate-500">
            Ends: {new Date(goal.end_date).toLocaleDateString()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex justify-between items-end mb-1">
            <span className="font-semibold text-slate-800 capitalize">
              {goal.goal_type.replace(/_/g, ' ')}
            </span>
            <span className="font-bold text-xl text-green-600">
              {goal.current_progress} / {goal.target_value}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
        
        <div className="bg-purple-50 border border-purple-200 text-purple-900 p-3 rounded-lg text-center mt-4">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <h4 className="font-semibold">Goal Multiplier Engine™ Active</h4>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>To guarantee success, we aim 3-5x higher than your goal.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm mt-1">
            Your Goal: <span className="font-bold">{goal.target_value} deals</span>. My Target For You: <span className="font-bold">{systemTarget} qualified leads</span>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}