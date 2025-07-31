import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  MousePointerClick,
  ArrowRight,
  CheckCircle,
  Copy,
  Eye
} from "lucide-react";

export default function VisualSSLGuide() {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Request New Certificate for .io Domain",
      screenshot: "AWS Certificate Manager - Request Certificate",
      instructions: [
        "In AWS Certificate Manager, click the orange 'Request a certificate' button",
        "Select 'Request a public certificate'",
        "Click 'Next'"
      ]
    },
    {
      id: 2,
      title: "Add Domain Names",
      screenshot: "Certificate Manager - Domain Names",
      instructions: [
        "In the 'Domain name' field, type: airealtors247.io",
        "Click 'Add another name to this certificate'",
        "In the second field, type: *.airealtors247.io",
        "Click 'Next'"
      ]
    },
    {
      id: 3,
      title: "Choose Validation Method",
      screenshot: "Certificate Manager - DNS Validation",
      instructions: [
        "Select 'DNS validation' (should be pre-selected)",
        "Click 'Next'",
        "Click 'Review'",
        "Click 'Confirm and request'"
      ]
    },
    {
      id: 4,
      title: "Get DNS Validation Records",
      screenshot: "Certificate Manager - Validation Records",
      instructions: [
        "AWS will show you DNS validation records",
        "Click the dropdown arrow next to 'airealtors247.io'",
        "Copy the CNAME name and CNAME value",
        "You'll add these to your .io domain DNS settings"
      ]
    },
    {
      id: 5,
      title: "Add DNS Records to Your .io Domain",
      screenshot: "Domain Registrar - DNS Settings",
      instructions: [
        "Go to your .io domain registrar (where you bought airealtors247.io)",
        "Navigate to DNS settings",
        "Add a new CNAME record with the values from AWS",
        "Save the DNS changes"
      ]
    },
    {
      id: 6,
      title: "Wait for Validation (5-10 minutes)",
      screenshot: "Certificate Manager - Pending Validation",
      instructions: [
        "Return to AWS Certificate Manager",
        "Refresh the page every few minutes",
        "Status will change from 'Pending validation' to 'Issued'",
        "This usually takes 5-10 minutes"
      ]
    },
    {
      id: 7,
      title: "Update Load Balancer - Add Certificate",
      screenshot: "EC2 Load Balancers - Listeners",
      instructions: [
        "Go to EC2 → Load Balancers",
        "Select your load balancer",
        "Click the 'Listeners' tab",
        "Click 'Edit' on the HTTPS:443 listener"
      ]
    },
    {
      id: 8,
      title: "Attach Both Certificates",
      screenshot: "Load Balancer - SSL Certificates",
      instructions: [
        "In the 'Default SSL certificate' section",
        "Click 'Add certificates'",
        "Select BOTH certificates:",
        "- *.airealtors247.com (existing)",
        "- *.airealtors247.io (new)",
        "Click 'Save changes'"
      ]
    }
  ];

  const currentStepData = steps.find(s => s.id === currentStep);

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Shield className="w-7 h-7" />
            SSL Certificate Setup - Visual Guide
          </CardTitle>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-blue-100">Progress:</span>
            <div className="flex-1 bg-blue-800 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 8) * 100}%` }}
              />
            </div>
            <span className="text-yellow-400 font-bold">{currentStep}/8</span>
          </div>
        </CardHeader>
      </Card>

      {/* Current Step */}
      <Card className="border-blue-500 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {currentStep}
            </span>
            {currentStepData.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Screenshot Placeholder */}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-semibold">{currentStepData.screenshot}</p>
              <p className="text-sm text-gray-500">Look for this screen in AWS</p>
            </div>

            {/* Step Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <MousePointerClick className="w-4 h-4" />
                What to Click/Type:
              </h4>
              <ol className="list-decimal list-inside space-y-2">
                {currentStepData.instructions.map((instruction, index) => (
                  <li key={index} className="text-sm text-blue-800">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            {/* Special Cases */}
            {currentStep === 4 && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <Copy className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-800">
                  <strong>Important:</strong> Copy these exact values from AWS. You'll need them in the next step:
                  <br />• CNAME Name: _abc123def.airealtors247.io
                  <br />• CNAME Value: _xyz789.acm-validations.aws.
                </AlertDescription>
              </Alert>
            )}

            {currentStep === 6 && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <strong>Coffee Break!</strong> This is the only waiting step. DNS validation typically takes 5-10 minutes. You'll see the status change to "Issued" when ready.
                </AlertDescription>
              </Alert>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous Step
              </Button>
              
              <Button
                onClick={() => setCurrentStep(Math.min(8, currentStep + 1))}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={currentStep === 8}
              >
                {currentStep === 8 ? "Complete!" : "Next Step"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3">Open These AWS Pages Now:</h4>
          <div className="flex gap-2 flex-wrap">
            <a href="https://console.aws.amazon.com/acm/home?region=us-east-1" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                Open Certificate Manager
              </Button>
            </a>
            <a href="https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#LoadBalancers" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Open Load Balancers
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {/* All Steps Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Steps Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center gap-3 p-2 rounded cursor-pointer ${
                  step.id === currentStep ? 'bg-blue-100 border border-blue-300' : 
                  step.id < currentStep ? 'bg-green-50' : 'bg-gray-50'
                }`}
                onClick={() => setCurrentStep(step.id)}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step.id === currentStep ? 'bg-blue-600 text-white' :
                  step.id < currentStep ? 'bg-green-600 text-white' : 'bg-gray-300'
                }`}>
                  {step.id < currentStep ? '✓' : step.id}
                </span>
                <span className="text-sm">{step.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}