import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Link as LinkIcon, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Phone, 
  Mail, 
  Database,
  Zap,
  CheckCircle
} from 'lucide-react';

export default function PowerfulIntegrations({ user }) {
  const integrations = [
    {
      name: 'MLS Systems',
      icon: Database,
      description: 'Auto-import listings from any MLS',
      status: 'not_connected',
      color: 'blue',
      features: ['Auto-sync listings', 'Price change alerts', 'Market reports']
    },
    {
      name: 'Facebook & Instagram',
      icon: Facebook,
      description: 'Post to 2B+ users automatically',
      status: 'not_connected',
      color: 'blue',
      features: ['Auto-posting', 'Lead generation ads', 'Engagement tracking']
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      description: 'Professional networking on autopilot',
      status: 'not_connected',
      color: 'blue',
      features: ['B2B networking', 'Professional content', 'Lead nurturing']
    },
    {
      name: 'Phone & SMS',
      icon: Phone,
      description: 'AI calling and texting system',
      status: 'not_connected',
      color: 'green',
      features: ['AI voice calls', 'Smart SMS', 'Appointment booking']
    },
    {
      name: 'Email Marketing',
      icon: Mail,
      description: 'Automated email sequences',
      status: 'not_connected',
      color: 'purple',
      features: ['Drip campaigns', 'Open tracking', 'Auto-responses']
    }
  ];

  const handleConnect = (integrationName) => {
    // In real app, this would open OAuth flow or setup modal
    console.log(`Connecting to ${integrationName}`);
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LinkIcon className="w-6 h-6 text-blue-600" />
          One-Click Integrations
        </CardTitle>
        <p className="text-slate-600 text-sm">Connect your existing tools in seconds</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {integrations.map((integration, index) => (
          <div key={index} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-${integration.color}-100 rounded-lg flex items-center justify-center`}>
                  <integration.icon className={`w-5 h-5 text-${integration.color}-600`} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{integration.name}</h4>
                  <p className="text-sm text-slate-600">{integration.description}</p>
                </div>
              </div>
              <Badge 
                variant={integration.status === 'connected' ? 'default' : 'outline'}
                className={integration.status === 'connected' ? 'bg-green-100 text-green-800' : ''}
              >
                {integration.status === 'connected' ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Connected
                  </>
                ) : (
                  'Not Connected'
                )}
              </Badge>
            </div>
            
            <div className="mb-3">
              <div className="flex flex-wrap gap-1">
                {integration.features.map((feature, idx) => (
                  <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <Button 
              className="w-full"
              variant={integration.status === 'connected' ? 'outline' : 'default'}
              onClick={() => handleConnect(integration.name)}
            >
              {integration.status === 'connected' ? (
                'Manage Settings'
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Connect Now
                </>
              )}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}