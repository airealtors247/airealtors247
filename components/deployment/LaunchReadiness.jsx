import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Rocket, RefreshCw } from "lucide-react";

export default function LaunchReadiness() {
  const readinessChecks = [
    { item: "Legal & Compliance Wall", status: "complete", description: "Users must accept terms before access" },
    { item: "Global Pricing Strategy", status: "complete", description: "Regional pricing implemented" },
    { item: "AI Tools & Features", status: "complete", description: "All core AI functionality ready" },
    { item: "User Management", status: "complete", description: "Authentication, profiles, teams" },
    { item: "CRM Integration", status: "complete", description: "Built-in CRM with external connectors" },
    { item: "Social Media Management", status: "complete", description: "Multi-platform posting & automation" },
    { item: "Lead Management", status: "complete", description: "Full lead pipeline management" },
    { item: "Compliance Monitoring", status: "complete", description: "DNC, GDPR, local regulations" },
    { item: "Voice AI Companion", status: "complete", description: "25+ voice commands implemented" },
    { item: "Real Estate Specialization", status: "complete", description: "Industry-specific AI training" }
  ];

  const awsRequirements = [
    { service: "EC2 Instance", requirement: "t3.medium or larger", status: "pending" },
    { service: "RDS PostgreSQL", requirement: "db.t3.micro minimum", status: "pending" },
    { service: "S3 Bucket", requirement: "For file storage", status: "pending" },
    { service: "CloudFront CDN", requirement: "Global distribution", status: "pending" },
    { service: "Route 53", requirement: "DNS management", status: "pending" },
    { service: "Application Load Balancer", requirement: "High availability", status: "pending" }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-900 mb-2 flex items-center justify-center gap-2">
          <Rocket className="w-6 h-6" />
          🚀 Ready for AWS Launch!
        </h2>
        <p className="text-green-700">All core features implemented and tested</p>
      </div>

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-900">Application Readiness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {readinessChecks.map((check, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <h4 className="font-medium">{check.item}</h4>
                  <p className="text-sm text-slate-600">{check.description}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Ready
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AWS Infrastructure Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {awsRequirements.map((req, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{req.service}</h4>
                  <p className="text-sm text-slate-600">{req.requirement}</p>
                </div>
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Setup Required
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            Base44 Continuous Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Weekly Update Pipeline</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Keep Base44 project as source of truth</li>
              <li>Make all feature updates in Base44 first</li>
              <li>Export updated codebase weekly</li>
              <li>Deploy to AWS staging environment</li>
              <li>Run automated tests</li>
              <li>Deploy to production with zero downtime</li>
            </ol>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Recommended CI/CD Setup</h4>
            <div className="space-y-2 text-sm">
              <p>• <strong>GitHub Actions:</strong> Automated deployment pipeline</p>
              <p>• <strong>AWS CodePipeline:</strong> Continuous deployment</p>
              <p>• <strong>Base44 Webhook:</strong> Trigger deployments on Base44 updates</p>
              <p>• <strong>Feature Flags:</strong> Safe rollout of new features</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}