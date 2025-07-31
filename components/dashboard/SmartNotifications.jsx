import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, AlertCircle, CheckCircle, Info, TrendingUp } from 'lucide-react';

export default function SmartNotifications() {
  const notifications = [
    {
      type: 'success',
      icon: CheckCircle,
      title: 'New Lead Converted',
      message: 'Sarah Johnson from Facebook just booked a showing',
      time: '2 min ago',
      color: 'green'
    },
    {
      type: 'info',
      icon: Info,
      title: 'AI Scheduled 3 Posts',
      message: 'Your social media content for tomorrow is ready',
      time: '15 min ago',
      color: 'blue'
    },
    {
      type: 'warning',
      icon: AlertCircle,
      title: 'Follow-up Reminder',
      message: 'Mike Davis (hot lead) needs follow-up call',
      time: '1 hour ago',
      color: 'orange'
    },
    {
      type: 'achievement',
      icon: TrendingUp,
      title: 'Monthly Goal Reached!',
      message: 'You hit 50 leads this month - 25% ahead of target',
      time: '3 hours ago',
      color: 'purple'
    }
  ];

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-blue-600" />
            Smart Notifications
          </div>
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            4 New
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification, index) => (
          <div key={index} className={`flex items-start gap-3 p-3 rounded-lg border-l-4 border-${notification.color}-500 bg-${notification.color}-50`}>
            <notification.icon className={`w-5 h-5 text-${notification.color}-600 mt-0.5 flex-shrink-0`} />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-900 text-sm">{notification.title}</h4>
              <p className="text-sm text-slate-700">{notification.message}</p>
              <span className="text-xs text-slate-500">{notification.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}