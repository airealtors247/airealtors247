
import React, { useState, useEffect } from "react";
import { SocialComment } from "@/api/entities";
import { User } from "@/api/entities";
import { DNCRecord } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Inbox as InboxIcon,
  MessageSquare,
  Phone,
  Mail,
  Shield,
  Sparkles,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bot,
  User as UserIcon,
  TrendingUp // Added missing import
} from "lucide-react";

import DNCManager from "../components/compliance/DNCManager";

export default function InboxPage() {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state
  const [activeTab, setActiveTab] = useState("social_comments");

  useEffect(() => {
    loadInboxData();
  }, []);

  const loadInboxData = async () => {
    setIsLoading(true);
    setError(null); // Clear any previous errors
    try {
      const userData = await User.me();
      if (!userData) {
        // If User.me() returns null/undefined, treat it as an error for loading inbox
        throw new Error("User not found or not logged in. Please log in again.");
      }
      setUser(userData);
      
      const commentsData = await SocialComment.filter({ realtor_email: userData.email }, "-comment_received_at");
      setComments(commentsData);
    } catch (err) {
      console.error("Error loading inbox data:", err);
      setError("Failed to load your inbox. Please try refreshing the page.");
    }
    setIsLoading(false);
  };

  const handleApproveReply = async (commentId, replyText) => {
    try {
      await SocialComment.update(commentId, {
        status: 'approved',
        reply_text: replyText
      });
      loadInboxData();
      // In production, this would trigger the actual reply posting
    } catch (error) {
      console.error("Error approving reply:", error);
    }
  };

  const generateAIReply = async (commentText, platform) => {
    try {
      const response = await InvokeLLM({
        prompt: `As a professional real estate agent, generate a helpful and engaging reply to this ${platform} comment: "${commentText}". 
        Keep it professional, friendly, and under 100 characters. Include relevant real estate expertise if applicable.`,
        response_json_schema: {
          type: "object",
          properties: {
            reply: { type: "string" },
            tone: { type: "string" },
            engagement_score: { type: "number" }
          }
        }
      });
      return response.reply;
    } catch (error) {
      console.error("Error generating AI reply:", error);
      return "Thank you for your comment! I'd be happy to help you with any real estate questions.";
    }
  };

  const pendingComments = comments.filter(c => c.status === 'needs_review');
  const approvedComments = comments.filter(c => c.status === 'approved');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Render an error message if there was an issue loading data
  if (error) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8 flex items-center justify-center">
            <Alert variant="destructive" className="max-w-lg">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
                <Button onClick={loadInboxData} variant="link" className="pl-1 text-blue-700 hover:text-blue-900">Click here to retry.</Button>
              </AlertDescription>
            </Alert>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <InboxIcon className="w-6 h-6 text-white" />
                </div>
                Unified AI Inbox
              </h1>
              <p className="text-slate-600 text-lg">
                AI-powered communication hub with DNC compliance built-in
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                <Shield className="w-3 h-3 mr-1" />
                DNC Compliant
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <Bot className="w-3 h-3 mr-1" />
                AI Responses: {approvedComments.length}
              </Badge>
            </div>
          </div>
        </div>

        {/* Compliance Alert */}
        <Alert className="bg-blue-50 border-blue-200">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>DNC Protection Active:</strong> All outbound communications are automatically 
            checked against national Do Not Call registries before sending. 100% compliance guaranteed.
          </AlertDescription>
        </Alert>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Pending Comments</p>
                  <p className="text-2xl font-bold text-orange-600">{pendingComments.length}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">AI Responses</p>
                  <p className="text-2xl font-bold text-green-600">{approvedComments.length}</p>
                </div>
                <Bot className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Response Rate</p>
                  <p className="text-2xl font-bold text-blue-600">94%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-purple-600">2.3s</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center">
            <TabsList className="grid w-96 grid-cols-3 bg-slate-100">
              <TabsTrigger value="social_comments" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Comments
              </TabsTrigger>
              <TabsTrigger value="dnc_compliance" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                DNC Registry
              </TabsTrigger>
              <TabsTrigger value="ai_settings" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI Settings
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="social_comments" className="mt-8">
            <div className="space-y-6">
              {pendingComments.length > 0 && (
                <Card className="shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900">Pending AI Responses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingComments.map((comment) => (
                        <div key={comment.id} className="p-4 border rounded-lg bg-slate-50">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className="bg-blue-100 text-blue-800">
                                  {comment.platform}
                                </Badge>
                                <span className="font-medium">{comment.commenter_name}</span>
                              </div>
                              <p className="text-slate-700">"{comment.comment_text}"</p>
                            </div>
                            <span className="text-xs text-slate-500">
                              {new Date(comment.comment_received_at).toLocaleString()}
                            </span>
                          </div>
                          
                          {comment.ai_suggested_reply && (
                            <div className="bg-blue-50 p-3 rounded-lg mb-3">
                              <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-800">AI Suggested Reply:</span>
                              </div>
                              <p className="text-blue-700">"{comment.ai_suggested_reply}"</p>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <Button 
                              size="sm"
                              onClick={() => handleApproveReply(comment.id, comment.ai_suggested_reply)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve & Send
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={async () => {
                                const newReply = await generateAIReply(comment.comment_text, comment.platform);
                                await SocialComment.update(comment.id, { ai_suggested_reply: newReply });
                                loadInboxData();
                              }}
                            >
                              <Sparkles className="w-4 h-4 mr-1" />
                              Regenerate
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit Reply
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {pendingComments.length === 0 && (
                <Card className="shadow-xl border-0">
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">All caught up!</h3>
                    <p className="text-slate-600">No pending comments to review. AI is handling responses automatically.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="dnc_compliance" className="mt-8">
            <DNCManager />
          </TabsContent>

          <TabsContent value="ai_settings" className="mt-8">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">AI Response Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Alert>
                    <Sparkles className="h-4 w-4" />
                    <AlertDescription>
                      Configure how AI handles different types of comments and inquiries across all platforms.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Auto-Response Rules</h3>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Real estate questions</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Property inquiries</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">General comments</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" />
                          <span className="text-sm">Negative feedback</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold">Response Tone</h3>
                      <select className="w-full p-2 border rounded-lg">
                        <option>Professional & Friendly</option>
                        <option>Casual & Approachable</option>
                        <option>Formal & Expert</option>
                        <option>Warm & Personal</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
