
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Database, 
  Globe, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Cloud,
  Zap,
  Lock,
  Rocket,
  ExternalLink,
  Copy
} from "lucide-react";

export default function AWSHostingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const markStepComplete = (step) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
    setCurrentStep(step + 1);
  };

  const isStepComplete = (step) => completedSteps.includes(step);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-4">
            Host AIRealtors247 on AWS (Free Tier)
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Deploy your real estate AI platform on Amazon Web Services using the free tier - perfect for starting your business!
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge className="bg-green-100 text-green-800">FREE for 12 months</Badge>
            <Badge className="bg-blue-100 text-blue-800">Professional Hosting</Badge>
            <Badge className="bg-purple-100 text-purple-800">Easy Setup</Badge>
          </div>
        </div>

        {/* Architecture Overview */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Cloud className="w-7 h-7" />
              AWS Architecture Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Server className="w-8 h-8" />
                </div>
                <h3 className="font-bold mb-2">EC2 Instance</h3>
                <p className="text-slate-300 text-sm">t2.micro server in us-east-1 running your application</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Database className="w-8 h-8" />
                </div>
                <h3 className="font-bold mb-2">RDS Database</h3>
                <p className="text-slate-300 text-sm">PostgreSQL database with automated backups</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="font-bold mb-2">CloudFront CDN</h3>
                <p className="text-slate-300 text-sm">Global content delivery with SSL certificate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Free Tier Benefits Banner */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Shield className="w-7 h-7" />
              AWS Free Tier Benefits (12 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Server className="w-8 h-8" />
                </div>
                <h3 className="font-bold mb-2">EC2 t2.micro</h3>
                <p className="text-green-100 text-sm">750 hours/month FREE<br/>(Enough to run 24/7)</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Database className="w-8 h-8" />
                </div>
                <h3 className="font-bold mb-2">RDS db.t2.micro</h3>
                <p className="text-green-100 text-sm">750 hours/month FREE<br/>+ 20GB storage</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="font-bold mb-2">Data Transfer</h3>
                <p className="text-green-100 text-sm">15GB/month FREE<br/>CloudFront included</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Create EC2 Instance */}
        <Card className={`shadow-lg transition-all duration-300 ${
          currentStep === 1 ? 'ring-2 ring-orange-500 bg-orange-50' : 
          isStepComplete(1) ? 'bg-green-50 border-green-300' : 'bg-white'
        }`}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              {isStepComplete(1) ? (
                <CheckCircle className="w-7 h-7 text-green-600" />
              ) : (
                <div className="w-7 h-7 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              )}
              Create EC2 Instance (FREE)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-100 border border-green-300 p-4 rounded-lg">
              <h4 className="font-bold mb-2 text-green-800">✅ Free Tier Configuration:</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• <strong>AMI:</strong> Ubuntu Server 22.04 LTS (Free tier eligible)</li>
                <li>• <strong>Instance Type:</strong> t2.micro (1 vCPU, 1 GB RAM) - FREE</li>
                <li>• <strong>Region:</strong> us-east-1 (N. Virginia)</li>
                <li>• <strong>Storage:</strong> 30 GB gp2 SSD (Free tier includes 30GB)</li>
                <li>• <strong>Security Group:</strong> Allow HTTP (80), HTTPS (443), SSH (22)</li>
                <li>• <strong>Usage:</strong> 750 hours/month (24/7 operation)</li>
              </ul>
            </div>
            
            <Alert className="bg-green-50 border-green-200">
              <Shield className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Cost:</strong> $0/month for first 12 months with AWS Free Tier! After 12 months: ~$8.50/month
              </AlertDescription>
            </Alert>

            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
              <p className="text-sm text-yellow-800">
                <strong>💡 Pro Tip:</strong> t2.micro has 1GB RAM. This is perfect for starting your business. Once you get clients, you can easily upgrade to t3.small or t3.medium without downtime!
              </p>
            </div>

            <div className="flex gap-3">
              <Button asChild>
                <a href="https://console.aws.amazon.com/ec2/home?region=us-east-1#LaunchInstances:" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Launch FREE EC2 Instance
                </a>
              </Button>
              <Button variant="outline" onClick={() => markStepComplete(1)}>
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 2: Setup RDS Database */}
        <Card className={`shadow-lg transition-all duration-300 ${
          currentStep === 2 ? 'ring-2 ring-blue-500 bg-blue-50' : 
          isStepComplete(2) ? 'bg-green-50 border-green-300' : 'bg-white'
        }`}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              {isStepComplete(2) ? (
                <CheckCircle className="w-7 h-7 text-green-600" />
              ) : (
                <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              )}
              Create RDS Database (FREE)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-100 border border-green-300 p-4 rounded-lg">
              <h4 className="font-bold mb-2 text-green-800">✅ Free Tier Database:</h4>
              <ul className="space-y-1 text-sm text-green-700">
                <li>• <strong>Engine:</strong> PostgreSQL 15 (Free tier eligible)</li>
                <li>• <strong>Instance Class:</strong> db.t2.micro - FREE</li>
                <li>• <strong>Storage:</strong> 20 GB gp2 SSD (Free tier includes 20GB)</li>
                <li>• <strong>Multi-AZ:</strong> No (saves costs)</li>
                <li>• <strong>Backup Retention:</strong> 7 days (included free)</li>
                <li>• <strong>Usage:</strong> 750 hours/month (24/7 operation)</li>
              </ul>
            </div>

            <Alert className="bg-green-50 border-green-200">
              <Database className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Cost:</strong> $0/month for first 12 months! After 12 months: ~$13/month
              </AlertDescription>
            </Alert>

            <div className="flex gap-3">
              <Button asChild>
                <a href="https://console.aws.amazon.com/rds/home?region=us-east-1#launch-dbinstance:" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Create FREE RDS Database
                </a>
              </Button>
              <Button variant="outline" onClick={() => markStepComplete(2)}>
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Install Application */}
        <Card className={`shadow-lg transition-all duration-300 ${
          currentStep === 3 ? 'ring-2 ring-purple-500 bg-purple-50' : 
          isStepComplete(3) ? 'bg-green-50 border-green-300' : 'bg-white'
        }`}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              {isStepComplete(3) ? (
                <CheckCircle className="w-7 h-7 text-green-600" />
              ) : (
                <div className="w-7 h-7 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              )}
              Install & Configure Application
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="space-y-2">
                <div># SSH into your FREE EC2 instance</div>
                <div>ssh -i your-key.pem ubuntu@your-ec2-ip</div>
                <div className="mt-4"># Update system</div>
                <div>sudo apt update && sudo apt upgrade -y</div>
                <div className="mt-4"># Install Node.js 18</div>
                <div>curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -</div>
                <div>sudo apt-get install -y nodejs</div>
                <div className="mt-4"># Install PM2 for process management</div>
                <div>sudo npm install -g pm2</div>
                <div className="mt-4"># Install Nginx</div>
                <div>sudo apt install nginx -y</div>
                <div className="mt-4"># Clone your application</div>
                <div>git clone https://github.com/your-repo/airealtors247.git</div>
                <div>cd airealtors247</div>
                <div>npm install --production</div>
                <div className="mt-4"># Optimize for t2.micro (1GB RAM)</div>
                <div>export NODE_OPTIONS="--max-old-space-size=768"</div>
                <div className="mt-4"># Start with PM2</div>
                <div>pm2 start ecosystem.config.js</div>
                <div>pm2 startup</div>
                <div>pm2 save</div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded">
              <p className="text-sm text-blue-800">
                <strong>💡 Memory Optimization:</strong> t2.micro has 1GB RAM, so we've optimized the Node.js settings above. This is perfect for starting out!
              </p>
            </div>

            <Button variant="outline" onClick={() => markStepComplete(3)}>
              Mark Complete
            </Button>
          </CardContent>
        </Card>

        {/* Step 4: Configure Domain & SSL */}
        <Card className={`shadow-lg transition-all duration-300 ${
          currentStep === 4 ? 'ring-2 ring-green-500 bg-green-50' : 
          isStepComplete(4) ? 'bg-green-50 border-green-300' : 'bg-white'
        }`}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              {isStepComplete(4) ? (
                <CheckCircle className="w-7 h-7 text-green-600" />
              ) : (
                <div className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              )}
              Setup Domain & SSL Certificate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">1. Request SSL Certificate in ACM:</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Go to AWS Certificate Manager (us-east-1)</li>
                  <li>• Request public certificate for: airealtors247.io, *.airealtors247.io</li>
                  <li>• Choose DNS validation</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-2">2. Update DNS Records:</h4>
                <div className="bg-slate-100 p-3 rounded text-sm">
                  <div><strong>A Record:</strong> @ → Your EC2 IP</div>
                  <div><strong>A Record:</strong> www → Your EC2 IP</div>
                  <div><strong>CNAME Records:</strong> Add validation records from ACM</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-2">3. Configure Nginx:</h4>
                <div className="bg-slate-900 text-green-400 p-3 rounded font-mono text-xs">
                  <div># Install Certbot</div>
                  <div>sudo apt install certbot python3-certbot-nginx -y</div>
                  <div className="mt-2"># Get SSL certificate</div>
                  <div>sudo certbot --nginx -d airealtors247.io -d www.airealtors247.io</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button asChild>
                <a href="https://console.aws.amazon.com/acm/home?region=us-east-1#/certificates/request" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Request SSL Certificate
                </a>
              </Button>
              <Button variant="outline" onClick={() => markStepComplete(4)}>
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 5: Setup CloudFront CDN */}
        <Card className={`shadow-lg transition-all duration-300 ${
          currentStep === 5 ? 'ring-2 ring-indigo-500 bg-indigo-50' : 
          isStepComplete(5) ? 'bg-green-50 border-green-300' : 'bg-white'
        }`}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              {isStepComplete(5) ? (
                <CheckCircle className="w-7 h-7 text-green-600" />
              ) : (
                <div className="w-7 h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
              )}
              Setup CloudFront CDN (Optional)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-slate-100 p-4 rounded-lg">
              <h4 className="font-bold mb-2">CloudFront Configuration:</h4>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Origin:</strong> Your EC2 instance IP/domain</li>
                <li>• <strong>SSL Certificate:</strong> Use the ACM certificate</li>
                <li>• <strong>Cache Behavior:</strong> Optimize for web application</li>
                <li>• <strong>Compression:</strong> Enable Gzip compression</li>
                <li>• <strong>Security Headers:</strong> Add security headers</li>
              </ul>
            </div>

            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription>
                CloudFront provides global CDN, improved performance, and DDoS protection. Estimated cost: ~$5-15/month based on traffic. (Free tier includes 15GB of data transfer)
              </AlertDescription>
            </Alert>

            <div className="flex gap-3">
              <Button asChild>
                <a href="https://console.aws.amazon.com/cloudfront/home#/distributions/create" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Create CloudFront Distribution
                </a>
              </Button>
              <Button variant="outline" onClick={() => markStepComplete(5)}>
                Mark Complete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Updated Cost Summary */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardHeader>
            <CardTitle className="2xl flex items-center gap-3">
              <Shield className="w-7 h-7" />
              Cost Breakdown - Start for FREE!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-3">First 12 Months (FREE):</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>EC2 t2.micro (750h/month)</span>
                    <span className="text-green-200 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RDS db.t2.micro (750h/month)</span>
                    <span className="text-green-200 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EBS Storage (30GB)</span>
                    <span className="text-green-200 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Transfer (15GB/month)</span>
                    <span className="text-green-200 font-bold">FREE</span>
                  </div>
                  <div className="border-t border-white/20 pt-2 flex justify-between font-bold text-lg">
                    <span>Total Cost</span>
                    <span className="text-green-200">$0/month</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-3">After 12 Months:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>EC2 t2.micro</span>
                    <span>$8.50/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RDS db.t2.micro</span>
                    <span>$13/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Storage & extras</span>
                    <span>$3/month</span>
                  </div>
                  <div className="border-t border-white/20 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>$24.50/month</span>
                  </div>
                </div>
                <p className="text-xs text-green-200 mt-2">
                  Perfect for growing businesses! Upgrade anytime as you scale.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Launch Button */}
        {completedSteps.length >= 4 && (
          <div className="text-center mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">🚀 Ready to Launch! 🚀</h2>
            <p className="text-slate-600 mb-6 text-lg">
              Your AIRealtors247 platform is now hosted on AWS and ready for production traffic!
            </p>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-xl px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Rocket className="w-8 h-8 mr-4" />
              View Live Site
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}
