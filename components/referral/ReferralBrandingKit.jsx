import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Medal, 
  Star, 
  Trophy,
  Copy,
  Download,
  Share2
} from 'lucide-react';

export default function ReferralBrandingKit({ user }) {
  const shareTemplates = [
    {
      id: 'business_power',
      template: `🚨 Just launched something HUGE for my real estate business!

I'm now using AI to get daily leads, book appointments, and grow faster than ever.  
📊 All automated with AI Realtors 247!

If you're in real estate and want this too, join me:  
👉 https://aigroup247.com/invite/${user.referral_code}

Let's crush it together! 🔥`,
      platforms: ['LinkedIn', 'Facebook', 'Instagram']
    },
    {
      id: 'success_story',
      template: `💰 UPDATE: My AI assistant just booked 3 more appointments while I slept 😴

This is game-changing for real estate agents.

Want the same results? Join me on AI Realtors 247:
👉 https://aigroup247.com/invite/${user.referral_code}

(You'll get 100 free credits when you upgrade) 🎁`,
      platforms: ['Facebook', 'Instagram', 'Twitter']
    },
    {
      id: 'professional',
      template: `Excited to share that I've integrated AI automation into my real estate practice 🏡

The results speak for themselves:
✅ 24/7 lead capture
✅ Automated follow-up
✅ AI-powered marketing

Fellow realtors, check it out: https://aigroup247.com/invite/${user.referral_code}`,
      platforms: ['LinkedIn']
    }
  ];

  const badgeKit = [
    { level: 'Gold Partner', icon: Crown, color: 'text-yellow-500', requirement: '50+ referrals' },
    { level: 'Silver Pro', icon: Medal, color: 'text-gray-400', requirement: '25+ referrals' },
    { level: 'Bronze Star', icon: Star, color: 'text-amber-600', requirement: '10+ referrals' },
    { level: 'Rising Referrer', icon: Trophy, color: 'text-green-600', requirement: '5+ referrals' }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Show toast notification
  };

  return (
    <div className="space-y-6">
      {/* Social Share Templates */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Ready-to-Post Social Templates
          </h3>
          <div className="space-y-4">
            {shareTemplates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-2">
                    {template.platforms.map(platform => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(template.template)}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="bg-gray-50 p-3 rounded text-sm whitespace-pre-line">
                  {template.template}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Badge Showcase */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Your Referral Status Badges</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badgeKit.map((badge) => {
              const BadgeIcon = badge.icon;
              return (
                <div key={badge.level} className="text-center p-4 border rounded-lg">
                  <BadgeIcon className={`w-8 h-8 mx-auto mb-2 ${badge.color}`} />
                  <h4 className="font-semibold text-sm">{badge.level}</h4>
                  <p className="text-xs text-gray-500">{badge.requirement}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats for Social Proof */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4">Share Your Success</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{user.total_referral_earnings_credits || 0}</div>
              <div className="text-sm opacity-80">Credits Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-80">AI Working</div>
            </div>
            <div>
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm opacity-80">AI Tools</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}