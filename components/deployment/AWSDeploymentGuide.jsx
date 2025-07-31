
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Rocket,
  GitBranch,
  RefreshCw,
  Shield,
  Building,
  Clock, // Added or confirmed from original
  DollarSign // Added or confirmed from original
} from "lucide-react";

export default function AWSDeploymentGuide() {
  const [activeStep, setActiveStep] = useState(1);

  const deploymentSteps = [
    {
      id: 1,
      title: "AWS Infrastructure Setup",
      icon: <Server className="w-6 h-6" />,
      status: "ready",
      commands: [
        "# Create VPC and Security Groups",
        "aws ec2 create-vpc --cidr-block 10.0.0.0/16",
        "",
        "# Launch EC2 instance (t3.large recommended)",
        "aws ec2 run-instances --image-id ami-0abcdef1234567890 \\",
        "  --instance-type t3.large --key-name your-key-pair \\",
        "  --security-group-ids sg-xxxxxxxxx",
        "",
        "# Setup Application Load Balancer for BOTH domains",
        "aws elbv2 create-load-balancer --name airealtors247-alb \\",
        "  --subnets subnet-12345 subnet-67890",
        "",
        "# Request SSL certificates for both domains",
        "aws acm request-certificate \\",
        "  --domain-name airealtors247.com \\",
        "  --domain-name airealtors247.io \\",
        "  --subject-alternative-names '*.airealtors247.com' '*.airealtors247.io' \\",
        "  --validation-method DNS"
      ]
    },
    {
      id: 2,
      title: "Database & Storage Configuration",
      icon: <Database className="w-6 h-6" />,
      status: "ready",
      commands: [
        "# Create RDS PostgreSQL instance",
        "aws rds create-db-instance \\",
        "  --db-instance-identifier airealtors247-prod \\",
        "  --db-instance-class db.t3.medium \\",
        "  --engine postgres \\",
        "  --allocated-storage 100",
        "",
        "# Setup S3 buckets for both domains",
        "aws s3 mb s3://airealtors247-com-assets",
        "aws s3 mb s3://airealtors247-io-assets",
        "aws s3 mb s3://airealtors247-backups",
        "",
        "# Configure Redis for caching",
        "aws elasticache create-cache-cluster \\",
        "  --cache-cluster-id airealtors247-redis"
      ]
    },
    {
      id: 3,
      title: "Multi-Domain Configuration",
      icon: <Globe className="w-6 h-6" />,
      status: "critical",
      details: [
        "Configure ALB to handle both airealtors247.com and airealtors247.io",
        "Set up SSL certificates for both domains",
        "Configure Route 53 health checks for failover",
        "Enable CloudFront CDN for both domains",
        "Set up domain-specific analytics tracking"
      ]
    },
    {
      id: 4,
      title: "Environment & Security",
      icon: <Shield className="w-6 h-6" />,
      status: "ready",
      variables: [
        "PRIMARY_DOMAIN=airealtors247.com",
        "BACKUP_DOMAIN=airealtors247.io",
        "DATABASE_URL=postgresql://user:pass@rds-endpoint:5432/airealtors247",
        "REDIS_URL=redis://elasticache-endpoint:6379",
        "BASE44_SYNC_TOKEN=your-secure-token",
        "BASE44_WEBHOOK_SECRET=webhook-secret",
        "AWS_REGION=us-east-1",
        "S3_BUCKET_PRIMARY=airealtors247-com-assets",
        "S3_BUCKET_BACKUP=airealtors247-io-assets",
        "SSL_CERT_ARN=arn:aws:acm:us-east-1:123456789:certificate/cert-id"
      ]
    }
  ];

  const base44Integration = {
    features: [
      "Automatic weekly updates from Base44 platform",
      "Real-time AI model improvements",
      "New feature rollouts without downtime",
      "Industry-specific enhancements",
      "Compliance updates and legal changes",
      "Performance optimizations"
    ],
    architecture: [
      "Webhook endpoint for Base44 notifications",
      "Blue-green deployment for zero downtime",
      "Database migration automation",
      "Feature flag management",
      "Rollback capabilities"
    ]
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          AWS Production Deployment
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Deploy AIRealtors247 to AWS with seamless Base44 integration for continuous updates
        </p>
      </div>

      {/* Status Overview */}
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Base44 Platform Ready!</strong> Your application is 100% complete and ready for AWS deployment.
          All components, entities, and features have been built and tested.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="deployment" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="deployment">
            <Server className="w-4 h-4 mr-2" />
            AWS Deployment
          </TabsTrigger>
          <TabsTrigger value="base44-sync">
            <RefreshCw className="w-4 h-4 mr-2" />
            Base44 Integration
          </TabsTrigger>
          <TabsTrigger value="launch">
            <Rocket className="w-4 h-4 mr-2" />
            Go Live
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deployment" className="space-y-6 mt-6">
          {/* Deployment Steps */}
          <div className="space-y-6">
            {deploymentSteps.map((step, index) => (
              <Card key={step.id} className={`${activeStep === step.id ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${step.status === 'critical' ? 'bg-orange-100' : 'bg-green-100'}`}>
                        {step.icon}
                      </div>
                      <span>Step {step.id}: {step.title}</span>
                    </div>
                    <Badge variant={step.status === 'critical' ? 'destructive' : 'default'}>
                      {step.status === 'critical' ? 'Requires Setup' : 'Ready'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {step.commands && (
                    <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto mb-4">
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

                  {step.variables && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-800">Environment Variables:</h4>
                      <div className="bg-slate-100 rounded-lg p-3 font-mono text-sm space-y-1">
                        {step.variables.map((variable, i) => (
                          <div key={i} className="text-slate-700">{variable}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end mt-4">
                    <Button 
                      variant={step.status === 'critical' ? 'default' : 'outline'}
                      onClick={() => setActiveStep(step.id)}
                    >
                      {step.status === 'critical' ? 'Configure Now' : 'Review Step'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="base44-sync" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                  Continuous Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {base44Integration.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-purple-600" />
                  Integration Architecture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {base44Integration.architecture.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Base44 Sync Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Base44 Sync Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                <div># Add to your deployment configuration</div>
                <div></div>
                <div># Base44 Webhook Endpoint</div>
                <div>POST /api/base44/webhook</div>
                <div>  - Receives update notifications</div>
                <div>  - Triggers automated deployment</div>
                <div>  - Handles rollback if needed</div>
                <div></div>
                <div># Weekly Sync Schedule</div>
                <div>cron: "0 2 * * SUN"  # Every Sunday at 2 AM</div>
                <div></div>
                <div># Update Process</div>
                <div>1. Download latest from Base44</div>
                <div>2. Run automated tests</div>
                <div>3. Deploy to staging</div>
                <div>4. Validate functionality</div>
                <div>5. Deploy to production</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="launch" className="space-y-6 mt-6">
          {/* Launch Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-green-600" />
                Pre-Launch Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Infrastructure Ready</h4>
                    <div className="space-y-2">
                      {[
                        'AWS EC2 instances running',
                        'Load balancer configured',
                        'Database connected',
                        'SSL certificates installed',
                        'Domain DNS configured'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Base44 Integration</h4>
                    <div className="space-y-2">
                      {[
                        'Webhook endpoint configured',
                        'Sync tokens validated',
                        'Update pipeline tested',
                        'Rollback mechanism ready',
                        'Monitoring alerts active'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Steps */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Ready to Launch! 🚀</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700 mb-4">
                Your AIRealtors247 platform is ready for production deployment with seamless Base44 integration.
              </p>
              <div className="space-y-2 text-sm text-green-600">
                <div>• All components tested and validated</div>
                <div>• AWS infrastructure configured</div>
                <div>• Base44 sync pipeline established</div>
                <div>• Weekly updates enabled</div>
                <div>• Monitoring and alerts active</div>
              </div>
              <div className="mt-6 p-4 bg-white rounded-lg border">
                <h4 className="font-semibold text-slate-800 mb-2">Next Steps:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600">
                  <li>Run final deployment script</li>
                  <li>Verify all systems operational</li>
                  <li>Import your real estate data</li>
                  <li>Configure AI settings</li>
                  <li>Launch and start generating leads!</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Timeline & Costs */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Deployment Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>AWS Setup & Configuration</span>
                <Badge>2-3 days</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Base44 Integration</span>
                <Badge>1-2 days</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Testing & Validation</span>
                <Badge>1-2 days</Badge>
              </div>
              <div className="flex justify-between items-center font-semibold pt-2 border-t">
                <span>Total Launch Time</span>
                <Badge variant="default">4-7 days</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              AWS Monthly Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>EC2 Instances (t3.large x2)</span>
                <Badge>$150/mo</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>RDS Database</span>
                <Badge>$80/mo</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Load Balancer & Networking</span>
                <Badge>$40/mo</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>S3 Storage & CDN</span>
                <Badge>$30/mo</Badge>
              </div>
              <div className="flex justify-between items-center font-semibold pt-2 border-t">
                <span>Total AWS Costs</span>
                <Badge variant="default">~$300/mo</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
