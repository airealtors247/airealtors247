import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, ExternalLink, Copy, Server, Database, Globe } from 'lucide-react';

export default function EC2DeploymentGuide() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
            <Server className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Step 3: Server &amp; Domain Setup</h1>
            <p className="text-slate-600">Bringing your application online with a custom domain</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white rounded-xl p-6 border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Deployment Progress</h3>
          <Badge className="bg-green-100 text-green-800">Phase 3 Complete</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm">S3 Bucket &amp; CloudFront</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm">Website Live on AWS</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm">Domain &amp; SSL (Next)</span>
          </div>
        </div>
      </div>
      
      {/* SUCCESS BANNER */}
      <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-2xl overflow-hidden">
        <CardContent className="p-8 text-center relative">
           <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.1] z-0"></div>
           <div className="relative z-10">
              <h2 className="text-4xl font-extrabold mb-4">🎉 IT'S LIVE! 🎉</h2>
              <p className="text-xl max-w-2xl mx-auto mb-6">
                Congratulations! You have successfully deployed a professional, scalable web infrastructure on AWS. 
                Your test page is now live and being served globally. This is a massive achievement!
              </p>
              <div className="flex justify-center">
                <a href="http://airealtors247.com.s3-website.us-east-2.amazonaws.com" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="secondary" className="text-blue-700 font-bold hover:bg-white/90 transition-transform hover:scale-105">
                    View Your Live Site <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
        </CardContent>
      </Card>

      {/* What We've Accomplished */}
      <Card>
        <CardHeader>
          <CardTitle>Milestone Reached: Professional AWS Infrastructure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-2">✅ Core Components Live</h4>
              <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                <li>S3 Bucket for file storage</li>
                <li>CloudFront for global delivery (CDN)</li>
                <li>Public access and permissions configured</li>
                <li>Test page successfully deployed</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-2">Ready for Final Steps</h4>
              <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
                <li>Request a free SSL Certificate</li>
                <li>Connect your custom domain name</li>
                <li>Point `airealtors247.com` to CloudFront</li>
                <li>Go fully live!</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="text-center py-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Final Step: Connect Your Domain</h2>
        <p className="text-slate-600 mb-6">Let's secure your site with HTTPS and point `airealtors247.com` to your new AWS infrastructure.</p>
        <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white animate-pulse" onClick={() => alert("Let's connect the domain!")}>
          Let's Go! Connect My Domain & Get SSL
        </Button>
      </div>

    </div>
  );
}