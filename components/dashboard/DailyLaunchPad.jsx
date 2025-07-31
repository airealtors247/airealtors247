
import React, { useState, useEffect } from 'react';
import { DailySuccessScore } from '@/api/entities';
import { Goal } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  Play,
  Zap,
  Brain,
  Star
} from 'lucide-react';
import OvernightAIReport from './OvernightAIReport';

export default function DailyLaunchPad({ user, goals, tasks }) {
  const [successScore, setSuccessScore] = useState(null);
  const [timeOnApp, setTimeOnApp] = useState(0);
  const [dailyGoals, setDailyGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDailyData();
    startTimeTracking();
  }, [user]);

  const loadDailyData = async () => {
    if (!user) return;
    
    try {
      const today = new Date().toISOString().split('T')[0];
      
      // Try to get today's success score
      const scores = await DailySuccessScore.filter({ 
        user_email: user.email, 
        date: today 
      });
      
      if (scores.length > 0) {
        setSuccessScore(scores[0]);
      } else {
        // Create initial score for today
        const initialScore = await DailySuccessScore.create({
          user_email: user.email,
          date: today,
          overall_score: 20, // Starting score
          score_breakdown: {
            goal_progress: 0,
            training_completed: 0,
            calls_made: 0,
            data_quality: 0,
            ai_interaction: 10
          },
          time_on_platform_minutes: 0,
          goals_completed: [],
          wins_achieved: [],
          improvement_areas: ["Complete daily training", "Make prospecting calls", "Clean CRM data"],
          celebration_message: "Welcome back! Let's make today amazing! 🚀",
          next_day_suggestions: ["Start with voice training", "Review goal progress", "Clean 10 contacts"]
        });
        setSuccessScore(initialScore);
      }

      // Load active goals
      const userGoals = await Goal.filter({ realtor_email: user.email, status: 'active' });
      setDailyGoals(userGoals);

    } catch (error) {
      console.error("Error loading daily data:", error);
    }
    setIsLoading(false);
  };

  const startTimeTracking = () => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const currentTime = Math.floor((Date.now() - startTime) / 60000); // minutes
      setTimeOnApp(currentTime);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  };

  const quickActions = [
    { label: "Voice Training", icon: Brain, action: "training", color: "bg-purple-500" },
    { label: "Make Calls", icon: Zap, action: "calls", color: "bg-green-500" },
    { label: "Clean CRM", icon: CheckCircle, action: "crm", color: "bg-blue-500" },
    { label: "Practice Scripts", icon: Play, action: "practice", color: "bg-orange-500" }
  ];

  if (isLoading) {
    return (
      <Card className="shadow-xl border-2 border-blue-200">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* NEW: Overnight AI Report at the top */}
      <OvernightAIReport user={user} />

      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {user?.first_name}! 
              </h2>
              <p className="text-slate-600 mt-1">Let's win today. Here's your current success score:</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">
                {successScore?.overall_score || 0}<span className="text-lg text-slate-500">/100</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                {timeOnApp}m today
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Success Score Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {successScore?.score_breakdown && Object.entries(successScore.score_breakdown).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-slate-900">{value}</div>
                <div className="text-xs text-slate-500 capitalize">{key.replace(/_/g, ' ')}</div>
                <Progress value={value} className="h-1 mt-1" />
              </div>
            ))}
          </div>

          {/* AI Suggestion */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-yellow-900">🧠 Top AI Suggestion</h4>
                <p className="text-yellow-800 text-sm mt-1">
                  Improve your FSBO script with this one sentence: "I specialize in helping homeowners sell without the typical agent fees and hassles."
                </p>
              </div>
            </div>
          </div>

          {/* Quick Resume */}
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-slate-900">🔗 Quick Resume</h4>
                <p className="text-slate-600 text-sm">Resume where you left off yesterday: Lead Training Module 3</p>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-1" />
                Continue
              </Button>
            </div>
          </div>

          {/* Daily Goals Checklist */}
          <div className="bg-white p-4 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3">✅ Today's Priority Actions</h4>
            <div className="space-y-2">
              {successScore?.improvement_areas?.map((area, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-700">{area}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">Pending</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <Button key={index} variant="outline" className="h-20 flex-col gap-2 hover:shadow-md transition-all">
                <div className={`w-8 h-8 ${action.color} rounded-full flex items-center justify-center`}>
                  <action.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>

          {/* Celebration Message */}
          {successScore?.celebration_message && (
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-900">Daily Motivation</h4>
              </div>
              <p className="text-green-800">{successScore.celebration_message}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
