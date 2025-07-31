
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Rocket, ExternalLink, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

import LaunchSuccess from "../components/deployment/LaunchSuccess";
import ServerDeployment from "../components/deployment/ServerDeployment";

export default function DeploymentPage() {
  const [isLaunched, setIsLaunched] = useState(true); // Set to true since deployment is complete
  const [showServerDeployment, setShowServerDeployment] = useState(false);
  
  if (isLaunched) {
    return <LaunchSuccess />;
  }

  if (showServerDeployment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Deploy Your Application
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get your AIRealtors247 platform running on your AWS t2.micro server.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setShowServerDeployment(false)}
              className="mt-4"
            >
              ← Back to Overview
            </Button>
          </div>
          <ServerDeployment />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Deploy to Production
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Follow these steps to launch your AIRealtors247 platform and go live.
          </p>
        </div>
        
        <Card className="shadow-lg border-green-300 bg-green-50">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 text-green-800">
                <CheckCircle className="w-7 h-7" />
                Step 1: SSL Certificate Requested ✅
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-green-700">
                Success! SSL certificate has been requested from AWS Certificate Manager for your domains.
                </p>
            </CardContent>
        </Card>

        <Card className="shadow-lg border-green-300 bg-green-50">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 text-green-800">
                <CheckCircle className="w-7 h-7" />
                Step 2: DNS Records Added ✅
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-green-700">
                Excellent! You have successfully added all required DNS records in Namecheap:
                </p>
                <ul className="mt-3 space-y-1 text-green-700">
                  <li>✅ A Record (@) → 67.202.50.80</li>
                  <li>✅ A Record (www) → 67.202.50.80</li>
                  <li>✅ CNAME Records for SSL validation</li>
                </ul>
            </CardContent>
        </Card>

        <Card className="shadow-lg border-blue-200 bg-blue-50">
            <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-3 text-blue-800">
                <Rocket className="w-7 h-7" />
                Step 3: Deploy & Go Live! 🚀
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-blue-700">
                    Your DNS records are configured and SSL certificate is ready. Now let's get your application running on the server!
                    </p>
                    <Alert className="bg-blue-100 border-blue-300">
                        <CheckCircle className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                            <strong>Ready to Deploy!</strong> Your t2.micro server is ready. Follow our step-by-step guide to get your application live.
                        </AlertDescription>
                    </Alert>
                    <div className="text-center">
                      <Button 
                        size="lg" 
                        onClick={() => setShowServerDeployment(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4"
                      >
                        <Rocket className="w-6 h-6 mr-3" />
                        Deploy Application Now
                      </Button>
                    </div>
                </div>
            </CardContent>
        </Card>

        <div className="text-center mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">🎉 Almost There! 🎉</h2>
            <p className="text-slate-600 mb-6 text-lg">Your infrastructure is ready. Just deploy your application and you'll be live!</p>
            
            <div className="space-y-4">
                <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl px-12 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" 
                    onClick={() => setIsLaunched(true)}
                >
                    <Rocket className="w-8 h-8 mr-4 animate-pulse" />
                    Launch AIRealtors247.io Now!
                </Button>
                
                <div className="flex justify-center gap-4 mt-6">
                    <Button asChild variant="outline" size="lg">
                        <a href="https://www.airealtors247.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <ExternalLink className="w-5 h-5" />
                            Test Your Live Site
                        </a>
                    </Button>
                </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl">
                <h3 className="text-xl font-bold text-slate-800 mb-2">What Happens Next?</h3>
                <p className="text-slate-700">
                    After deploying your application, your website will be live worldwide. The deployment process takes about 10-15 minutes to complete.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}
