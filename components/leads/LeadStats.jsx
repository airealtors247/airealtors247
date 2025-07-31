import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus, CheckCircle, TrendingUp } from "lucide-react";

export default function LeadStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Total Leads</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">{stats.totalLeads}</div>
          <p className="text-xs text-slate-500">All time</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">New Leads</CardTitle>
          <Plus className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">{stats.newLeads}</div>
          <p className="text-xs text-slate-500">Awaiting contact</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Qualified</CardTitle>
          <CheckCircle className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">{stats.qualifiedLeads}</div>
          <p className="text-xs text-slate-500">Ready to close</p>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">Conversion Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900">{stats.conversionRate}%</div>
          <p className="text-xs text-slate-500">Lead to close</p>
        </CardContent>
      </Card>
    </div>
  );
}