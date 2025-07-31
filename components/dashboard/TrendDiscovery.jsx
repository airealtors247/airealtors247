import React, { useState, useEffect } from 'react';
import { TrendAnalysis } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Lightbulb, 
  Play, 
  ExternalLink,
  Star,
  Target,
  Zap
} from 'lucide-react';

export default function TrendDiscovery({ user }) {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTrends();
  }, []);

  const loadTrends = async () => {
    try {
      const trendsData = await TrendAnalysis.filter({}, "-discovery_date", 5);
      setTrends(trendsData);
    } catch (error) {
      console.error("Error loading trends:", error);
      // Mock data for demonstration
      setTrends([
        {
          trend_title: "AI Voice Messages for Lead Follow-up",
          trend_category: "lead_generation",
          source_platform: "youtube",
          source_creator: "Tom Ferry",
          trend_description: "Top agents are using AI-generated voice messages to follow up with leads at scale, increasing response rates by 300%",
          effectiveness_score: 9,
          discovery_date: "2024-01-15T10:00:00Z",
          implementation_steps: [
            "Record 5-minute voice sample",
            "Set up AI voice cloning",
            "Create follow-up message templates",
            "Automate delivery system"
          ]
        },
        {
          trend_title: "Neighborhood Expert Content Strategy",
          trend_category: "social_media",
          source_platform: "instagram",
          source_creator: "Ryan Serhant",
          trend_description: "Realtors becoming the go-to neighborhood expert through hyper-local content are seeing 250% more local leads",
          effectiveness_score: 8,
          discovery_date: "2024-01-14T15:30:00Z",
          implementation_steps: [
            "Choose 3 target neighborhoods",
            "Create weekly market update videos",
            "Share local business highlights",
            "Post upcoming development news"
          ]
        },
        {
          trend_title: "Pre-Listing Marketing Packages",
          trend_category: "listing_strategy",
          source_platform: "linkedin",
          source_creator: "Gary Vaynerchuk",
          trend_description: "Agents offering comprehensive marketing packages before listing are closing 40% more listings",
          effectiveness_score: 9,
          discovery_date: "2024-01-13T09:15:00Z",
          implementation_steps: [
            "Create professional photography package",
            "Develop social media campaign template",
            "Build email marketing sequence",
            "Design print marketing materials"
          ]
        }
      ]);
    }
    setIsLoading(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      lead_generation: "bg-blue-100 text-blue-800",
      social_media: "bg-pink-100 text-pink-800",
      listing_strategy: "bg-green-100 text-green-800",
      marketing: "bg-purple-100 text-purple-800",
      technology: "bg-indigo-100 text-indigo-800",
      client_service: "bg-yellow-100 text-yellow-800",
      negotiation: "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      youtube: "📺",
      instagram: "📸",
      tiktok: "🎵",
      linkedin: "💼",
      twitter: "🐦",
      real_estate_blogs: "📝"
    };
    return icons[platform] || "🌐";
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-900">
          <TrendingUp className="w-6 h-6 text-orange-600" />
          AI Trend Discovery & Implementation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Header Info */}
        <div className="bg-white p-3 rounded-lg border border-orange-200">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-4 h-4 text-orange-600" />
            <h4 className="font-semibold text-orange-900">Latest Industry Intelligence</h4>
          </div>
          <p className="text-sm text-orange-800">
            AI-discovered trends from top real estate experts. Click "Implement" for step-by-step guidance.
          </p>
        </div>

        {/* Trends List */}
        <div className="space-y-3">
          {trends.map((trend, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              
              {/* Trend Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getPlatformIcon(trend.source_platform)}</span>
                    <Badge className={getCategoryColor(trend.trend_category)}>
                      {trend.trend_category.replace(/_/g, ' ')}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {trend.effectiveness_score}/10
                    </Badge>
                  </div>
                  <h5 className="font-semibold text-slate-900 mb-1">{trend.trend_title}</h5>
                  <p className="text-sm text-slate-600 mb-2">{trend.trend_description}</p>
                  <p className="text-xs text-slate-500">
                    Source: {trend.source_creator} • {new Date(trend.discovery_date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Implementation Preview */}
              {trend.implementation_steps && trend.implementation_steps.length > 0 && (
                <div className="bg-slate-50 p-3 rounded mt-3">
                  <h6 className="font-medium text-slate-800 mb-2 flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    Quick Implementation Steps:
                  </h6>
                  <div className="text-sm text-slate-700">
                    {trend.implementation_steps.slice(0, 2).map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center gap-2 mb-1">
                        <span className="w-4 h-4 bg-slate-300 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {stepIndex + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                    {trend.implementation_steps.length > 2 && (
                      <p className="text-xs text-slate-500 mt-1">
                        +{trend.implementation_steps.length - 2} more steps...
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  <Zap className="w-3 h-3 mr-1" />
                  Implement Now
                </Button>
                <Button size="sm" variant="outline">
                  <Play className="w-3 h-3 mr-1" />
                  Watch Source
                </Button>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-200 p-3 rounded-lg text-center">
          <p className="text-sm font-medium text-orange-900 mb-2">
            Want more personalized trend discoveries?
          </p>
          <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
            Configure AI Trend Alerts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}