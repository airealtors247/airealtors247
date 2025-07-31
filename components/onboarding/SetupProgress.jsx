import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/api/entities";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
  Database,
  Phone,
  Sparkles,
  Users,
  RefreshCw
} from "lucide-react";

export default function SetupProgress() {
  const [user, setUser] = useState(null);
  const [setupSteps, setSetupSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSetupStatus();
    const interval = setInterval(loadSetupStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadSetupStatus = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      
      // Simulate setup progress based on user's setup_status
      const steps = generateSetupSteps(userData);
      setSetupSteps(steps);
    } catch (error) {
      console.error("Error loading setup status:", error);
    }
    setIsLoading(false);
  };

  const generateSetupSteps = (userData) => {
    const status = userData.setup_status || 'pending';
    
    const allSteps = [
      {
        id: 'account_creation',
        title: 'Account Verification',
        description: 'Verifying your information and creating accounts',
        icon: <Settings className="w-5 h-5" />,
        estimatedTime: '5 minutes'
      },
      {
        id: 'crm_setup',
        title: userData.crm_option === 'provided_ghl' ? 'GoHighLevel CRM Setup' : 'CRM Integration',
        description: userData.crm_option === 'provided_ghl' 
          ? 'Creating your dedicated GoHighLevel CRM instance'
          : `Connecting to your ${userData.existing_crm_type || 'existing'} CRM`,
        icon: <Database className="w-5 h-5" />,
        estimatedTime: '15 minutes'
      },
      {
        id: 'phone_system',
        title: 'Phone System Configuration',
        description: `Setting up ${userData.sip_provider || 'SIP'} trunks and AI voice system`,
        icon: <Phone className="w-5 h-5" />,
        estimatedTime: '10 minutes'
      },
      {
        id: 'ai_content',
        title: 'AI Content Generation',
        description: `Generating territory-specific content for ${userData.primary_city}`,
        icon: <Sparkles className="w-5 h-5" />,
        estimatedTime: '20 minutes'
      },
      {
        id: 'lead_generation',
        title: 'Lead Generation Setup',
        description: 'Configuring automated lead capture and nurturing sequences',
        icon: <Users className="w-5 h-5" />,
        estimatedTime: '15 minutes'
      },
      {
        id: 'social_media',
        title: 'Social Media Automation',
        description: 'Preparing social media accounts and automation workflows',
        icon: <RefreshCw className="w-5 h-5" />,
        estimatedTime: '10 minutes'
      }
    ];

    // Set status based on overall setup_status
    const statusMap = {
      'pending': 0,
      'provisioning': 2,
      'configuring': 4,
      'complete': 6,
      'error': -1
    };

    const completedSteps = statusMap[status] || 0;

    return allSteps.map((step, index) => ({
      ...step,
      status: completedSteps === -1 ? 'error' :
              index < completedSteps ? 'complete' :
              index === completedSteps ? 'in_progress' : 'pending'
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  const getOverallProgress = () => {
    const completed = setupSteps.filter(step => step.status === 'complete').length;
    return Math.round((completed / setupSteps.length) * 100);
  };

  const getEstimatedTimeRemaining = () => {
    const remainingSteps = setupSteps.filter(step => step.status === 'pending' || step.status === 'in_progress');
    const totalMinutes = remainingSteps.reduce((sum, step) => {
      const minutes = parseInt(step.estimatedTime.match(/\d+/)[0]);
      return sum + minutes;
    }, 0);
    
    if (totalMinutes < 60) {
      return `${totalMinutes} minutes`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h ${minutes}m`;
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <Card className="h-96">
          <CardContent className="p-6">
            <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-100 rounded"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" />
            Platform Setup Progress
          </div>
          <Button variant="outline" size="sm" onClick={loadSetupStatus}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Overall Progress */}
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-slate-900">Overall Progress</span>
            <span className="text-2xl font-bold text-blue-600">{getOverallProgress()}%</span>
          </div>
          <Progress value={getOverallProgress()} className="h-3 mb-2" />
          <div className="flex justify-between text-sm text-slate-600">
            <span>Estimated time remaining: {getEstimatedTimeRemaining()}</span>
            <span>{setupSteps.filter(s => s.status === 'complete').length} of {setupSteps.length} complete</span>
          </div>
        </div>

        {/* Setup Steps */}
        <div className="space-y-4">
          {setupSteps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-slate-900">{step.title}</h4>
                  <Badge className={getStatusColor(step.status)}>
                    {step.status.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-2">{step.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>Est. {step.estimatedTime}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                {step.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Status Messages */}
        {user?.setup_status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-800">Setup Error</span>
            </div>
            <p className="text-sm text-red-700 mb-3">
              There was an issue during setup. Our team has been notified and will resolve this shortly.
            </p>
            <Button size="sm" variant="outline" className="border-red-300 text-red-700">
              Contact Support
            </Button>
          </div>
        )}

        {user?.setup_status === 'complete' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Setup Complete!</span>
            </div>
            <p className="text-sm text-green-700 mb-3">
              Your AIRealtors247 platform is ready to use. You can now start generating leads and managing your real estate business with AI automation.
            </p>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              Go to Dashboard
            </Button>
          </div>
        )}

        {user?.setup_status === 'provisioning' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="font-medium text-blue-800">Setup In Progress</span>
            </div>
            <p className="text-sm text-blue-700">
              We're setting up your platform now. You'll receive email notifications as each component is configured. 
              This page will automatically update with the latest progress.
            </p>
          </div>
        )}

      </CardContent>
    </Card>
  );
}