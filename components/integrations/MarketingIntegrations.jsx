import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  Sparkles,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Settings,
  BarChart3,
  Zap
} from "lucide-react";
import { format } from "date-fns";

const marketingPlatforms = [
  {
    id: "instantly",
    name: "Instantly",
    description: "Cold email outreach platform with high deliverability rates",
    icon: Mail,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    category: "Email Marketing"
  },
  {
    id: "smartleads",
    name: "Smartleads",
    description: "Advanced email sequences and lead nurturing automation",
    icon: Mail,
    color: "text-green-600", 
    bgColor: "bg-green-50",
    category: "Email Marketing"
  },
  {
    id: "twilio",
    name: "Twilio",
    description: "SMS messaging and voice calling infrastructure",
    icon: Phone,
    color: "text-red-600",
    bgColor: "bg-red-50",
    category: "Communication"
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "AI-powered voice generation for personalized call campaigns",
    icon: Sparkles,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    category: "AI Voice"
  }
];

const statusConfig = {
  connected: {
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
    iconColor: "text-green-600"
  },
  disconnected: {
    color: "bg-gray-100 text-gray-800 border-gray-200", 
    icon: XCircle,
    iconColor: "text-gray-400"
  },
  error: {
    color: "bg-red-100 text-red-800 border-red-200",
    icon: AlertCircle,
    iconColor: "text-red-600"
  }
};

export default function MarketingIntegrations({ integrations, onConnect, onDisconnect }) {
  const getIntegrationForPlatform = (platformId) => {
    return integrations.find(i => i.platform === platformId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Marketing & Communication Tools</h2>
        <p className="text-slate-600">
          Connect email, SMS, and voice platforms to automate your outreach campaigns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketingPlatforms.map((platform) => {
          const integration = getIntegrationForPlatform(platform.id);
          const status = integration?.status || 'disconnected';
          const statusInfo = statusConfig[status];
          const PlatformIcon = platform.icon;
          const StatusIcon = statusInfo.icon;

          return (
            <Card key={platform.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-4 rounded-xl ${platform.bgColor}`}>
                    <PlatformIcon className={`w-8 h-8 ${platform.color}`} />
                  </div>
                  <div className="text-right">
                    <Badge className={statusInfo.color}>
                      <StatusIcon className={`w-3 h-3 mr-1 ${statusInfo.iconColor}`} />
                      {status}
                    </Badge>
                    <div className="text-xs text-slate-500 mt-1">{platform.category}</div>
                  </div>
                </div>
                <CardTitle className="text-xl">{platform.name}</CardTitle>
                <p className="text-sm text-slate-600 leading-relaxed">{platform.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {integration && status === 'connected' && (
                  <div className="space-y-3 bg-slate-50 rounded-lg p-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Account:</span>
                      <span className="font-medium">{integration.account_name}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Last Activity:</span>
                      <span className="font-medium">
                        {integration.last_sync ? format(new Date(integration.last_sync), 'MMM d, h:mm a') : 'Never'}
                      </span>
                    </div>
                    {platform.id === 'instantly' || platform.id === 'smartleads' ? (
                      <>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Emails Sent:</span>
                          <span className="font-medium text-blue-600">1,247</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Open Rate:</span>
                          <span className="font-medium text-green-600">24.8%</span>
                        </div>
                      </>
                    ) : platform.id === 'twilio' ? (
                      <>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Messages Sent:</span>
                          <span className="font-medium text-blue-600">892</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Calls Made:</span>
                          <span className="font-medium text-purple-600">156</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Voice Minutes:</span>
                          <span className="font-medium text-purple-600">2,340</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Success Rate:</span>
                          <span className="font-medium text-green-600">87%</span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  {status === 'connected' ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDisconnect(integration.id)}
                        className="flex-1"
                      >
                        Disconnect
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3"
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => onConnect(platform.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Connect {platform.name}
                    </Button>
                  )}
                </div>

                {status === 'connected' && (
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Campaign active</span>
                      <div className="flex items-center gap-1 text-blue-600">
                        <Zap className="w-3 h-3" />
                        <span>Automated</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Marketing Automation Guide */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Multi-Channel Automation</h3>
            <p className="text-slate-600 mb-4">
              Create sophisticated marketing funnels that combine email, SMS, and voice outreach. Set up trigger-based sequences that nurture leads automatically based on their behavior and preferences.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="border-indigo-300 text-indigo-700 hover:bg-indigo-100">
                Create Campaign
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Performance
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}