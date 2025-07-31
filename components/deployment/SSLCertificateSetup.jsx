import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Lock,
  CheckCircle,
  Copy,
  ExternalLink,
  Globe,
  ArrowRight
} from "lucide-react";

export default function SSLCertificateSetup() {
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: "Request SSL Certificate for airealtors247.io",
      description: "Add the .io domain to AWS Certificate Manager"
    },
    {
      title: "Validate Domain Ownership",
      description: "Verify you own both domains"
    },
    {
      title: "Update Load Balancer",
      description: "Attach certificates to your ALB"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <Shield className="w-7 h-7" />
            SSL Certificate Setup - Step {step} of 3
          </CardTitle>
          <p className="text-blue-100">
            Securing both airealtors247.com and airealtors247.io with HTTPS
          </p>
        </CardHeader>
      </Card>

      {/* Step 1: Request Certificate for .io */}
      <Card className={step === 1 ? "border-blue-500 shadow-lg" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              1
            </span>
            Request SSL Certificate for airealtors247.io
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <Lock className="h-4 w-4 text-blue-600" />
              <AlertDescription>
                You already have certificates for airealtors247.com. Now we need to add airealtors247.io.
              </AlertDescription>
            </Alert>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">In AWS Certificate Manager:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Click <strong>"Request a certificate"</strong></li>
                <li>Select <strong>"Request a public certificate"</strong></li>
                <li>Add these domain names:</li>
              </ol>
              <div className="bg-white border rounded p-3 mt-2 font-mono text-sm">
                <div>airealtors247.io</div>
                <div>*.airealtors247.io</div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                The wildcard (*) covers www.airealtors247.io automatically
              </p>
            </div>

            <Button 
              onClick={() => setStep(2)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              I've Requested the .io Certificate <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Domain Validation */}
      <Card className={step === 2 ? "border-green-500 shadow-lg" : step > 2 ? "border-green-200" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              2
            </span>
            Validate Domain Ownership
          </CardTitle>
        </CardHeader>
        {step >= 2 && (
          <CardContent>
            <div className="space-y-4">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  AWS will show you DNS validation records. Add these to your domain registrar.
                </AlertDescription>
              </Alert>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-700">airealtors247.com</h4>
                  <Badge variant="outline" className="text-green-700">Already Validated ✓</Badge>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold mb-2 text-yellow-700">airealtors247.io</h4>
                  <p className="text-sm mb-2">Add this CNAME record to your .io domain DNS:</p>
                  <div className="bg-white border rounded p-2 font-mono text-xs break-all">
                    _validation_key.airealtors247.io → _validation_value.acm-validations.aws.
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    AWS will show you the exact values in Certificate Manager
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => setStep(3)}
                className="bg-green-600 hover:bg-green-700"
              >
                DNS Records Added - Certificates Validated <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Step 3: Update Load Balancer */}
      <Card className={step === 3 ? "border-purple-500 shadow-lg" : ""}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
              step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              3
            </span>
            Update Application Load Balancer
          </CardTitle>
        </CardHeader>
        {step >= 3 && (
          <CardContent>
            <div className="space-y-4">
              <Alert className="bg-purple-50 border-purple-200">
                <Globe className="h-4 w-4 text-purple-600" />
                <AlertDescription>
                  Now attach both SSL certificates to your Application Load Balancer
                </AlertDescription>
              </Alert>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">In EC2 → Load Balancers:</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Select your Application Load Balancer</li>
                  <li>Go to <strong>"Listeners"</strong> tab</li>
                  <li>Edit the HTTPS:443 listener</li>
                  <li>Under "Default SSL certificate" → Add certificate</li>
                  <li>Select <strong>both certificates</strong>:</li>
                </ol>
                <div className="bg-white border rounded p-3 mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-mono text-sm">*.airealtors247.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-mono text-sm">*.airealtors247.io</span>
                  </div>
                </div>
              </div>

              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription>
                  <strong>Success!</strong> Both domains will now be secured with HTTPS:
                  <br />• https://airealtors247.com
                  <br />• https://airealtors247.io
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Quick Links */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-semibold mb-3">Quick Links to AWS Services:</h4>
          <div className="flex gap-2 flex-wrap">
            <a href="https://console.aws.amazon.com/acm/home" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                Certificate Manager <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </a>
            <a href="https://console.aws.amazon.com/ec2/v2/home#LoadBalancers" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                Load Balancers <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}