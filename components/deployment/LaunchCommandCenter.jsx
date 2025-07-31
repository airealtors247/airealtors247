import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Rocket,
  CheckCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
  MousePointerClick,
  HelpCircle,
  Server,
  Fingerprint
} from "lucide-react";
import { Link } from 'react-router-dom';

export default function LaunchCommandCenter() {
  const serverIp = "67.202.50.80"; // Your actual N. Virginia server IP (t2.micro instance)
  const [copied, setCopied] = useState(false);
  const [dnsUpdated, setDnsUpdated] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIp);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const registrars = [
    { name: 'GoDaddy', url: 'https://dcc.godaddy.com/manage/dns' },
    { name: 'Cloudflare', url: 'https://dash.cloudflare.com' },
    { name: 'Namecheap', url: 'https://ap.www.namecheap.com/domains/list/' },
    { name: 'Google Domains', url: 'https://domains.google.com/registrar' },
    { name: 'Grape.ca', url: 'https://grape.ca/en/admng/' }
  ];

  if (dnsUpdated) {
    return (
      <Card className="shadow-2xl bg-gradient-to-br from-green-50 to-emerald-100 border-green-300">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3 text-green-800">
            <CheckCircle className="w-7 h-7" />
            DNS Updated!
          </CardTitle>
          <CardDescription className="text-green-700">
            Excellent! Your domain is now pointing to the live t2.micro server in N. Virginia.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-100 border border-green-200 p-4 rounded-lg">
            <h4 className="font-bold text-green-800 mb-2">✅ Server Configuration:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>Instance Type:</strong> t2.micro (FREE tier eligible)</li>
              <li>• <strong>Location:</strong> us-east-1 (N. Virginia)</li>
              <li>• <strong>IP Address:</strong> {serverIp}</li>
              <li>• <strong>Monthly Cost:</strong> $0 (First 12 months FREE)</li>
            </ul>
          </div>
          <p className="text-slate-700">
            Please allow up to a few hours for these changes to take effect across the internet (this is called DNS propagation).
          </p>
          <p className="text-slate-700">
            Once propagated, you will be able to access your live site at:
          </p>
          <a href="https://www.airealtors247.io" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline">
            https://www.airealtors247.io
          </a>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl border-blue-200">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-3 text-blue-800">
          <Rocket className="w-7 h-7" />
          Step 3: Go Live on AWS t2.micro (FREE)!
        </CardTitle>
        <p className="text-slate-600">
          Point your domain to the FREE AWS t2.micro server using 'A' records.
        </p>
        <div className="flex gap-2 mt-2">
          <Badge className="bg-green-100 text-green-800">FREE for 12 months</Badge>
          <Badge className="bg-blue-100 text-blue-800">750 hours/month included</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="font-bold text-lg mb-2 flex items-center">
            <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full mr-2 font-bold">1</span>
            Log In to Your Domain Registrar
          </h3>
          <p className="text-sm text-slate-600 pl-8 mb-4">
            Log in to the website where you purchased `airealtors247.io` and navigate to the DNS management or "Host Records" section.
          </p>
          <div className="pl-8 flex flex-wrap gap-2">
            {registrars.map(reg => (
              <Button asChild variant="outline" size="sm" key={reg.name}>
                <a href={reg.url} target="_blank" rel="noopener noreferrer">
                  {reg.name} <ExternalLink className="w-3 h-3 ml-1.5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-2 flex items-center">
            <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full mr-2 font-bold">2</span>
            Delete Conflicting Records
          </h3>
          <p className="text-sm text-slate-600 pl-8 mb-3">
            In your DNS settings, **delete any existing 'A' or 'CNAME' records** for the hostnames `@` and `www`. This prevents conflicts. The SSL CNAME record (with the long random name) should remain.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2 flex items-center">
            <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full mr-2 font-bold">3</span>
            Copy Your AWS t2.micro Server IP Address
          </h3>
          <div className="pl-8 space-y-3">
            <div className="bg-green-100 border border-green-200 p-3 rounded-lg">
              <p className="text-sm text-green-700 mb-2"><strong>Server Details:</strong></p>
              <ul className="text-xs text-green-600 space-y-1">
                <li>• Instance: t2.micro (1 vCPU, 1GB RAM)</li>
                <li>• Location: us-east-1 (N. Virginia)</li>
                <li>• Cost: FREE (first 12 months)</li>
              </ul>
            </div>
            <div className="flex items-center gap-3">
              <div className="font-mono bg-slate-100 p-3 rounded text-lg break-all flex-grow font-bold text-slate-800">
                {serverIp}
              </div>
              <Button onClick={copyToClipboard} size="sm">
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2 flex items-center">
            <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full mr-2 font-bold">4</span>
            Create Two 'A' Records
          </h3>
          <p className="text-sm text-slate-600 pl-8 mb-3">
            In your registrar's DNS settings, create the following two `A` records pointing to your AWS t2.micro server.
          </p>
          <div className="pl-8 space-y-4">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg font-mono text-sm space-y-2">
              <p><strong>Record 1:</strong></p>
              <p><strong>Type:</strong> A</p>
              <p><strong>Name/Host:</strong> @</p>
              <p><strong>Value/Points to:</strong> {serverIp}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg font-mono text-sm space-y-2">
              <p><strong>Record 2:</strong></p>
              <p><strong>Type:</strong> A</p>
              <p><strong>Name/Host:</strong> www</p>
              <p><strong>Value/Points to:</strong> {serverIp}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={() => setDnsUpdated(true)} size="lg" className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="w-5 h-5 mr-2" />
            I have updated my DNS records
          </Button>
        </div>

        <Alert className="mt-6 bg-green-50 border-green-200">
           <HelpCircle className="h-4 w-4 text-green-600" />
           <AlertDescription className="text-green-700">
             <strong>AWS Free Tier:</strong> Your t2.micro instance includes 750 hours per month (enough for 24/7 operation) completely FREE for your first 12 months. After that, it costs only ~$8.50/month.
           </AlertDescription>
         </Alert>
      </CardContent>
    </Card>
  );
}