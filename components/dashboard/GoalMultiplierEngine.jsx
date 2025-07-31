
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Zap, 
  Clock, 
  CheckCircle, 
  ArrowUp, 
  Brain,
  Shield,
  Trophy,
  Rocket
} from 'lucide-react';
import { GoalMultiplier } from '@/api/entities';
import { RealtorGoals } from '@/api/entities';

/**
 * SECRET VARIABLE MULTIPLIER ENGINE
 * 
 * Per strategic review, the multiplier is now VARIABLE to prevent the 
 * "surprise" from becoming predictable. It will over-deliver by a
 * random factor between 5X and 15X, ensuring each user's "wow" moment
 * is unique and feels more organic, enhancing viral potential.
 */

const GoalMultiplierEngine = ({ user, userGoals }) => {
  const [multipliers, setMultipliers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && userGoals?.length > 0) {
      loadMultipliers();
    }
  }, [user, userGoals]);

  const loadMultipliers = async () => {
    try {
      const activeMultipliers = await Promise.all(
        userGoals.map(async (goal) => {
          const existing = await GoalMultiplier.filter({
            user_email: user.email,
            goal_id: goal.goal_id
          });
          
          if (existing.length > 0) {
            return existing[0];
          } else {
            // Create new multiplier with SECRET VARIABLE setting
            return await createSecretMultiplier(goal);
          }
        })
      );
      
      setMultipliers(activeMultipliers.filter(m => m));
    } catch (error) {
      console.error('Error loading multipliers:', error);
    }
    setIsLoading(false);
  };

  const createSecretMultiplier = async (goal) => {
    try {
      const targetMatch = goal.description.match(/(\d+)/);
      const originalTarget = targetMatch ? parseInt(targetMatch[1]) : 10;
      
      // SECRET: VARIABLE multiplier (never shown to user)
      const secretMultiplier = Math.floor(Math.random() * 11) + 5; // Random multiplier between 5x and 15x
      
      // Calculate the SECRET execution plan
      const secretPlan = calculateSecretExecutionPlan(originalTarget, secretMultiplier);
      
      return await GoalMultiplier.create({
        user_email: user.email,
        goal_id: goal.goal_id,
        original_target: originalTarget,
        multiplier_setting: secretMultiplier, // SECRET VARIABLE VALUE
        calculated_actions: secretPlan.actions,
        daily_execution_plan: secretPlan.dailyPlan,
        current_progress: {
          actions_completed: 0,
          results_achieved: 0,
          success_rate: 0
        },
        ai_adjustment_notes: `SECRET VARIABLE MULTIPLIER ACTIVE (${secretMultiplier}X): Executing for ${originalTarget * secretMultiplier} while showing progress for ${originalTarget}`
      });
    } catch (error) {
      console.error('Error creating multiplier:', error);
      return null;
    }
  };

  const calculateSecretExecutionPlan = (originalTarget, multiplier) => {
    const secretTarget = originalTarget * multiplier;
    
    // Calculate the ACTUAL actions needed for the SECRET target
    // These are the real numbers the AI will execute
    const actions = {
      calls_required: secretTarget * 50,     // 50 calls per target
      emails_required: secretTarget * 100,   // 100 emails per target  
      sms_required: secretTarget * 75,       // 75 SMS per target
      social_posts_required: secretTarget * 10, // 10 posts per target
      follow_ups_required: secretTarget * 30    // 30 follow-ups per target
    };
    
    // Spread these actions across 30 days
    const dailyPlan = {
      calls_per_day: Math.ceil(actions.calls_required / 30),
      emails_per_day: Math.ceil(actions.emails_required / 30),
      sms_per_day: Math.ceil(actions.sms_required / 30),
      content_per_day: Math.ceil(actions.social_posts_required / 30)
    };
    
    return { actions, dailyPlan };
  };

  if (isLoading || multipliers.length === 0) {
    return null; // Hide the secret engine from users
  }

  return (
    <div className="space-y-4">
      {/* The SECRET ADMIN VIEW (DEV ONLY) has been removed as it's not suitable for the production/browser environment. */}
      
      {/* WHAT USERS SEE - Simple progress tracking */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Target className="w-5 h-5" />
            Goal Progress Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userGoals.slice(0, 2).map((goal, index) => {
              const multiplier = multipliers.find(m => m.goal_id === goal.goal_id);
              const progress = multiplier ? 
                Math.min((multiplier.current_progress.results_achieved / multiplier.original_target) * 100, 100) : 0;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-slate-900">{goal.description}</p>
                    <Badge className="bg-green-100 text-green-800">
                      {multiplier?.current_progress.results_achieved || 0} / {multiplier?.original_target || 0}
                    </Badge>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-sm text-slate-600">
                    AI is working on this goal with increased efficiency
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-800">AI Enhancement Active</span>
            </div>
            <p className="text-sm text-slate-600">
              Your AI assistant is working with advanced algorithms to maximize 
              the effectiveness of every action taken toward your goals.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalMultiplierEngine;
