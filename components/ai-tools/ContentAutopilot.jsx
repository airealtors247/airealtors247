import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { User } from "@/api/entities";
import { GeneratedContent } from "@/api/entities";
import ComplianceChecklist from "./ComplianceChecklist";
import {
  Check,
  X,
  History,
  Settings,
  Sparkles,
  FileText,
  Video,
  Instagram,
  ShieldCheck,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

// Mock data to simulate the AI engine's output
const mockContent = [
  {
    id: 1,
    title: "5 Tips to Sell Your Beverly Hills Home 10% Above Market",
    content_type: "article",
    credit_cost: 10,
    target_platform: "blog",
    compliance_report: {
      legal_check: "pass",
      platform_rules_check: "pass",
      fair_housing_check: "pass",
      uniqueness_score: 98,
      summary: "Article is compliant and highly unique."
    },
    content_body: "Discover insider secrets to maximize your home's value in the competitive Beverly Hills market. From staging to negotiation, we cover it all..."
  },
  {
    id: 2,
    title: "Luxury Condo Tour: The Century",
    content_type: "video_script",
    credit_cost: 25,
    target_platform: "youtube",
    compliance_report: {
      legal_check: "pass",
      platform_rules_check: "pass",
      fair_housing_check: "pass",
      uniqueness_score: 100,
      summary: "Video script is compliant and ready for production."
    },
    content_body: "VO: Welcome to The Century, an icon of luxury living. Let's explore this stunning 3-bedroom unit with panoramic views of Los Angeles..."
  },
  {
    id: 3,
    title: "Just Listed in 90210!",
    content_type: "social_post_image",
    credit_cost: 5,
    target_platform: "instagram",
    compliance_report: {
      legal_check: "pass",
      platform_rules_check: "pass",
      fair_housing_check: "pass",
      uniqueness_score: 95,
      summary: "Image post is compliant and ready."
    },
    content_body: "Stunning 4-bed, 5-bath modern villa. Your dream home awaits! #BeverlyHillsRealEstate #LuxuryLiving #JustListed"
  }
];

export default function ContentAutopilot({ user, onUpdateUser }) {
  const [pendingContent, setPendingContent] = useState(mockContent);
  const [publishedContent, setPublishedContent] = useState([]);
  const [autoApprove, setAutoApprove] = useState(user?.auto_approve_waiver || false);

  const handleApprove = (content) => {
    // Simulate API call
    setPendingContent(pendingContent.filter(c => c.id !== content.id));
    setPublishedContent([content, ...publishedContent]);
    const newCredits = user.credits_remaining - content.credit_cost;
    onUpdateUser({ ...user, credits_remaining: newCredits });
  };

  const handleReject = (content) => {
    // Simulate API call
    setPendingContent(pendingContent.filter(c => c.id !== content.id));
    // Optionally move to a "rejected" tab
  };

  const handleWaiverChange = (checked) => {
    if (checked && !window.confirm("Are you sure? By enabling this, all AI-generated content will be published automatically without your review. You waive your right to approve content beforehand.")) {
      return;
    }
    setAutoApprove(checked);
    onUpdateUser({ 
      ...user, 
      auto_approve_waiver: checked,
      waiver_signature_date: checked ? new Date().toISOString() : null
    });
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            AI Content Autopilot
          </CardTitle>
          <div className="text-right">
            <div className="font-bold text-lg text-blue-600">{user?.credits_remaining}</div>
            <div className="text-xs text-slate-500">Credits Remaining</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="approval">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="approval">
              Pending Approval ({pendingContent.length})
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="w-4 h-4 mr-2" />
              Published History
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="approval" className="mt-6">
            <div className="space-y-6">
              {pendingContent.map(content => (
                <Card key={content.id} className="border-slate-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="secondary" className="mb-2 capitalize">{content.target_platform}</Badge>
                        <h3 className="font-semibold text-lg">{content.title}</h3>
                        <p className="text-sm text-slate-500 capitalize">{content.content_type.replace('_', ' ')}</p>
                      </div>
                      <Badge>Cost: {content.credit_cost} Credits</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg">{content.content_body}</p>
                    <ComplianceChecklist report={content.compliance_report} />
                    <div className="flex gap-4">
                      <Button onClick={() => handleApprove(content)} className="flex-1 bg-green-600 hover:bg-green-700">
                        <Check className="w-4 h-4 mr-2" /> Approve & Publish
                      </Button>
                      <Button onClick={() => handleReject(content)} variant="destructive" className="flex-1">
                        <X className="w-4 h-4 mr-2" /> Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {pendingContent.length === 0 && (
                <div className="text-center py-12 text-slate-500">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <p className="text-lg font-medium">All caught up!</p>
                  <p>Your approval queue is empty. New content will appear here.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            {/* History content would go here, mapped from `publishedContent` */}
            <p className="text-center text-slate-500 py-8">Published content history will appear here.</p>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card className="bg-amber-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-900">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Automatic Publishing Waiver
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 rounded-md border p-4 bg-white">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Enable Auto-Approval
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Automatically publish all compliant content without manual review.
                    </p>
                  </div>
                  <Switch
                    checked={autoApprove}
                    onCheckedChange={handleWaiverChange}
                  />
                </div>
                <p className="text-xs text-amber-800">
                  <strong>Warning:</strong> By enabling this, you accept full responsibility for all content published to your accounts. You waive the right to manually approve each post. This action will be recorded with a timestamp.
                </p>
                {user?.auto_approve_waiver && (
                  <p className="text-xs text-green-700 font-semibold">
                    Waiver activated on: {new Date(user.waiver_signature_date).toLocaleString()}
                  </p>
                )}
              </CardContent>
            </Card>
            <div className="mt-6">
              <Button>Buy More Credits</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}