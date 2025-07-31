import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Zap, Mail, MessageSquare, Users, Edit, CheckSquare, Sparkles } from 'lucide-react';

const OneClickAutomation = ({ user }) => {
  const [automations, setAutomations] = useState([
    {
      id: 'new_lead_follow_up',
      title: 'New Lead Follow-Up',
      description: 'Instantly send a welcome email and SMS to every new lead.',
      tags: ['Email', 'SMS', 'Lead Nurture'],
      color: 'blue',
      enabled: false,
    },
    {
      id: 'past_client_nurture',
      title: 'Past Client Nurture',
      description: 'Automatically send a "Happy Home-iversary" email each year.',
      tags: ['Email', 'Client Retention'],
      color: 'green',
      enabled: true,
    },
    {
      id: 'review_request',
      title: 'Automated Review Request',
      description: 'Ask for a review 14 days after a deal is marked "Closed".',
      tags: ['Email', 'SMS', 'Reviews'],
      color: 'purple',
      enabled: false,
    },
    {
      id: 'listing_inquiry_response',
      title: 'Instant Listing Inquiry Response',
      description: 'AI responds to inquiries on your listings within 60 seconds.',
      tags: ['AI', 'SMS', 'Lead Response'],
      color: 'red',
      enabled: true,
    },
  ]);

  const handleToggle = (id) => {
    setAutomations(prev => 
      prev.map(auto => 
        auto.id === id ? { ...auto, enabled: !auto.enabled } : auto
      )
    );
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlayCircle className="w-6 h-6 text-purple-600" />
          One-Click Automations
        </CardTitle>
        <p className="text-slate-600 text-sm">Activate powerful pre-built workflows instantly.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {automations.map((automation) => (
          <div key={automation.id} className={`p-4 rounded-lg border-2 ${automation.enabled ? `border-${automation.color}-300 bg-${automation.color}-50` : 'border-slate-200 bg-white'}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <h4 className={`font-semibold text-slate-900 ${automation.enabled ? `text-${automation.color}-800` : ''}`}>{automation.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{automation.description}</p>
              </div>
              <Switch
                checked={automation.enabled}
                onCheckedChange={() => handleToggle(automation.id)}
              />
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              {automation.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full mt-4">
          <Sparkles className="w-4 h-4 mr-2" />
          Create Custom Automation
        </Button>
      </CardContent>
    </Card>
  );
};

export default OneClickAutomation;