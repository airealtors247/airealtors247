import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  Copy,
  ExternalLink,
  Globe,
  Server,
  Shield,
  Zap,
  ArrowRight,
  Cloud
} from "lucide-react";

export default function AWSMarketingSiteGuide() {
  const [step, setStep] = useState(1);
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000);
  };

  const steps = [
    {
      title: "Create S3 Bucket",
      description: "Set up static website hosting on AWS S3",
      details: [
        "Log into AWS Console and go to S3",
        "Create a new bucket named 'www.airealtors247.io'",
        "Enable 'Static website hosting' in Properties",
        "Set index document to 'index.html'"
      ]
    },
    {
      title: "Request SSL Certificate",
      description: "Get free SSL certificate from AWS Certificate Manager",
      details: [
        "Go to AWS Certificate Manager (ACM)",
        "Request a public certificate",
        "Add domain names: airealtors247.io and www.airealtors247.io",
        "Choose DNS validation method"
      ]
    },
    {
      title: "Set Up CloudFront",
      description: "Configure CDN for fast global delivery",
      details: [
        "Go to CloudFront in AWS Console",
        "Create new distribution",
        "Set origin to your S3 bucket",
        "Attach SSL certificate from ACM"
      ]
    },
    {
      title: "Configure Namecheap DNS",
      description: "Point your domain to AWS infrastructure",
      details: [
        "Log into Namecheap dashboard",
        "Go to Advanced DNS for airealtors247.io",
        "Delete any existing A/CNAME records for @ and www",
        "Add new CNAME records pointing to CloudFront"
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">
          Deploy Marketing Site to airealtors247.io
        </h1>
        <p className="text-lg text-slate-600">
          Complete guide to launch your marketing website on AWS with your Namecheap domain
        </p>
      </div>

      <Alert className="border-blue-200 bg-blue-50">
        <Globe className="h-4 w-4" />
        <AlertDescription className="text-blue-800">
          <strong>Strategy:</strong> Your marketing site (airealtors247.io) will handle visitors and conversions, 
          while your main app (airealtors247.com) handles logged-in users. This separation improves performance, 
          security, and allows independent scaling.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6">
        {steps.map((stepInfo, index) => (
          <Card key={index} className={`${step === index + 1 ? 'border-blue-500 shadow-lg' : 'border-slate-200'}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  step > index + 1 ? 'bg-green-500' : step === index + 1 ? 'bg-blue-500' : 'bg-slate-300'
                }`}>
                  {step > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                Step {index + 1}: {stepInfo.title}
              </CardTitle>
              <p className="text-slate-600">{stepInfo.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {stepInfo.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              {index < steps.length - 1 && (
                <Button 
                  className="mt-4" 
                  onClick={() => setStep(index + 2)}
                  disabled={step !== index + 1}
                >
                  Mark Complete & Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {step === 4 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">DNS Records for Namecheap</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">CNAME Record 1:</h4>
              <div className="font-mono text-sm space-y-1">
                <p><strong>Type:</strong> CNAME</p>
                <p><strong>Host:</strong> www</p>
                <p><strong>Value:</strong> d123xyz.cloudfront.net (replace with your CloudFront domain)</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold mb-2">CNAME Record 2:</h4>
              <div className="font-mono text-sm space-y-1">
                <p><strong>Type:</strong> CNAME</p>
                <p><strong>Host:</strong> @</p>
                <p><strong>Value:</strong> www.airealtors247.io</p>
              </div>
            </div>
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                After DNS propagation (2-48 hours), your site will be live at both 
                https://airealtors247.io and https://www.airealtors247.io with full SSL encryption.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold">Lightning Fast</h3>
            <p className="text-sm text-slate-600">CloudFront CDN delivers your site globally in milliseconds</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold">Secure</h3>
            <p className="text-sm text-slate-600">Free SSL certificate with automatic renewal</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Server className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold">Scalable</h3>
            <p className="text-sm text-slate-600">Handles massive traffic spikes for pennies</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}