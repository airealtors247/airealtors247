import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Zap, 
  Users, 
  Share2, 
  Mail, 
  MessageSquare, 
  Play,
  Pause,
  Settings,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function LazyRealtorController({ user }) {
  const [automationSettings, setAutomationSettings] = useState({
    leadsPerWeek: [50],
    socialPostsPerDay: [3],
    emailsPerWeek: [100],
    smsPerWeek: [50]
  });
  
  const [isActive, setIsActive] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);

  const updateSetting = (key, value) => {
    setAutomationSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setShowEstimate(true);
  };

  const calculateMonthlyCost = () => {
    const leadCost = automationSettings.leadsPerWeek[0] * 4 * 2; // 2 credits per lead
    const socialCost = automationSettings.socialPostsPerDay[0] * 30 * 5; // 5 credits per post
    const emailCost = automationSettings.emailsPerWeek[0] * 4 * 1; // 1 credit per email
    const smsCost = automationSettings.smsPerWeek[0] * 4 * 3; // 3 credits per SMS
    
    return leadCost + socialCost + emailCost + smsCost;
  };

  const handleStartAutomation = () => {
    setIsActive(!isActive);
    // In production, this would save settings and start/stop automation
  };

  return (
    <Card className="shadow-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-green-900">Set It & Forget It</h3>
                <p className="text-green-700 text-sm font-normal">AI handles everything automatically</p>
              </div>
            </CardTitle>
          </div>
          <div className="text-right">
            <Badge className={`${isActive ? 'bg-green-500' : 'bg-gray-400'} text-white px-3 py-1`}>
              {isActive ? (
                <>
                  <Play className="w-3 h-3 mr-1" />
                  ACTIVE
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3 mr-1" />
                  PAUSED
                </>
              )}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        
        {/* Lead Scraping */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-slate-900">New Leads Per Week</span>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {automationSettings.leadsPerWeek[0]} leads
            </Badge>
          </div>
          <Slider
            value={automationSettings.leadsPerWeek}
            onValueChange={(value) => updateSetting('leadsPerWeek', value)}
            max={200}
            min={10}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>10 (Conservative)</span>
            <span>200 (Aggressive)</span>
          </div>
        </div>

        {/* Social Media Posts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-slate-900">Social Posts Per Day</span>
            </div>
            <Badge variant="outline" className="bg-purple-50 text-purple-700">
              {automationSettings.socialPostsPerDay[0]} posts
            </Badge>
          </div>
          <Slider
            value={automationSettings.socialPostsPerDay}
            onValueChange={(value) => updateSetting('socialPostsPerDay', value)}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>1 (Minimal)</span>
            <span>10 (Max Exposure)</span>
          </div>
        </div>

        {/* Cold Email Outreach */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-slate-900">Cold Emails Per Week</span>
            </div>
            <Badge variant="outline" className="bg-orange-50 text-orange-700">
              {automationSettings.emailsPerWeek[0]} emails
            </Badge>
          </div>
          <Slider
            value={automationSettings.emailsPerWeek}
            onValueChange={(value) => updateSetting('emailsPerWeek', value)}
            max={500}
            min={25}
            step={25}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>25 (Safe)</span>
            <span>500 (Maximum)</span>
          </div>
        </div>

        {/* Cold SMS Outreach */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-slate-900">Cold SMS Per Week</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {automationSettings.smsPerWeek[0]} messages
            </Badge>
          </div>
          <Slider
            value={automationSettings.smsPerWeek}
            onValueChange={(value) => updateSetting('smsPerWeek', value)}
            max={200}
            min={10}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>10 (Conservative)</span>
            <span>200 (Aggressive)</span>
          </div>
        </div>

        {/* Cost Estimate */}
        {showEstimate && (
          <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-slate-900">Monthly Credit Usage</h4>
              <Badge className="bg-blue-600 text-white">
                {calculateMonthlyCost().toLocaleString()} credits
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Lead Generation:</span>
                <span className="font-medium">{(automationSettings.leadsPerWeek[0] * 4 * 2).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Social Media:</span>
                <span className="font-medium">{(automationSettings.socialPostsPerDay[0] * 30 * 5).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Email Campaigns:</span>
                <span className="font-medium">{(automationSettings.emailsPerWeek[0] * 4 * 1).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">SMS Campaigns:</span>
                <span className="font-medium">{(automationSettings.smsPerWeek[0] * 4 * 3).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handleStartAutomation}
            className={`w-full text-lg py-6 font-bold ${
              isActive 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause Automation
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start AI Automation
              </>
            )}
          </Button>
          
          <Button variant="outline" className="w-full">
            <Settings className="w-4 h-4 mr-2" />
            Advanced Settings
          </Button>
        </div>

        {/* Status Indicator */}
        <div className={`p-3 rounded-lg border ${
          isActive 
            ? 'bg-green-50 border-green-200' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center gap-2">
            {isActive ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">AI is working 24/7 for you</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800 font-medium">Click "Start" to activate automation</span>
              </>
            )}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}