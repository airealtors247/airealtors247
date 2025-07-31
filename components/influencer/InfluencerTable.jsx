import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ExternalLink, 
  Mail, 
  Phone, 
  Globe, 
  Users, 
  TrendingUp,
  CheckCircle,
  Star
} from "lucide-react";

export default function InfluencerTable({ influencers, onStartCampaign }) {
  if (influencers.length === 0) {
    return (
      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle>Found Influencers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No influencers found yet</h3>
            <p className="text-slate-600 mb-4">Use the AI search to discover influencers in your target categories</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Found Influencers ({influencers.length})</span>
          <Badge className="bg-green-100 text-green-800">AI Verified</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {influencers.map((influencer, index) => (
            <div key={influencer.id || index} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Section */}
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg">
                      {influencer.name?.charAt(0) || 'I'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-slate-900">{influencer.name}</h3>
                      {influencer.verified && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-slate-600 mb-2">{influencer.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className="bg-purple-100 text-purple-800">
                        {influencer.platform}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800">
                        {influencer.category}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        {influencer.country}
                      </Badge>
                      {influencer.ai_score && (
                        <Badge className="bg-amber-100 text-amber-800">
                          <Star className="w-3 h-3 mr-1" />
                          AI Score: {influencer.ai_score}/100
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="flex flex-col justify-between">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {influencer.follower_count?.toLocaleString()}
                      </div>
                      <div className="text-sm text-slate-600">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {influencer.engagement_rate}%
                      </div>
                      <div className="text-sm text-slate-600">Engagement</div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    {influencer.email && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-4 h-4" />
                        <span>{influencer.email}</span>
                      </div>
                    )}
                    {influencer.contact_info?.phone && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone className="w-4 h-4" />
                        <span>{influencer.contact_info.phone}</span>
                      </div>
                    )}
                    {influencer.contact_info?.website && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Globe className="w-4 h-4" />
                        <span>{influencer.contact_info.website}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onStartCampaign(influencer)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Start Campaign
                    </Button>
                    {influencer.profile_url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={influencer.profile_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}