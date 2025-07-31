import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ArrowRight, Settings, Users, Sparkles, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';

const features = [
  { id: 'profile', name: 'Complete Your Profile', link: createPageUrl('Profile'), icon: Settings },
  { id: 'leads', name: 'Add Your First Lead', link: createPageUrl('Leads'), icon: Users },
  { id: 'ai_tools', name: 'Generate AI Content', link: createPageUrl('AITools'), icon: Sparkles },
  { id: 'website', name: 'Launch Your Website', link: createPageUrl('WebsiteBuilder'), icon: Globe },
];

export default function SystemUtilization({ utilizationScore, completedFeatures }) {
  
  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings className="w-5 h-5 text-indigo-600" />
          System Utilization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <div className="text-5xl font-bold text-indigo-700">{utilizationScore}%</div>
          <p className="text-slate-600">of platform features unlocked</p>
        </div>
        <Progress value={utilizationScore} className="h-3 mb-6" />
        
        <h4 className="font-semibold text-slate-800 mb-3">Unlock Your Next Level:</h4>
        <div className="space-y-3">
          {features.map(feature => {
            const isCompleted = completedFeatures.includes(feature.id);
            return (
              <div key={feature.id} className={`flex items-center justify-between p-3 rounded-lg ${isCompleted ? 'bg-green-100' : 'bg-white'}`}>
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <feature.icon className="w-5 h-5 text-slate-500" />
                  )}
                  <span className={`font-medium ${isCompleted ? 'text-green-900 line-through' : 'text-slate-800'}`}>
                    {feature.name}
                  </span>
                </div>
                {!isCompleted && (
                  <Button size="sm" variant="ghost" asChild>
                    <Link to={feature.link}>
                      Start <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}