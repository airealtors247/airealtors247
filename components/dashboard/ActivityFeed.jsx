import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Mail, MessageSquare, Phone, UserPlus } from 'lucide-react';

const activityIcons = {
  social_post_published: { icon: MessageSquare, color: 'text-blue-500' },
  email_sequence_sent: { icon: Mail, color: 'text-green-500' },
  lead_follow_up_sent: { icon: UserPlus, color: 'text-purple-500' },
  voice_call: { icon: Phone, color: 'text-orange-500' },
  default: { icon: Zap, color: 'text-slate-500' }
};

export default function ActivityFeed({ activities }) {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="w-5 h-5 text-yellow-500" />
          Live AI Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities && activities.length > 0 ? (
            activities.map(activity => {
              const config = activityIcons[activity.activity_type] || activityIcons.default;
              const message = activity.activity_details?.message_sent || activity.activity_type.replace(/_/g, ' ');
              
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-100`}>
                     <config.icon className={`w-4 h-4 ${config.color}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-800 truncate" title={message}>
                      {message}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-500">
              <p>AI is warming up. Actions will appear here live.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}