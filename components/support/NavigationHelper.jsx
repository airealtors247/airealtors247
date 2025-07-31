import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, MapPin, Monitor, AlertCircle } from 'lucide-react';

export default function NavigationHelper({ targetPage = "System Health" }) {
  const [currentStep, setCurrentStep] = useState(0);

  const navigationSteps = {
    "System Health": [
      {
        step: 1,
        title: "Look at the Left Sidebar",
        description: "On the left side of your screen, you'll see a menu with different sections like 'Core', 'Platform', etc.",
        icon: MapPin,
        image: "/images/sidebar-overview.png"
      },
      {
        step: 2,
        title: "Find 'Platform Admin' Section",
        description: "Scroll down in the left sidebar until you see a section titled 'Platform Admin' in gray text",
        icon: Monitor,
        image: "/images/platform-admin-section.png"
      },
      {
        step: 3,
        title: "Click on 'System Health'",
        description: "Under the 'Platform Admin' section, you'll see 'System Health' with a heart icon. Click on it.",
        icon: AlertCircle,
        image: "/images/system-health-link.png"
      }
    ]
  };

  const steps = navigationSteps[targetPage] || [];

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          How to Navigate to {targetPage}
        </CardTitle>
        <p className="text-sm text-slate-600">
          Step-by-step guide to find the {targetPage} page
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <div 
            key={step.step} 
            className={`border rounded-lg p-4 ${
              index === currentStep ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                index <= currentStep ? 'bg-blue-600' : 'bg-slate-400'
              }`}>
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-700 text-sm mb-3">{step.description}</p>
                {index === currentStep && (
                  <div className="flex gap-2">
                    {index > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentStep(index - 1)}
                      >
                        Previous
                      </Button>
                    )}
                    {index < steps.length - 1 && (
                      <Button 
                        size="sm"
                        onClick={() => setCurrentStep(index + 1)}
                      >
                        Next Step <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}
                    {index === steps.length - 1 && (
                      <Badge className="bg-green-100 text-green-800">
                        You're There! 🎉
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <step.icon className={`w-5 h-5 ${
                index <= currentStep ? 'text-blue-600' : 'text-slate-400'
              }`} />
            </div>
          </div>
        ))}
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h4 className="font-semibold text-yellow-900 mb-2">💡 Can't Find It?</h4>
          <p className="text-yellow-800 text-sm">
            Make sure you're logged in as an admin user. The "Platform Admin" section only appears for admin users. 
            If you still can't see it, try refreshing your browser page.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}