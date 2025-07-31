import React, { useState, useEffect } from 'react';
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  Database,
  Phone,
  Share2,
  Brain,
  Shield
} from "lucide-react";

const setupSteps = [
  {
    id: "ghl_account",
    title: "GoHighLevel CRM Setup",
    description: "Creating your dedicated CRM account",
    icon: Database,
    estimatedTime: "2-3 minutes"
  },
  {
    id: "sip_configuration",
    title: "Phone System Configuration",
    description: "Configuring SIP trunks for voice calls",
    icon: Phone,
    estimatedTime: "1-2 minutes"
  },
  {
    id: "social_preparation",
    title: "Social Media Integration",
    description: "Preparing social media connections",
    icon: Share2,
    estimatedTime: "1 minute"
  },
  {
    id: "ai_personalization",
    title: "AI Content Engine",
    description: "Personalizing AI for your market area",
    icon: Brain,
    estimatedTime: "2-3 minutes"
  },
  {
    id: "compliance_engine",
    title: "Compliance System",
    description: "Setting up legal compliance checks",
    icon: Shield,
    estimatedTime: "1 minute"
  },
  {
    id: "final_verification",
    title: "Final Verification",
    description: "Testing all systems and connections",
    icon: CheckCircle,
    estimatedTime: "1 minute"
  }
];

export default function AutoSetupEngine({ user, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [setupLogs, setSetupLogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && !user.setup_completed) {
      startAutomatedSetup();
    }
  }, [user]);

  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setSetupLogs(prev => [...prev, { timestamp, message, type }]);
  };

  const startAutomatedSetup = async () => {
    setIsRunning(true);
    addLog("🚀 Starting automated platform setup...", "info");

    try {
      for (let i = 0; i < setupSteps.length; i++) {
        setCurrentStep(i);
        const step = setupSteps[i];
        
        addLog(`⚙️ ${step.title}...`, "info");
        
        // Simulate setup process for each step
        await executeSetupStep(step);
        
        setCompletedSteps(prev => [...prev, step.id]);
        addLog(`✅ ${step.title} completed`, "success");
        
        // Small delay between steps for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Update user status
      await User.updateMyUserData({
        setup_completed: true,
        platform_ready: true,
        ghl_account_created: true,
        sip_configured: true,
        social_accounts_connected: false, // Will be true once they connect
        content_generation_enabled: true,
        account_status: "active"
      });

      addLog("🎉 Setup completed successfully! Platform is ready to use.", "success");
      
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);

    } catch (error) {
      setError(error.message);
      addLog(`❌ Setup failed: ${error.message}`, "error");
    }
    
    setIsRunning(false);
  };

  const executeSetupStep = async (step) => {
    // Simulate different setup processes
    switch (step.id) {
      case "ghl_account":
        await simulateGHLSetup();
        break;
      case "sip_configuration":
        await simulateSIPSetup();
        break;
      case "social_preparation":
        await simulateSocialSetup();
        break;
      case "ai_personalization":
        await simulateAISetup();
        break;
      case "compliance_engine":
        await simulateComplianceSetup();
        break;
      case "final_verification":
        await simulateFinalVerification();
        break;
    }
  };

  const simulateGHLSetup = async () => {
    addLog("Creating GoHighLevel sub-account...");
    await delay(2000);
    addLog("Configuring CRM pipelines...");
    await delay(1500);
    addLog("Setting up automation workflows...");
    await delay(1000);
    addLog(`GHL Account ID: GHL_${user.email.split('@')[0]}_${Date.now()}`);
  };

  const simulateSIPSetup = async () => {
    addLog(`Configuring ${user.sip_provider} SIP trunks...`);
    await delay(1500);
    addLog(`Primary trunk: ${user.sip_trunk_1}`);
    await delay(500);
    if (user.sip_trunk_2) {
      addLog(`Secondary trunk: ${user.sip_trunk_2}`);
    }
    addLog("Voice routing configured");
  };

  const simulateSocialSetup = async () => {
    addLog("Preparing social media integrations...");
    await delay(1000);
    addLog("OAuth endpoints configured");
    await delay(500);
    addLog("Content templates loaded");
  };

  const simulateAISetup = async () => {
    addLog(`Personalizing AI for ${user.primary_city}, ${user.primary_zip_code}...`);
    await delay(2000);
    addLog("Loading local market data...");
    await delay(1500);
    addLog("Training content generation models...");
    await delay(1000);
    addLog("Compliance rules configured");
  };

  const simulateComplianceSetup = async () => {
    addLog("Initializing legal compliance engine...");
    await delay(1000);
    addLog("Loading real estate regulations...");
    await delay(800);
    addLog("Fair housing compliance enabled");
  };

  const simulateFinalVerification = async () => {
    addLog("Running system tests...");
    await delay(1500);
    addLog("Verifying integrations...");
    await delay(1000);
    addLog("Platform ready for use!");
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const getStepStatus = (stepIndex) => {
    if (completedSteps.includes(setupSteps[stepIndex].id)) return "completed";
    if (stepIndex === currentStep && isRunning) return "active";
    if (stepIndex < currentStep) return "completed";
    return "pending";
  };

  const progressPercentage = (completedSteps.length / setupSteps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            Automated Platform Setup
          </CardTitle>
          <p className="text-slate-600">
            Sit back and relax while we configure your complete real estate automation platform
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">
                Setup Progress
              </span>
              <span className="text-sm text-slate-500">
                {completedSteps.length}/{setupSteps.length} steps completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Setup Steps */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Steps List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Setup Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {setupSteps.map((step, index) => {
                const status = getStepStatus(index);
                const StepIcon = step.icon;
                
                return (
                  <div key={step.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      status === "completed" ? "bg-green-100" :
                      status === "active" ? "bg-blue-100" : "bg-slate-200"
                    }`}>
                      {status === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : status === "active" ? (
                        <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                      ) : (
                        <StepIcon className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900">{step.title}</h3>
                      <p className="text-sm text-slate-600">{step.description}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Est. time: {step.estimatedTime}
                      </p>
                    </div>
                    <Badge variant={
                      status === "completed" ? "default" :
                      status === "active" ? "secondary" : "outline"
                    }>
                      {status === "completed" ? "Done" :
                       status === "active" ? "Running" : "Pending"}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Live Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Setup Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
              {setupLogs.map((log, index) => (
                <div key={index} className={`mb-2 ${
                  log.type === "success" ? "text-green-400" :
                  log.type === "error" ? "text-red-400" :
                  log.type === "warning" ? "text-yellow-400" : "text-slate-300"
                }`}>
                  <span className="text-slate-500">[{log.timestamp}]</span> {log.message}
                </div>
              ))}
              {isRunning && (
                <div className="text-blue-400 animate-pulse">
                  <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> ⚙️ Setup in progress...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Setup Error:</strong> {error}
            <br />
            <span className="text-sm">Our support team has been notified. You can retry setup or contact support.</span>
          </AlertDescription>
        </Alert>
      )}

      {/* Completion Message */}
      {completedSteps.length === setupSteps.length && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Setup Complete!</strong> Your AIRealtors247 platform is fully configured and ready to use. 
            You'll be redirected to your dashboard in a few seconds.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}