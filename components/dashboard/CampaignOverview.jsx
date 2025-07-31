import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Target, ArrowRight, Activity, Pause, Play, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

const statusConfig = {
  draft: { 
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: Calendar
  },
  scheduled: { 
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Calendar  
  },
  active: { 
    color: "bg-green-100 text-green-800 border-green-200",
    icon: Play
  },
  paused: { 
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Pause
  },
  completed: { 
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Activity
  }
};

export default function CampaignOverview({ campaigns }) {
  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-md flex items-center justify-center">
            <Target className="w-3 h-3 text-white" />
          </div>
          Campaign Overview
        </CardTitle>
        <Button variant="outline" asChild size="sm">
          <Link to={createPageUrl("Campaigns")}>
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {campaigns.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Target className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium mb-2">No campaigns running</p>
            <p className="text-sm">Launch your first marketing campaign</p>
            <Button asChild className="mt-4" size="sm">
              <Link to={createPageUrl("Campaigns")}>Create Campaign</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => {
              const config = statusConfig[campaign.status] || statusConfig.draft;
              const StatusIcon = config.icon;
              
              return (
                <div key={campaign.id} className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">{campaign.name}</h4>
                    <Badge className={config.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {campaign.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Type</p>
                      <p className="font-medium text-slate-900 capitalize">
                        {campaign.type?.replace('_', ' ')}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Platform</p>
                      <p className="font-medium text-slate-900 capitalize">
                        {campaign.platform || 'Mixed'}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Leads Generated</p>
                      <p className="font-medium text-green-600">
                        {campaign.metrics?.leads_generated || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500">Budget</p>
                      <p className="font-medium text-slate-900">
                        ${campaign.budget?.toFixed(0) || '0'}
                      </p>
                    </div>
                  </div>

                  {campaign.metrics?.conversion_rate && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Conversion Rate</span>
                        <span>{campaign.metrics.conversion_rate}%</span>
                      </div>
                      <Progress value={campaign.metrics.conversion_rate} className="h-1.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}