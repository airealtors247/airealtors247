import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  X, 
  Send, 
  Gift, 
  Star,
  Users,
  TrendingUp
} from "lucide-react";

export default function InfluencerCampaignModal({ influencer, onSubmit, onClose }) {
  const [campaignData, setCampaignData] = useState({
    campaignName: `Brand Ambassador - ${influencer.name}`,
    messageTemplate: `Hi ${influencer.name},

I've been following your work in the ${influencer.category} space and I'm really impressed with your content and engagement with your audience.

I'd love to invite you to become a brand ambassador for AIRealtors247 - a cutting-edge AI platform that's revolutionizing how professionals in various industries manage their business and marketing.

What we're offering:
• Free access to our premium AI tools (valued at $297/month)
• Additional credits to power your content creation
• Early access to new features
• Partnership opportunities as we grow

In return, we'd love for you to:
• Share your experience using our platform
• Create authentic content about how AI is helping your business
• Provide feedback to help us improve

Would you be interested in learning more? I'd be happy to set up a quick call to discuss the details.

Best regards,
[Your Name]`,
    offerDetails: 'Free Premium Access + 5,000 bonus credits monthly',
    creditsOffered: 5000
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(campaignData);
  };

  const handleChange = (field, value) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">Create Ambassador Campaign</CardTitle>
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-white text-purple-600 font-bold">
                    {influencer.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{influencer.name}</div>
                  <div className="text-purple-100 text-sm">
                    {influencer.follower_count?.toLocaleString()} followers • {influencer.engagement_rate}% engagement
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campaign Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Campaign Name
                </label>
                <Input
                  value={campaignData.campaignName}
                  onChange={(e) => handleChange('campaignName', e.target.value)}
                  placeholder="Enter campaign name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Credits Offered
                </label>
                <Input
                  type="number"
                  value={campaignData.creditsOffered}
                  onChange={(e) => handleChange('creditsOffered', parseInt(e.target.value) || 0)}
                  placeholder="5000"
                />
              </div>
            </div>

            {/* Offer Details */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Offer Summary
              </label>
              <Input
                value={campaignData.offerDetails}
                onChange={(e) => handleChange('offerDetails', e.target.value)}
                placeholder="What are you offering to this influencer?"
              />
            </div>

            {/* Message Template */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Outreach Message
              </label>
              <Textarea
                value={campaignData.messageTemplate}
                onChange={(e) => handleChange('messageTemplate', e.target.value)}
                rows={12}
                className="font-mono text-sm"
                placeholder="Customize your outreach message..."
              />
              <p className="text-xs text-slate-500 mt-1">
                This message will be sent via email to {influencer.email}
              </p>
            </div>

            {/* Preview Cards */}
            <div className="bg-slate-50 rounded-lg p-4">
              <h3 className="font-semibold text-slate-900 mb-3">Campaign Preview</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <Gift className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-slate-900">Credits Offered</div>
                  <div className="text-purple-600 font-bold">{campaignData.creditsOffered?.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-slate-900">Target Audience</div>
                  <div className="text-blue-600 font-bold">{influencer.follower_count?.toLocaleString()}</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-slate-900">Engagement Rate</div>
                  <div className="text-green-600 font-bold">{influencer.engagement_rate}%</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Send className="w-4 h-4 mr-2" />
                Launch Campaign
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}