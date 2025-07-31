import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { User } from "@/api/entities";
import { ContentSchedule } from "@/api/entities";
import {
  Settings,
  Zap,
  FileText,
  Video,
  Image,
  MessageSquare,
  TrendingUp,
  Clock,
  DollarSign,
  Save
} from "lucide-react";

const contentTypes = [
  {
    id: "static_post",
    name: "Static Posts",
    icon: Image,
    description: "Simple image posts with captions",
    credit_cost: 2,
    color: "text-blue-600"
  },
  {
    id: "article",
    name: "Articles/Blogs",
    icon: FileText,
    description: "Long-form educational content",
    credit_cost: 8,
    color: "text-green-600"
  },
  {
    id: "video_short",
    name: "Short Videos",
    icon: Video,
    description: "15-60 second clips (Reels, Shorts, TikTok)",
    credit_cost: 15,
    color: "text-purple-600"
  },
  {
    id: "video_long",
    name: "Long Videos",
    icon: Video,
    description: "2-10 minute educational videos",
    credit_cost: 35,
    color: "text-red-600"
  },
  {
    id: "ugc_video",
    name: "UGC Videos",
    icon: MessageSquare,
    description: "User-generated style content",
    credit_cost: 25,
    color: "text-amber-600"
  }
];

const socialPlatforms = [
  { id: "facebook", name: "Facebook", max_posts: 10 },
  { id: "instagram", name: "Instagram", max_posts: 15 },
  { id: "linkedin", name: "LinkedIn", max_posts: 5 },
  { id: "twitter", name: "Twitter", max_posts: 20 },
  { id: "youtube", name: "YouTube", max_posts: 3 },
  { id: "tiktok", name: "TikTok", max_posts: 10 },
  { id: "google_business", name: "Google Business", max_posts: 5 },
  { id: "pinterest", name: "Pinterest", max_posts: 8 }
];

