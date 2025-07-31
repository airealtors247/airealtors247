import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, DollarSign } from "lucide-react";

export default function CampaignAnalytics({ campaigns }) {
  // Calculate analytics data
  const totalImpressions = campaigns.reduce((sum, c) => sum + (c.metrics?.impressions || 0), 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + (c.metrics?.clicks || 0), 0);
  const totalSpend = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Impressions</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalImpressions.toLocaleString()}</div>
            <p className="text-xs text-slate-500">Across all campaigns</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Clicks</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-slate-500">User engagements</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">${totalSpend.toLocaleString()}</div>
            <p className="text-xs text-slate-500">Campaign budget used</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg CTR</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgCTR}%</div>
            <p className="text-xs text-slate-500">Click-through rate</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          {campaigns.length > 0 ? (
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-slate-900">{campaign.name}</h3>
                    <p className="text-sm text-slate-600">{campaign.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">
                      {campaign.metrics?.leads_generated || 0} leads
                    </div>
                    <div className="text-sm text-slate-500">
                      ${campaign.metrics?.cost_per_lead || 0}/lead
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>No campaign data available yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}