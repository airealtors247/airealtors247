import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  TrendingUp,
  Activity
} from "lucide-react";

export default function IntegrationStats({ stats }) {
  const connectionRate = stats.total > 0 ? Math.round((stats.connected / stats.total) * 100) : 0;

  const statCards = [
    {
      title: "Total Integrations",
      value: stats.total,
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Connected",
      value: stats.connected,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Disconnected", 
      value: stats.disconnected,
      icon: XCircle,
      color: "text-gray-600",
      bgColor: "bg-gray-100"
    },
    {
      title: "Errors",
      value: stats.errors,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {/* Connection Rate Card */}
      <Card className="lg:col-span-1 shadow-lg border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-medium text-slate-600 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Connection Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-900 mb-2">{connectionRate}%</div>
          <Progress value={connectionRate} className="h-2 mb-2" />
          <p className="text-xs text-slate-500">
            {stats.connected} of {stats.total} platforms
          </p>
        </CardContent>
      </Card>

      {/* Individual Stats */}
      {statCards.map((stat) => (
        <Card key={stat.title} className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            {stat.title === "Connected" && stats.total > 0 && (
              <p className="text-xs text-slate-500 mt-1">
                <Activity className="w-3 h-3 inline mr-1" />
                Active integrations
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}