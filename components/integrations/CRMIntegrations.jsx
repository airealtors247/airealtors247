
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Settings,
  RefreshCw, // Changed from Sync to RefreshCw
  Users,
  TrendingUp
} from "lucide-react";
import { format } from "date-fns";

const crmPlatforms = [
  {
    id: "salesforce",
    name: "Salesforce",
    description: "World's #1 CRM platform with advanced lead management and automation",
    icon: Database,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    popularity: "Most Popular"
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Inbound marketing and sales platform with free CRM tier",
    icon: Database,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    popularity: "Great for Startups"
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Simple, visual sales pipeline management for real estate professionals",
    icon: Database,
    color: "text-green-600",
    bgColor: "bg-green-50",
    popularity: "Easy to Use"
  },
  {
    id: "gohighlevel",
    name: "GoHighLevel",
    description: "All-in-one marketing and CRM platform designed for agencies",
    icon: Database,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    popularity: "Real Estate Focused"
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

export default function CRMIntegrations({ integrations, onConnect, onDisconnect }) {
  const getIntegrationForPlatform = (platformId) => {
    return integrations.find(i => i.platform === platformId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">CRM Systems</h2>
        <p className="text-slate-600">
          Connect your CRM to sync leads, contacts, and deal data automatically
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {crmPlatforms.map((platform) => {
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
                    <div className="text-xs text-slate-500 mt-1">{platform.popularity}</div>
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
                      <span className="text-slate-500">Last Sync:</span>
                      <span className="font-medium">
                        {integration.last_sync ? format(new Date(integration.last_sync), 'MMM d, h:mm a') : 'Never'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Contacts Synced:</span>
                      <span className="font-medium text-green-600">247</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Active Deals:</span>
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
                        <RefreshCw className="w-4 h-4" /> {/* Changed from Sync to RefreshCw */}
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
                      <span className="text-slate-500">Auto-sync enabled</span>
                      <div className="flex items-center gap-1 text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Live</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CRM Setup Guide */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">CRM Setup Made Easy</h3>
            <p className="text-slate-600 mb-4">
              Our step-by-step integration wizard helps you connect your CRM in minutes. Map custom fields, set up automated workflows, and start syncing your real estate data instantly.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100">
                Setup Guide
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Sync Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