export default function ContentProductionManager({ user, onUpdateUser }) {
  const [contentSchedules, setContentSchedules] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("facebook");
  const [isSaving, setIsSaving] = useState(false);
  const [dailyCreditCost, setDailyCreditCost] = useState(0);

  useEffect(() => {
    loadContentSchedules();
  }, []);

  useEffect(() => {
    calculateDailyCreditCost();
  }, [contentSchedules]);

  const loadContentSchedules = async () => {
    try {
      const schedules = await ContentSchedule.filter({ realtor_email: user.email });
      setContentSchedules(schedules);
    } catch (error) {
      console.error("Error loading content schedules:", error);
    }
  };

  const calculateDailyCreditCost = () => {
    let totalCost = 0;
    contentSchedules.forEach(schedule => {
      if (schedule.schedule_active) {
        const contentType = contentTypes.find(ct => ct.id === schedule.content_type);
        totalCost += (contentType?.credit_cost || 0) * schedule.posts_per_day;
      }
    });
    setDailyCreditCost(totalCost);
  };

  const updateSchedule = async (platform, contentType, postsPerDay, active = true) => {
    try {
      const existingSchedule = contentSchedules.find(
        s => s.platform === platform && s.content_type === contentType
      );

      const scheduleData = {
        realtor_email: user.email,
        platform,
        content_type: contentType,
        posts_per_day: postsPerDay,
        schedule_active: active,
        credit_cost_per_post: contentTypes.find(ct => ct.id === contentType)?.credit_cost || 0
      };

      if (existingSchedule) {
        await ContentSchedule.update(existingSchedule.id, scheduleData);
      } else {
        await ContentSchedule.create(scheduleData);
      }

      loadContentSchedules();
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const getScheduleForPlatformAndType = (platform, contentType) => {
    return contentSchedules.find(s => s.platform === platform && s.content_type === contentType);
  };

  const getTierLimits = (tier) => {
    const limits = {
      trial: { maxPosts: 2, maxAccounts: 2, dailyCredits: 50 },
      starter: { maxPosts: 5, maxAccounts: 5, dailyCredits: 100 },
      professional: { maxPosts: 10, maxAccounts: 10, dailyCredits: 250 },
      premium: { maxPosts: 20, maxAccounts: 20, dailyCredits: 500 },
      enterprise: { maxPosts: 50, maxAccounts: 50, dailyCredits: 1000 },
      unlimited: { maxPosts: 100, maxAccounts: 100, dailyCredits: 2500 }
    };
    return limits[tier] || limits.trial;
  };

  const currentLimits = getTierLimits(user?.subscription_tier || 'trial');
  const canAffordDailyProduction = dailyCreditCost <= (user?.credits_remaining || 0) / 30;

  return (
    <div className="space-y-8">
      
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Daily Credit Cost</p>
                <p className="text-2xl font-bold text-slate-900">{dailyCreditCost}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Monthly Estimate</p>
                <p className="text-2xl font-bold text-slate-900">{dailyCreditCost * 30}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Credits Remaining</p>
                <p className="text-2xl font-bold text-slate-900">{user?.credits_remaining || 0}</p>
              </div>
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Days Remaining</p>
                <p className="text-2xl font-bold text-slate-900">
                  {dailyCreditCost > 0 ? Math.floor((user?.credits_remaining || 0) / dailyCreditCost) : '∞'}
                </p>
              </div>
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Warning if over budget */}
      {!canAffordDailyProduction && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-red-800 font-medium">
                Your current settings will consume {dailyCreditCost * 30} credits per month, 
                but you only have {user?.credits_remaining || 0} credits remaining. 
                Consider reducing production or purchasing more credits.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Platform Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" />
            Content Production Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            {/* Platform Selector */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-3 block">
                Configure Platform ({user?.connected_social_accounts?.length || 0}/{currentLimits.maxAccounts} accounts connected)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {socialPlatforms.slice(0, currentLimits.maxAccounts).map(platform => (
                  <Button
                    key={platform.id}
                    variant={selectedPlatform === platform.id ? "default" : "outline"}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className="justify-start"
                  >
                    {platform.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Content Type Configuration for Selected Platform */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 capitalize">
                {socialPlatforms.find(p => p.id === selectedPlatform)?.name} Content Settings
              </h3>
              
              {contentTypes.map(contentType => {
                const schedule = getScheduleForPlatformAndType(selectedPlatform, contentType.id);
                const postsPerDay = schedule?.posts_per_day || 2;
                const isActive = schedule?.schedule_active !== false;
                const ContentIcon = contentType.icon;

                return (
                  <Card key={contentType.id} className="border border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ContentIcon className={`w-6 h-6 ${contentType.color}`} />
                          <div>
                            <h4 className="font-medium text-slate-900">{contentType.name}</h4>
                            <p className="text-sm text-slate-500">{contentType.description}</p>
                            <Badge variant="secondary" className="mt-2">
                              {contentType.credit_cost} credits per post
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <label className="text-sm text-slate-500">Posts per day</label>
                            <div className="w-32">
                              <Slider
                                value={[postsPerDay]}
                                onValueChange={([value]) => updateSchedule(selectedPlatform, contentType.id, value, isActive)}
                                max={Math.min(currentLimits.maxPosts, socialPlatforms.find(p => p.id === selectedPlatform)?.max_posts || 10)}
                                min={0}
                                step={1}
                                className="mt-2"
                              />
                              <p className="text-center text-sm font-medium mt-1">{postsPerDay}</p>
                            </div>
                          </div>
                          
                          <Switch
                            checked={isActive}
                            onCheckedChange={(checked) => updateSchedule(selectedPlatform, contentType.id, postsPerDay, checked)}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between text-sm text-slate-500">
                        <span>Daily cost: {(contentType.credit_cost * postsPerDay)} credits</span>
                        <span>Monthly cost: {(contentType.credit_cost * postsPerDay * 30)} credits</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade CTA if needed */}
      {user?.subscription_tier === 'trial' && (
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Unlock Higher Production Limits
            </h3>
            <p className="text-slate-600 mb-4">
              Upgrade to produce up to {getTierLimits('professional').maxPosts} posts per day 
              across {getTierLimits('professional').maxAccounts} social media accounts
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              Upgrade Plan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}