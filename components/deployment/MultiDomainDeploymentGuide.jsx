import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Folder, 
  Globe, 
  GitBranch, 
  Copy, 
  CheckCircle, 
  Terminal,
  FileText,
  Rocket
} from "lucide-react";

export default function MultiDomainDeploymentGuide() {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const commands = {
    createStructure: `# Create organized folder structure
cd ~
mkdir -p websites/airealtors247.com
mkdir -p websites/airealtors247.io
mkdir -p websites/shared-components`,

    setupIO: `# Set up the .io website (current live site)
cd ~/websites/airealtors247.io
cp -r ~/airealtors247/* .
# This copies your current working site`,

    createComStructure: `# Create placeholder structure for .com site
cd ~/websites/airealtors247.com
mkdir -p pages components entities functions
echo "# AIRealtors247.com - Full Platform" > README.md`,

    nginxConfig: `# Update Nginx to serve from organized folders
sudo nano /etc/nginx/conf.d/airealtors247.conf`,

    gitSetup: `# Initialize git repositories
cd ~/websites/airealtors247.io
git init
git remote add origin https://github.com/YOUR_USERNAME/airealtors247.io.git

cd ~/websites/airealtors247.com  
git init
git remote add origin https://github.com/YOUR_USERNAME/airealtors247.com.git`
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Multi-Domain Website Organization</h1>
        <p className="text-slate-600">Organize your websites properly to avoid confusion between .com and .io</p>
      </div>

      {/* Folder Structure Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Recommended Folder Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm">
            <div className="space-y-1">
              <div>📁 /home/ec2-user/websites/</div>
              <div className="ml-4">├── 📁 airealtors247.com/ (Full platform - your existing GitHub repo)</div>
              <div className="ml-8">│   ├── 📁 pages/</div>
              <div className="ml-8">│   ├── 📁 components/</div>
              <div className="ml-8">│   ├── 📁 entities/</div>
              <div className="ml-8">│   └── 📄 package.json</div>
              <div className="ml-4">├── 📁 airealtors247.io/ (Simple marketing site - new repo)</div>
              <div className="ml-8">│   ├── 📄 server.js</div>
              <div className="ml-8">│   ├── 📄 package.json</div>
              <div className="ml-8">│   └── 📁 public/</div>
              <div className="ml-4">└── 📁 shared-components/ (Optional - shared assets)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Commands */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Step 1: Create Folder Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Create organized folders:</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => copyToClipboard(commands.createStructure, 'structure')}
                  className="text-green-400 hover:text-green-300"
                >
                  {copied === 'structure' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <pre className="whitespace-pre-wrap">{commands.createStructure}</pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Step 2: Move Current .io Site
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Move current working site:</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => copyToClipboard(commands.setupIO, 'io')}
                  className="text-green-400 hover:text-green-300"
                >
                  {copied === 'io' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <pre className="whitespace-pre-wrap">{commands.setupIO}</pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Step 3: Prepare .com Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Prepare .com folder:</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => copyToClipboard(commands.createComStructure, 'com')}
                  className="text-green-400 hover:text-green-300"
                >
                  {copied === 'com' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <pre className="whitespace-pre-wrap">{commands.createComStructure}</pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="w-5 h-5" />
              Step 4: Initialize Git Repos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white">Set up GitHub repos:</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => copyToClipboard(commands.gitSetup, 'git')}
                  className="text-green-400 hover:text-green-300"
                >
                  {copied === 'git' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <pre className="whitespace-pre-wrap">{commands.gitSetup}</pre>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Updated Nginx Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Step 5: Update Nginx Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertDescription>
              You'll need to update your Nginx config to point to the new organized folder structure.
            </AlertDescription>
          </Alert>
          
          <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="mb-2 text-white">Updated Nginx config for organized structure:</div>
            <pre className="whitespace-pre-wrap">{`server {
    listen 80;
    listen 443 ssl;
    server_name airealtors247.io www.airealtors247.io;
    
    # SSL certificates (managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/airealtors247.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/airealtors247.io/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`}</pre>
          </div>
        </CardContent>
      </Card>

      {/* PM2 Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Step 6: Update PM2 Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <pre className="whitespace-pre-wrap">{`# Stop current process
pm2 stop airealtors247 && pm2 delete airealtors247

# Start from new organized location
cd ~/websites/airealtors247.io
pm2 start npm --name "airealtors247-io" -- start

# Verify it's running
pm2 status`}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Benefits of This Organization</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-green-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Clear separation between .com (full platform) and .io (marketing site)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Easy to manage multiple GitHub repositories</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>No confusion when deploying updates</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Scalable for future domain additions</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}