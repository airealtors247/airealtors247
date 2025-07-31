import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Terminal,
  CheckCircle,
  Copy,
  Rocket,
  Globe,
  ExternalLink,
  Code
} from "lucide-react";

export default function ServerDeployment() {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const finalCommands = {
    git: 'sudo yum install git -y',
    clone: 'git clone https://github.com/base44/airealtors247.git',
    install: 'cd airealtors247 && npm install',
    build: 'npm run build',
    start: 'pm2 start npm --name "airealtors247" -- start',
    verify: 'pm2 status'
  };

  return (
    <div className="space-y-6">
      
      <Card className="shadow-lg border-green-300 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-800">
            <CheckCircle className="w-6 h-6" />
            ✅ Prerequisites Installed!
          </CardTitle>
          <CardDescription className="text-green-700">
            You've successfully installed Node.js, PM2, and Nginx. You're ready for the final launch sequence.
          </CardDescription>
        </CardHeader>
      </Card>
      
      <Card className="shadow-lg border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-800">
            <Rocket className="w-6 h-6" />
            🚀 Final Launch Sequence
          </CardTitle>
          <CardDescription className="text-blue-700">
            Run these commands one-by-one in your server terminal to get your website live.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           {/* Step 1: Install Git */}
           <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <p className="text-white text-base mb-2">Step 1: Install Git</p>
            <div className="flex items-center justify-between">
              <code>{finalCommands.git}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard(finalCommands.git, 'git')}
                className="text-green-400 hover:text-green-300"
              >
                {copied === 'git' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
           {/* Step 2: Clone Repository */}
           <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <p className="text-white text-base mb-2">Step 2: Download Website Code</p>
            <div className="flex items-center justify-between">
              <code>{finalCommands.clone}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard(finalCommands.clone, 'clone')}
                className="text-green-400 hover:text-green-300"
              >
                {copied === 'clone' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
           {/* Step 3: Install Dependencies */}
           <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <p className="text-white text-base mb-2">Step 3: Install Website Libraries</p>
            <div className="flex items-center justify-between">
              <code>{finalCommands.install}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard(finalCommands.install, 'install')}
                className="text-green-400 hover:text-green-300"
              >
                {copied === 'install' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
           {/* Step 4: Build Application */}
           <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <p className="text-white text-base mb-2">Step 4: Prepare Website for Production</p>
            <div className="flex items-center justify-between">
              <code>{finalCommands.build}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard(finalCommands.build, 'build')}
                className="text-green-400 hover:text-green-300"
              >
                {copied === 'build' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
           {/* Step 5: Start Application */}
           <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <p className="text-white text-base mb-2">Step 5: Start the Website</p>
            <div className="flex items-center justify-between">
              <code>{finalCommands.start}</code>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard(finalCommands.start, 'start')}
                className="text-green-400 hover:text-green-300"
              >
                {copied === 'start' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            Step 6: Verify and Go Live
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">Finally, run this command to check that your application is "online".</p>
          <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="flex items-center justify-between mb-2">
              <span>Check status:</span>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => copyToClipboard(finalCommands.verify, 'verify')}
                className="text-green-400 hover:text-green-300"
              >
                {copied === 'verify' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <code>{finalCommands.verify}</code>
          </div>
          <Alert className="bg-green-100 border-green-300">
            <Rocket className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              If PM2 shows a process with the name "airealtors247" and a status of "online", your website is now LIVE!
            </AlertDescription>
          </Alert>
          <div className="text-center pt-4">
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <a href="https://www.airealtors247.io" target="_blank" rel="noopener noreferrer">
                  <Globe className="w-5 h-5 mr-2" />
                  Visit Your Live Site
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}