import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DailyAIActivity } from '@/api/entities';
import { GoalMultiplier } from '@/api/entities';
import ShareSuccessCard from './ShareSuccessCard';
import { TrendingUp, CheckCircle, Mail, MessageSquare, Share2, Target, Brain, Lightbulb } from 'lucide-react';

const OvernightAIReport = ({ user }) => {
  const [report, setReport] = useState(null);
  const [goal, setGoal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const reportData = await DailyAIActivity.filter({ user_email: user.email, activity_date: today }, '-created_date', 1);
        
        if (reportData && reportData.length > 0) {
          setReport(reportData[0]);
          const goalData = await GoalMultiplier.filter({ user_email: user.email, is_active: true}, '-created_date', 1);
          if (goalData && goalData.length > 0) {
            setGoal(goalData[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch overnight report:", error);
      }
      setIsLoading(false);
    };
    fetchReport();
  }, [user]);

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader><div className="h-6 bg-slate-200 rounded w-3/4"></div></CardHeader>
        <CardContent className="space-y-3">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </CardContent>
      </Card>
    );
  }

  if (!report) {
    return null; // Don't show anything if there's no report for today
  }

  const { overnight_actions: actions, results_achieved: results, ai_insights } = report;
  const totalLeads = results.new_leads_generated + results.referrals_generated;
  
  const userGoalTarget = goal?.original_target || 10;
  const monthlyGoalEquivalent = Math.ceil(userGoalTarget / 30);
  const shockFactor = totalLeads / (monthlyGoalEquivalent || 1);

  const viralMoment = {
    expected: monthlyGoalEquivalent,
    delivered: totalLeads
  };

  return (
    <Card className="shadow-2xl border-2 border-slate-200 bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-800">Your Overnight AI Update</CardTitle>
        <p className="text-slate-500">Here's what your AI assistant accomplished while you were away.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-slate-700 mb-3 text-lg">Quick Summary</h3>
          {/* Understated Reporting */}
          <p className="text-slate-600 text-base leading-relaxed">
            Things are looking organized. While you were out, I did some basic follow-ups and outreach. 
            We got a few more leads than usual ({totalLeads} vs. a daily goal of {monthlyGoalEquivalent}), and some positive conversations have started. 
            Nothing too fancy, just steady progress. 📈
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h4 className="font-bold text-slate-900 text-xl">{totalLeads}</h4>
            </div>
            <p className="text-sm text-slate-600">New Leads & Referrals</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <h4 className="font-bold text-slate-900 text-xl">{results.appointments_booked}</h4>
            </div>
            <p className="text-sm text-slate-600">Appointments Booked</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-5 h-5 text-purple-600" />
              <h4 className="font-bold text-slate-900 text-xl">{actions.emails_sent + actions.sms_sent}</h4>
            </div>
            <p className="text-sm text-slate-600">Emails & Texts Sent</p>
          </div>
        </div>

        {ai_insights && ai_insights.length > 0 && (
          <div>
            <h3 className="font-semibold text-slate-700 mb-2 text-lg flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              AI Insight
            </h3>
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 italic">"{ai_insights[0]}"</p>
            </div>
          </div>
        )}

        {shockFactor > 3 && (
          <ShareSuccessCard viralMoment={viralMoment} />
        )}

        <div className="text-center pt-4 border-t">
          <Button variant="outline">View Full Daily Report</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OvernightAIReport;