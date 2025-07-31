import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, Zap, Rocket } from 'lucide-react';
import CreditBalance from "../ui/CreditBalance";

export default function QuickSetupWizard({ user }) {
  const setupSteps = [
    {
      id: 'profile',
      title: 'Complete Profile',
      completed: user?.profile_image_url ? true : false,
    },
    {
      id: 'mls',
      title: 'Connect MLS',
      completed: false,
    },
    {
      id: 'social',
      title: 'Link Social Media',
      completed: false,
    },
    {
      id: 'phone',
      title: 'Add Phone Numbers',
      completed: false,
    }
  ];

  const completionRate = (setupSteps.filter(step => step.completed).length / setupSteps.length) * 100;

  const handleStepClick = (stepId) => {
    console.log(`Opening setup for: ${stepId}`);
  };

  return (
    <Card className="shadow-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-900">Quick Setup</h3>
            <p className="text-blue-700 text-sm">Get AI working in 5 minutes</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Progress</span>
            <span className="font-semibold text-blue-600">{Math.round(completionRate)}%</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>

        {/* Compact Setup Steps */}
        <div className="space-y-2">
          {setupSteps.map((step, index) => (
            <div 
              key={step.id}
              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:shadow-sm transition-all ${
                step.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-slate-200 hover:border-blue-300'
              }`}
              onClick={() => handleStepClick(step.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  step.completed 
                    ? 'bg-green-500 text-white' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                <span className="font-medium text-slate-900 text-sm">{step.title}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </div>
          ))}
        </div>

        {/* Credits Display */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-slate-900">{user?.credits_remaining || 0}</div>
              <div className="text-xs text-slate-600">Credits Available</div>
            </div>
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={() => handleStepClick('profile')}
        >
          <Zap className="w-4 h-4 mr-2" />
          Start Setup
        </Button>
      </CardContent>
    </Card>
  );
}