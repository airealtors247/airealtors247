import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Settings,
  BarChart3
} from "lucide-react";
import { format } from "date-fns";

const socialPlatforms = [
  {
    id: "facebook",
    name: "Facebook",
    description: "Connect your Facebook pages for automated posting and engagement",
    icon: Facebook,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Share photos and stories automatically to grow your audience",
    icon: Instagram,
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Build professional relationships with targeted real estate content",
    icon: Linkedin,
    color: "text-blue-700",
    bgColor: "bg-blue-50"
  },
  {
    id: "twitter",
    name: "Twitter",
    description: "Share quick updates and engage with real estate trends",
    icon: Twitter,
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    id: "youtube",
    name: "YouTube",
    description: "Upload property tours and real estate education videos",
    icon: Youtube,
    color: "text-red-600",
    bgColor: "bg-red-50"
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

export default function SocialMediaIntegrations({ integrations, onConnect, onDisconnect }) {
  const getIntegrationForPlatform = (platformId) => {
    return integrations.find(i => i.platform === platformId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Social Media Platforms</h2>
        <p className="text-slate-600">
          Connect your social media accounts to automate posting and grow your real estate brand
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socialPlatforms.map((platform) => {
          const integration = getIntegrationForPlatform(platform.id);
          const status = integration?.status || 'disconnected';
          const statusInfo = statusConfig[status];
          const PlatformIcon = platform.icon;
          const StatusIcon = statusInfo.icon;

          return (
            <Card key={platform.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-3 rounded-xl ${platform.bgColor}`}>
                    <PlatformIcon className={`w-6 h-6 ${platform.color}`} />
                  </div>
                  <Badge className={statusInfo.color}>
                    <StatusIcon className={`w-3 h-3 mr-1 ${statusInfo.iconColor}`} />
                    {status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{platform.name}</CardTitle>
                <p className="text-sm text-slate-600">{platform.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {integration && status === 'connected' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Account:</span>
                      <span className="font-medium">{integration.account_name}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Last Sync:</span>
                      <span className="font-medium">
                        {integration.last_sync ? format(new Date(integration.last_sync), 'MMM d, h:mm a') : 'Never'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Posts Scheduled:</span>
                      <span className="font-medium text-blue-600">12</span>
                    </div>
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
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3"
                      >
                        <BarChart3 className="w-4 h-4" />
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
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Auto-posting enabled</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Social Media Analytics</h3>
            <p className="text-slate-600 mb-4">
              Track engagement, reach, and lead generation across all your connected social media platforms with our comprehensive analytics dashboard.
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              View Analytics
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}