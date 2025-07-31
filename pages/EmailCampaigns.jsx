import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { EmailSequence } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Send, 
  Users, 
  TrendingUp,
  Eye,
  MousePointer,
  Plus,
  Play,
  Pause,
  Edit
} from "lucide-react";

export default function EmailCampaignsPage() {
  const [user, setUser] = useState(null);
  const [sequences, setSequences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, sequencesData] = await Promise.all([
        User.me(),
        EmailSequence.list("-created_date")
      ]);
      
      setUser(userData);
      setSequences(sequencesData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                Email Campaigns
              </h1>
              <p className="text-slate-600 text-lg">
                AI-powered email sequences that nurture leads automatically
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Emails Sent</p>
                  <p className="text-2xl font-bold text-purple-600">2,847</p>
                </div>
                <Send className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Open Rate</p>
                  <p className="text-2xl font-bold text-blue-600">68%</p>
                </div>
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Click Rate</p>
                  <p className="text-2xl font-bold text-green-600">24%</p>
                </div>
                <MousePointer className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Responses</p>
                  <p className="text-2xl font-bold text-amber-600">197</p>
                </div>
                <Users className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email Sequences */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Active Email Sequences</CardTitle>
          </CardHeader>
          <CardContent>
            {sequences.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No email campaigns yet</h3>
                <p className="text-slate-600 mb-4">Create your first AI-powered email sequence</p>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Campaign
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  {
                    name: "New Lead Welcome Series",
                    type: "nurture",
                    status: "active",
                    subscribers: 245,
                    openRate: 72,
                    clickRate: 18
                  },
                  {
                    name: "Holiday Market Update",
                    type: "market_update",
                    status: "scheduled",
                    subscribers: 892,
                    openRate: 64,
                    clickRate: 22
                  },
                  {
                    name: "First-Time Buyer Guide",
                    type: "nurture",
                    status: "active",
                    subscribers: 156,
                    openRate: 78,
                    clickRate: 31
                  }
                ].map((sequence, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{sequence.name}</h3>
                        <p className="text-sm text-slate-600 capitalize">{sequence.type.replace('_', ' ')}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-sm text-slate-600">Subscribers</p>
                        <p className="font-semibold">{sequence.subscribers}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-slate-600">Open Rate</p>
                        <p className="font-semibold text-blue-600">{sequence.openRate}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-slate-600">Click Rate</p>
                        <p className="font-semibold text-green-600">{sequence.clickRate}%</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={
                          sequence.status === 'active' ? 'bg-green-100 text-green-800' :
                          sequence.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {sequence.status}
                        </Badge>
                        
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={sequence.status === 'active' ? 'text-red-600' : 'text-green-600'}
                        >
                          {sequence.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Templates */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>AI Email Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "New Lead Welcome", description: "Warm welcome sequence for new prospects", emails: 5 },
                { name: "Market Update Series", description: "Monthly market insights for your database", emails: 3 },
                { name: "Listing Promotion", description: "Showcase your new listings", emails: 4 },
                { name: "Holiday Greetings", description: "Seasonal touchpoints with your network", emails: 6 },
                { name: "First-Time Buyer Guide", description: "Educational series for new buyers", emails: 8 },
                { name: "Seller Preparation", description: "Help sellers prepare their home", emails: 7 }
              ].map((template, index) => (
                <Card key={index} className="border hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{template.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{template.emails} emails</Badge>
                      <Button size="sm">Use Template</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}