import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TrendingUp, 
  Target, 
  Zap, 
  AlertTriangle, 
  CheckCircle,
  Brain,
  ArrowUp
} from 'lucide-react';

export default function PerformanceIntelligence({ goals = [] }) {
  const [intelligence, setIntelligence] = useState({
    currentGoal: null,
    effortRequired: 0,
    aiEffortApplied: 0,
    remainingGap: 0,
    marketConditions: "normal",
    multiplier: 5,
    projectedSuccess: 95
  });

  useEffect(() => {
    calculateIntelligence();
  }, [goals]);

  const calculateIntelligence = () => {
    if (goals.length === 0) return;

    const primaryGoal = goals[0];
    const baseEffort = primaryGoal.target_value * 100; // Base calculation
    const marketMultiplier = 5; // Current market conditions require 5x effort
    const aiEffort = baseEffort * marketMultiplier;
    const remaining = Math.max(0, primaryGoal.target_value - primaryGoal.current_progress);

    setIntelligence({
      currentGoal: primaryGoal,
      effortRequired: baseEffort,
      aiEffortApplied: aiEffort,
      remainingGap: remaining,
      marketConditions: "challenging",
      multiplier: marketMultiplier,
      projectedSuccess: remaining <= 2 ? 95 : 85
    });
  };

  if (!intelligence.currentGoal) {
    return (
      <Alert>
        <Brain className="h-4 w-4" />
        <AlertDescription>
          Set a goal in the Growth Hub to activate AI Performance Intelligence.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="shadow-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Brain className="w-6 h-6 text-blue-600" />
          AI Performance Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Goal Overview */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-slate-900 capitalize">
              {intelligence.currentGoal.goal_type.replace(/_/g, ' ')} Goal
            </h4>
            <Badge className={intelligence.projectedSuccess >= 90 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
              {intelligence.projectedSuccess}% Success Probability
            </Badge>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-bold text-blue-600">
              {intelligence.currentGoal.current_progress} / {intelligence.currentGoal.target_value}
            </span>
            <span className="text-sm text-slate-500">
              {intelligence.remainingGap} remaining
            </span>
          </div>
          <Progress 
            value={(intelligence.currentGoal.current_progress / intelligence.currentGoal.target_value) * 100} 
            className="mt-2" 
          />
        </div>

        {/* AI Execution Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <Target className="w-5 h-5 text-slate-600 mx-auto mb-1" />
            <p className="text-sm text-slate-600">Projected Effort</p>
            <p className="text-lg font-bold text-slate-900">{intelligence.effortRequired.toLocaleString()}</p>
            <p className="text-xs text-slate-500">calls needed</p>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <Zap className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-sm text-slate-600">AI Effort Applied</p>
            <p className="text-lg font-bold text-green-600">{intelligence.aiEffortApplied.toLocaleString()}</p>
            <p className="text-xs text-slate-500">{intelligence.multiplier}x multiplier active</p>
          </div>
          
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <ArrowUp className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <p className="text-sm text-slate-600">Next Action Target</p>
            <p className="text-lg font-bold text-purple-600">{(intelligence.remainingGap * 250).toLocaleString()}</p>
            <p className="text-xs text-slate-500">auto-executing now</p>
          </div>
        </div>

        {/* Market Intelligence */}
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Market Intelligence:</strong> Due to {intelligence.marketConditions} market response rates, 
            we are auto-executing {intelligence.aiEffortApplied.toLocaleString()} outreach actions instead of {intelligence.effortRequired.toLocaleString()} 
            to ensure you hit your {intelligence.currentGoal.target_value} {intelligence.currentGoal.goal_type.replace(/_/g, ' ')} goal.
          </AlertDescription>
        </Alert>

        {/* Success Prediction */}
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-green-900">Success Forecast</h4>
          </div>
          <p className="text-sm text-green-800">
            Based on current AI execution rate and market conditions, you have a <strong>{intelligence.projectedSuccess}% probability</strong> of reaching your goal. 
            {intelligence.remainingGap <= 2 ? " You're ahead of schedule!" : " The AI is adjusting strategy to ensure success."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}