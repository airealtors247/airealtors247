
import React, { useState, useEffect } from 'react';
import { Goal } from '@/api/entities';
import { InvokeLLM } from '@/api/integrations';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Target, 
  Brain, 
  Zap, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Calculator,
  Rocket
} from 'lucide-react';

export default function AIGoalPlanner({ user, goals }) {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [executionPlan, setExecutionPlan] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (goals.length > 0) {
      setSelectedGoal(goals[0]);
      calculateExecutionPlan(goals[0]);
    }
  }, [goals]);

  const calculateExecutionPlan = async (goal) => {
    if (!goal) return;
    
    setIsCalculating(true);
    try {
      const prompt = `You are an AI Real Estate Business Strategist. A realtor has set this goal:
      
      Goal: ${goal.target_value} ${goal.goal_type.replace(/_/g, ' ')}
      Current Progress: ${goal.current_progress}
      Time Remaining: ${Math.ceil((new Date(goal.end_date) - new Date()) / (1000 * 60 * 60 * 24))} days
      
      Calculate the EXACT execution plan with 10X multiplier safety buffer:
      
      Return a JSON response with:
      {
        "base_effort_needed": number,
        "market_multiplier": number,
        "total_ai_execution": number,
        "daily_actions_required": number,
        "success_probability": number,
        "execution_breakdown": {
          "ai_calls_daily": number,
          "sms_outreach_daily": number,
          "email_campaigns_daily": number,
          "social_posts_daily": number,
          "follow_ups_daily": number
        },
        "strategy_explanation": "brief explanation of the 10X approach"
      }`;

      const response = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            base_effort_needed: { type: "number" },
            market_multiplier: { type: "number" },
            total_ai_execution: { type: "number" },
            daily_actions_required: { type: "number" },
            success_probability: { type: "number" },
            execution_breakdown: {
              type: "object",
              properties: {
                ai_calls_daily: { type: "number" },
                sms_outreach_daily: { type: "number" },
                email_campaigns_daily: { type: "number" },
                social_posts_daily: { type: "number" },
                follow_ups_daily: { type: "number" }
              }
            },
            strategy_explanation: { type: "string" }
          }
        }
      });

      setExecutionPlan(response);
    } catch (error) {
      console.error("Error calculating execution plan:", error);
    }
    setIsCalculating(false);
  };

  if (!selectedGoal) {
    return (
      <Alert>
        <Target className="h-4 w-4" />
        <AlertDescription>
          Set a goal in the Growth Hub to activate the AI Goal Planner.
        </AlertDescription>
      </Alert>
    );
  }

  const progress = (selectedGoal.current_progress / selectedGoal.target_value) * 100;
  const remaining = selectedGoal.target_value - selectedGoal.current_progress;

  return (
    <Card className="shadow-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-900">
          <Brain className="w-6 h-6 text-indigo-600" />
          AI Goal Planner & 10X Execution Engine
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Current Goal Overview */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-slate-900 capitalize">
              {selectedGoal.goal_type.replace(/_/g, ' ')} Goal
            </h4>
            <Badge className="bg-indigo-100 text-indigo-800">
              {Math.ceil((new Date(selectedGoal.end_date) - new Date()) / (1000 * 60 * 60 * 24))} days left
            </Badge>
          </div>
          
          <div className="flex justify-between items-end mb-2">
            <span className="text-2xl font-bold text-indigo-600">
              {selectedGoal.current_progress} / {selectedGoal.target_value}
            </span>
            <span className="text-lg font-semibold text-slate-700">
              {remaining} remaining
            </span>
          </div>
          
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-slate-600">{progress.toFixed(1)}% complete</p>
        </div>

        {/* AI Execution Plan */}
        {isCalculating ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-slate-600">Calculating 10X execution plan...</span>
          </div>
        ) : executionPlan && (
          <div className="space-y-4">
            
            {/* Execution Summary */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Rocket className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-900">10X AI Execution Strategy</h4>
              </div>
              <p className="text-sm text-green-800 mb-3">{executionPlan.strategy_explanation}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-green-600">Base Effort Needed</p>
                  <p className="text-lg font-bold text-green-900">{executionPlan.base_effort_needed?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-green-600">AI Multiplier Applied</p>
                  <p className="text-lg font-bold text-green-900">{executionPlan.market_multiplier}X</p>
                </div>
                <div>
                  <p className="text-xs text-green-600">Total AI Actions</p>
                  <p className="text-lg font-bold text-green-900">{executionPlan.total_ai_execution?.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Daily Execution Breakdown */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                Daily AI Execution (Auto-Running)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <p className="text-xs text-blue-600">AI Calls</p>
                  <p className="font-bold text-blue-900">{executionPlan.execution_breakdown?.ai_calls_daily}</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded">
                  <p className="text-xs text-green-600">SMS Outreach</p>
                  <p className="font-bold text-green-900">{executionPlan.execution_breakdown?.sms_outreach_daily}</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <p className="text-xs text-purple-600">Email Campaigns</p>
                  <p className="font-bold text-purple-900">{executionPlan.execution_breakdown?.email_campaigns_daily}</p>
                </div>
                <div className="text-center p-2 bg-pink-50 rounded">
                  <p className="text-xs text-pink-600">Social Posts</p>
                  <p className="font-bold text-pink-900">{executionPlan.execution_breakdown?.social_posts_daily}</p>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded">
                  <p className="text-xs text-yellow-600">Follow-ups</p>
                  <p className="font-bold text-yellow-900">{executionPlan.execution_breakdown?.follow_ups_daily}</p>
                </div>
                <div className="text-center p-2 bg-indigo-50 rounded">
                  <p className="text-xs text-indigo-600">Total Daily</p>
                  <p className="font-bold text-indigo-900">{executionPlan.daily_actions_required}</p>
                </div>
              </div>
            </div>

            {/* Success Prediction */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-blue-900">Success Probability</h4>
                </div>
                <Badge className="bg-blue-600 text-white text-lg px-3 py-1">
                  {executionPlan.success_probability}%
                </Badge>
              </div>
              <p className="text-sm text-blue-800 mt-2">
                Based on current market conditions and our 10X execution approach, 
                you have a <strong>{executionPlan.success_probability}% probability</strong> of exceeding your goal.
              </p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => calculateExecutionPlan(selectedGoal)}
            disabled={isCalculating}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            <Zap className="w-4 h-4 mr-2" />
            {isCalculating ? 'Calculating...' : 'Recalculate Execution Plan'}
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center text-xs text-slate-500 bg-white/50 p-2 rounded-lg">
          <strong>Disclaimer:</strong> AIRealtors247 provides tools to maximize effort and probability of success. It does not guarantee any specific results, income, or listings. Your success depends on many factors, including your personal effort, skills, and market conditions. All AI-generated content and actions should be reviewed for compliance with local regulations.
        </div>
      </CardContent>
    </Card>
  );
}
