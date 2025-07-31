import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, ExternalLink, Copy, Globe, Shield, Zap } from 'lucide-react';

export default function Step2Guide() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Step 2: AWS CloudFront Setup</h1>
            <p className="text-slate-600">Global content delivery and HTTPS security</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Setup Progress</h3>
          <Badge className="bg-green-100 text-green-800">Phase 2 Complete</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm">S3 Bucket Created</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm">CloudFront Distribution</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
            <span className="text-sm">Domain Connection (Next)</span>
          </div>
        </div>
      </div>

      {/* Success Alert */}
      <Alert className="bg-green-50 border-green-200">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>🎉 FANTASTIC SUCCESS!</strong> Your CloudFront distribution has been created successfully. 
          The green "Successfully created new distribution" message confirms everything is working perfectly.
        </AlertDescription>
      </Alert>

      {/* What You've Accomplished */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            What You've Just Accomplished
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">✅ Professional Infrastructure</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Global content delivery network</li>
                <li>• Lightning-fast loading worldwide</li>
                <li>• Enterprise-grade reliability</li>
                <li>• Automatic scaling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">🔒 Security & Performance</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• HTTPS encryption ready</li>
                <li>• DDoS protection included</li>
                <li>• Cached content delivery</li>
                <li>• AWS security standards</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle>Your CloudFront Distribution Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Distribution Name:</label>
                <p className="text-slate-900 font-mono">airealtors247-cdn</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Status:</label>
                <Badge className="bg-yellow-100 text-yellow-800 ml-2">Deploying</Badge>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-slate-700">CloudFront URL:</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="bg-white px-3 py-1 rounded border text-sm">
                  d25xoo7e7gz4.cloudfront.net
                </code>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard('d25xoo7e7gz4.cloudfront.net')}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <Alert className="bg-blue-50 border-blue-200">
            <AlertDescription className="text-blue-800">
              <strong>⏱️ Deployment in Progress:</strong> Your distribution is currently deploying across AWS's global network. 
              This typically takes 5-15 minutes. The "Last modified: Deploying" status will change to "Enabled" when ready.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Phase 3: Domain Connection & SSL Certificate
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            While your CloudFront distribution deploys, we'll prepare for the final phase:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">1</div>
              <div>
                <h4 className="font-semibold">Upload Your Website Files</h4>
                <p className="text-sm text-slate-600">Add your AIRealtors247 website files to the S3 bucket</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">2</div>
              <div>
                <h4 className="font-semibold">Request SSL Certificate</h4>
                <p className="text-sm text-slate-600">Get a free SSL certificate from AWS Certificate Manager</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">3</div>
              <div>
                <h4 className="font-semibold">Connect Your Domain</h4>
                <p className="text-sm text-slate-600">Point airealtors247.com to your CloudFront distribution</p>
              </div>
            </div>
          </div>

          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              <strong>🚀 You're Almost There!</strong> You've completed the hardest technical parts. 
              The remaining steps are straightforward and you'll have your professional website live soon.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Technical Details (Collapsible) */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Configuration Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-slate-800">Origin Configuration:</h5>
                <ul className="text-slate-600 mt-1 space-y-1">
                  <li>• S3 Website Endpoint: ✅</li>
                  <li>• Origin Access Control: ✅</li>
                  <li>• Connection Attempts: 3</li>
                  <li>• Connection Timeout: 10s</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-slate-800">Security Settings:</h5>
                <ul className="text-slate-600 mt-1 space-y-1">
                  <li>• WAF Protection: Disabled (Cost Optimization)</li>
                  <li>• HTTPS Support: Ready</li>
                  <li>• Origin Shield: Disabled</li>
                  <li>• Security Protections: None</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={() => window.open('https://console.aws.amazon.com/cloudfront/v3/home', '_blank')}>
          <ExternalLink className="w-4 h-4 mr-2" />
          View in AWS Console
        </Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          Continue to Phase 3
        </Button>
      </div>
    </div>
  );
}