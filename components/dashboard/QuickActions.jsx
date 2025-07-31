import React from 'react';
import { Button } from "@/components/ui/button";
import { Edit, Rocket, Brain, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const actions = [
  { label: 'Edit AI Script', icon: Edit, link: createPageUrl('AITools') }, // Simplified link
  { label: 'Launch Campaign', icon: Rocket, link: createPageUrl('Campaigns') },
  { label: 'Train Me', icon: Brain, link: '#' }, // This would trigger the coach
  { label: 'Send SMS Blast', icon: MessageSquare, link: createPageUrl('Campaigns') },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map(action => (
        <Button key={action.label} variant="outline" className="flex-col h-20 shadow-sm" asChild>
          <Link to={action.link}>
            <action.icon className="w-6 h-6 mb-1" />
            <span className="text-xs text-center">{action.label}</span>
          </Link>
        </Button>
      ))}
    </div>
  );
}