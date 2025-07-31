import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  Crown,
  Gift,
  Rocket,
  Star
} from 'lucide-react';

import ReferralEngine from "../components/growth/ReferralEngine";
import GoalSetter from "../components/growth/GoalSetter";

export default function GrowthPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    }
    setIsLoading(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-slate-200 rounded-xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-slate-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Growth Hub</h1>
                  <p className="text-purple-100">
                    Scale your business with AI-powered referrals and goal tracking
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" />
                <span className="text-lg font-semibold">{user?.credits_remaining || 0} Credits</span>
              </div>
              <Badge 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30"
              >
                {user?.subscription_tier === 'free_trial' ? 'Free Trial' : user?.subscription_tier?.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>

        {/* Free Trial Credit Warning */}
        {user?.subscription_tier === 'free_trial' && (
          <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Gift className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-900">Free Trial: 50 Credits to Explore</h3>
                    <p className="text-amber-700">
                      You have {user?.credits_remaining || 0} credits remaining. 
                      {user?.credits_remaining <= 10 ? ' Running low! ' : ' '}
                      Refer friends to earn more credits, or upgrade to a paid plan.
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-100">
                  View Plans
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <Card className="shadow-xl border-0">
          <Tabs defaultValue="referrals" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-xl">
              <TabsTrigger
                value="referrals"
                className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
              >
                <Users className="w-4 h-4" />
                Referral Engine
              </TabsTrigger>
              <TabsTrigger
                value="goals"
                className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
              >
                <Target className="w-4 h-4" />
                Goal Tracker
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6 p-6">
              <TabsContent value="referrals" className="mt-0">
                <ReferralEngine 
                  user={user} 
                  onUpdateUser={handleUpdateUser}
                />
              </TabsContent>

              <TabsContent value="goals" className="mt-0">
                <GoalSetter 
                  user={user} 
                  onUpdateUser={handleUpdateUser}
                />
              </TabsContent>
            </div>
          </Tabs>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-900">
                    {user?.total_referral_earnings_credits || 0}
                  </div>
                  <div className="text-sm text-blue-700">Total Credits Earned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-900">∞</div>
                  <div className="text-sm text-green-700">Unlimited Referrals</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-900">Premium</div>
                  <div className="text-sm text-purple-700">Referral Benefits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}