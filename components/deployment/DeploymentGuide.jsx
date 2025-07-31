
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Server,
  Database,
  Cloud,
  Key,
  CheckCircle,
  AlertTriangle,
  Code,
  Globe,
  Zap,
  Smartphone,
  Building,
  Rocket
} from "lucide-react";

export default function DeploymentGuide() {
  const deploymentSteps = [
    {
      title: "Infrastructure Setup (AWS)",
      icon: <Server className="w-5 h-5" />,
      status: "pending",
      commands: [
        "# Create EC2 instance",
        "aws ec2 run-instances --image-id ami-0abcdef1234567890 --instance-type t3.medium",
        "",
        "# Setup RDS PostgreSQL",
        "aws rds create-db-instance --db-instance-identifier airealtors247-db",
        "",
        "# Configure S3 bucket",
        "aws s3 mb s3://airealtors247-assets"
      ]
    },
    {
      title: "Database Configuration",
      icon: <Database className="w-5 h-5" />,
      status: "pending",
      details: [
        "PostgreSQL 15+ required",
        "Redis for session management",
        "All entity schemas from Base44",
        "Migration scripts needed"
      ]
    },
    {
      title: "API Integration Setup",
      icon: <Key className="w-5 h-5" />,
      status: "pending",
      integrations: [
        "Stripe Payment Processing",
        "Facebook & Instagram APIs",
        "LinkedIn Developer Portal",
        "Twitter/X API v2",
        "GoHighLevel CRM",
        "HubSpot CRM",
        "OpenAI GPT-4",
        "Google Maps & Places"
      ]
    },
    {
      title: "Environment Configuration",
      icon: <Code className="w-5 h-5" />,
      status: "pending",
      variables: [
        "DATABASE_URL",
        "STRIPE_SECRET_KEY",
        "OPENAI_API_KEY",
        "GOOGLE_MAPS_API_KEY",
        "All social media API keys",
        "CRM integration credentials"
      ]
    }
  ];

  const requirements = {
    frontend: [
      "React 18+ with Next.js 14",
      "Tailwind CSS for styling",
      "Lucide React for icons",
      "Recharts for analytics",
      "Google Maps integration"
    ],
    backend: [
      "Node.js 18+",
      "Express.js or Next.js API",
      "PostgreSQL 15+",
      "Redis for caching",
      "JWT authentication"
    ],
    infrastructure: [
      "AWS EC2 or Vercel",
      "AWS RDS PostgreSQL",
      "AWS S3 for file storage",
      "CloudFront CDN",
      "SSL/TLS certificates"
    ]
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          Production Deployment Guide
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Complete guide to deploy AIRealtors247 from Base44 prototype to production-ready platform
        </p>
      </div>

      {/* Status Overview */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Base44 Build Complete!</strong> Frontend application is 100% ready.
          Production deployment requires external infrastructure setup and API integrations.
        </AlertDescription>
      </Alert>

      {/* Technical Requirements */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Frontend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {requirements.frontend.map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-purple-600" />
              Backend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {requirements.backend.map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="w-5 h-5 text-green-600" />
              Infrastructure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {requirements.infrastructure.map((req, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  {req}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Deployment Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Deployment Steps</h2>

        {deploymentSteps.map((step, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {step.icon}
                  {step.title}
                </div>
                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                  Pending
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {step.commands && (
                <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                  {step.commands.map((cmd, i) => (
                    <div key={i}>{cmd}</div>
                  ))}
                </div>
              )}

              {step.details && (
                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

              {step.integrations && (
                <div className="grid md:grid-cols-2 gap-3">
                  {step.integrations.map((integration, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                      <Key className="w-4 h-4 text-slate-400" />
                      <span className="text-sm">{integration}</span>
                    </div>
                  ))}
                </div>
              )}

              {step.variables && (
                <div className="grid md:grid-cols-2 gap-2">
                  {step.variables.map((variable, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg font-mono text-sm">
                      <Code className="w-4 h-4 text-slate-400" />
                      {variable}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cost & Timeline */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-600" />
              Estimated Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>AWS Infrastructure Setup</span>
                <Badge>3-5 days</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>API Integrations</span>
                <Badge>5-7 days</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Testing & Optimization</span>
                <Badge>3-5 days</Badge>
              </div>
              <div className="flex justify-between items-center font-semibold pt-2 border-t">
                <span>Total Timeline</span>
                <Badge variant="default">2-4 weeks</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Estimated Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Development Setup</span>
                <Badge>$2,000-$5,000</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>AWS Infrastructure</span>
                <Badge>$200-$500/month</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>API Integration Costs</span>
                <Badge>$100-$300/month</Badge>
              </div>
              <div className="flex justify-between items-center font-semibold pt-2 border-t">
                <span>Initial Investment</span>
                <Badge variant="default">$2,000-$10,000</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-semibold">Export Base44 Project</h4>
                <p className="text-sm text-slate-600">Download complete codebase from Base44 platform</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-semibold">Hire Development Team</h4>
                <p className="text-sm text-slate-600">Find experienced developers for AWS deployment and API integrations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-semibold">Setup Integrations</h4>
                <p className="text-sm text-slate-600">Configure Stripe, social media APIs, CRM connections</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <h4 className="font-semibold">Launch & Submit to App Stores</h4>
                <p className="text-sm text-slate-600">Deploy on AWS, conduct thorough testing, and submit to global app stores.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Global App Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-green-600" />
            Global App Distribution Checklist
          </CardTitle>
          <p className="text-slate-600 text-sm">A guide to submitting the mobile and web apps for maximum global reach.</p>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
              <h4 className="font-bold text-lg mb-2">Primary App Stores</h4>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-50 border">
                  <h5 className="font-semibold flex items-center gap-2"><Smartphone className="w-4 h-4 text-blue-500" />Apple App Store</h5>
                  <p className="text-sm text-slate-600">Covers 175 countries, essential for North America & Europe. Requires Apple Developer Program enrollment ($99/year).</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border">
                  <h5 className="font-semibold flex items-center gap-2"><Smartphone className="w-4 h-4 text-green-500" />Google Play Store</h5>
                  <p className="text-sm text-slate-600">Largest install base, covers 190+ countries. Requires a Google Play Developer account ($25 one-time fee).</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-2">Alternative & Niche Stores</h4>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-50 border">
                  <h5 className="font-semibold">Amazon Appstore & Samsung Galaxy Store</h5>
                  <p className="text-sm text-slate-600">Access to Amazon Fire, Windows 11, and all Samsung devices. Good for expanding reach beyond the two main stores.</p>
                </div>
                 <div className="p-4 rounded-lg bg-slate-50 border">
                  <h5 className="font-semibold">Huawei AppGallery & Aptoide</h5>
                  <p className="text-sm text-slate-600">Important for reaching markets in China, LATAM, and Eastern Europe where Google Play may be less dominant.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-2">Special Markets (China)</h4>
              <div className="p-4 rounded-lg bg-yellow-50 border-yellow-200">
                  <h5 className="font-semibold flex items-center gap-2"><Building className="w-4 h-4 text-red-500" />Tencent, Baidu, Xiaomi Stores</h5>
                  <p className="text-sm text-yellow-800">Requires a local Chinese business entity or a partner for submission. Essential for accessing the mainland China market.</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-2">Web-Based Platforms</h4>
              <div className="p-4 rounded-lg bg-slate-50 border">
                  <h5 className="font-semibold flex items-center gap-2"><Globe className="w-4 h-4" />Chrome Web Store & Microsoft Store</h5>
                  <p className="text-sm text-slate-600">For distributing Progressive Web Apps (PWAs) or companion browser extensions, targeting desktop and enterprise users.</p>
              </div>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
