import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Star,
  Award
} from 'lucide-react';

export default function ResultsShowcase() {
  const results = [
    {
      metric: 'Revenue This Month',
      value: '$127,500',
      change: '+34%',
      icon: DollarSign,
      color: 'green'
    },
    {
      metric: 'New Leads',
      value: '89',
      change: '+156%',
      icon: Users,
      color: 'blue'
    },
    {
      metric: 'Appointments Booked',
      value: '23',
      change: '+67%',
      icon: Calendar,
      color: 'purple'
    },
    {
      metric: 'Client Satisfaction',
      value: '4.9/5',
      change: '+12%',
      icon: Star,
      color: 'yellow'
    }
  ];

  const achievements = [
    { title: 'Top Producer', description: 'This quarter', icon: '🏆' },
    { title: 'Lead Generation Expert', description: '500+ leads generated', icon: '🎯' },
    { title: 'Automation Master', description: '99.2% uptime', icon: '⚡' },
    { title: 'Client Favorite', description: '4.9★ average rating', icon: '⭐' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Results Metrics */}
      <Card className="shadow-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            Your Results
          </CardTitle>
          <p className="text-green-700 text-sm">AI is delivering real results</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <result.icon className={`w-5 h-5 text-${result.color}-600`} />
                <div>
                  <div className="font-semibold text-slate-900">{result.metric}</div>
                  <div className="text-2xl font-bold text-slate-900">{result.value}</div>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">
                {result.change}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-600" />
            Achievements Unlocked
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <div className="font-semibold text-amber-900">{achievement.title}</div>
                <div className="text-sm text-amber-700">{achievement.description}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}