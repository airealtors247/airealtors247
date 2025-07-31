import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle2, 
  Circle, 
  AlertTriangle,
  Users,
  Zap,
  Settings,
  Rocket
} from 'lucide-react';

export default function PreLaunchChecklist({ user }) {
  const [checkedItems, setCheckedItems] = useState(new Set());

  const checklistItems = [
    {
      id: 'email_templates',
      title: 'Email/SMS Invite Templates Ready',
      description: 'AI-generated messages for contact outreach',
      status: 'complete',
      category: 'messaging'
    },
    {
      id: 'referral_links',
      title: 'Personal Referral Link Generated',
      description: `https://aigroup247.com/invite/${user.referral_code}`,
      status: 'complete',
      category: 'tracking'
    },
    {
      id: 'credit_tracker',
      title: 'Credit Tracking System Active',
      description: 'Earn 100 credits per paid referral conversion',
      status: 'complete',
      category: 'rewards'
    },
    {
      id: 'blast_confirm',
      title: 'Contact Blast Confirmation UI',
      description: 'Safety check before mass outreach',
      status: 'complete',
      category: 'safety'
    },
    {
      id: 'credit_burn',
      title: 'Credit Redemption System',
      description: 'Use credits for AI minutes, premium features, leads',
      status: 'active',
      category: 'rewards'
    },
    {
      id: 'compliance_check',
      title: 'Legal Compliance Verification',
      description: 'GDPR, CAN-SPAM, TCPA compliance built-in',
      status: 'active',
      category: 'legal'
    }
  ];

  const creditRedemptionOptions = [
    { item: 'AI Voice Minutes', cost: '1 credit = 1 minute', icon: '🎙️' },
    { item: 'Premium AI Features', cost: '50 credits = 1 month', icon: '✨' },
    { item: 'Verified Lead Data', cost: '5 credits = 1 lead', icon: '📊' },
    { item: 'Advanced Analytics', cost: '25 credits = 1 month', icon: '📈' },
    { item: 'White-label Branding', cost: '100 credits = 1 month', icon: '🏷️' },
    { item: 'Priority Support', cost: '20 credits = 1 month', icon: '⚡' }
  ];

  const toggleCheck = (itemId) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const completionPercentage = Math.round(
    (checklistItems.filter(item => item.status === 'complete').length / checklistItems.length) * 100
  );

  return (
    <div className="space-y-6">
      {/* Launch Readiness Status */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <Rocket className="w-6 h-6" />
            Viral Engine Launch Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-green-800">{completionPercentage}% Ready</span>
            <Badge className="bg-green-600 text-white">
              {completionPercentage === 100 ? 'LAUNCH READY! 🚀' : 'Almost There'}
            </Badge>
          </div>
          <div className="w-full bg-green-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* System Components Checklist */}
      <Card>
        <CardHeader>
          <CardTitle>System Components Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checklistItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 border rounded-lg">
                {item.status === 'complete' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-yellow-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <Badge 
                    variant="outline" 
                    className="mt-2 text-xs"
                  >
                    {item.category}
                  </Badge>
                </div>
                <Badge 
                  className={
                    item.status === 'complete' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }
                >
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Credit Burn System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Credit Redemption Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {creditRedemptionOptions.map((option, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <span className="text-2xl">{option.icon}</span>
                <div>
                  <h4 className="font-semibold">{option.item}</h4>
                  <p className="text-sm text-gray-600">{option.cost}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Final Launch Button */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">Ready to Go Viral? 🚀</h3>
          <p className="mb-6 opacity-90">
            Your viral referral engine is locked and loaded. Every user becomes a growth multiplier.
          </p>
          <Button 
            size="lg" 
            className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-bold text-lg px-8 py-3"
          >
            <Users className="w-6 h-6 mr-2" />
            ACTIVATE VIRAL ENGINE
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}