import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, DollarSign, TrendingUp } from "lucide-react";

export default function CampaignStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Total Campaigns</CardTitle>
          <Target className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">{stats.totalCampaigns}</div>
          <p className="text-xs text-slate-500">All campaigns</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Active</CardTitle>
          <Users className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">{stats.activeCampaigns}</div>
          <p className="text-xs text-slate-500">Currently running</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Total Leads</CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">{stats.totalLeads}</div>
          <p className="text-xs text-slate-500">Leads generated</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Avg Conversion</CardTitle>
          <TrendingUp className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">{stats.avgConversion}%</div>
          <p className="text-xs text-slate-500">Lead to close rate</p>
        </CardContent>
      </Card>
    </div>
  );
}