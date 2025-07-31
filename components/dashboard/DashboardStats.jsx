import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Phone, 
  Calendar, 
  Home, 
  TrendingUp, 
  Target,
  MessageSquare,
  Star,
  Award
} from 'lucide-react';

const StatCard = ({ title, value, subtitle, icon: Icon, color, progress, badge }) => (
  <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
      <div className={`w-8 h-8 bg-${color}-50 rounded-lg flex items-center justify-center`}>
        <Icon className={`w-4 h-4 text-${color}-600`} />
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between mb-2">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {badge && <Badge variant="secondary" className="text-xs">{badge}</Badge>}
      </div>
      {subtitle && <p className="text-xs text-slate-500 mb-2">{subtitle}</p>}
      {progress !== undefined && (
        <div className="space-y-1">
          <Progress value={progress} className="h-1" />
          <p className="text-xs text-slate-500">{progress}% to goal</p>
        </div>
      )}
    </CardContent>
  </Card>
);

export default function DashboardStats({ metrics }) {
  const stats = [
    {
      title: "Leads Generated",
      value: `${metrics?.leadsToday || 0}`,
      subtitle: `${metrics?.leadsWeekly || 0} this week • ${metrics?.leadsMonthly || 0} this month`,
      icon: Users,
      color: "blue",
      badge: "AI Powered"
    },
    {
      title: "AI Calls Made",
      value: `${metrics?.callsToday || 0}`,
      subtitle: `${metrics?.callsWeekly || 0} this week • ${metrics?.callsMonthly || 0} this month`,
      icon: Phone,
      color: "green",
      badge: "Auto-Executing"
    },
    {
      title: "Appointments Booked",
      value: `${metrics?.appointmentsToday || 0}`,
      subtitle: `${metrics?.appointmentsWeekly || 0} this week • ${metrics?.appointmentsMonthly || 0} this month`,
      icon: Calendar,
      color: "purple",
      progress: metrics?.appointmentProgress || 0
    },
    {
      title: "Active Listings",
      value: `${metrics?.activeListings || 0}`,
      subtitle: `${metrics?.newListingsWeek || 0} new this week`,
      icon: Home,
      color: "red",
      progress: metrics?.listingProgress || 0
    },
    {
      title: "Social Media Posts",
      value: `${metrics?.postsToday || 0}`,
      subtitle: `${metrics?.postsWeekly || 0} this week • ${metrics?.totalEngagement || 0} engagements`,
      icon: MessageSquare,
      color: "pink",
      badge: "AI Generated"
    },
    {
      title: "Referrals Given",
      value: `${metrics?.referralsGiven || 0}`,
      subtitle: `${metrics?.referralsReceived || 0} received back`,
      icon: Star,
      color: "yellow"
    },
    {
      title: "Training Progress",
      value: `${metrics?.trainingCompleted || 0}%`,
      subtitle: `${metrics?.lessonsCompleted || 0} lessons completed`,
      icon: Award,
      color: "indigo",
      progress: metrics?.trainingCompleted || 0
    },
    {
      title: "Conversion Rate",
      value: `${metrics?.conversionRate || 0}%`,
      subtitle: "Calls to appointments",
      icon: TrendingUp,
      color: "emerald"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}