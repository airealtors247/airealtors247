import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Send, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  Play,
  Pause,
  Settings
} from "lucide-react";

export default function SMSCampaignsPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
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
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                SMS Campaigns
              </h1>
              <p className="text-slate-600 text-lg">
                High-converting text message campaigns with 98% open rates
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Create SMS Campaign
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
                  <p className="text-sm text-slate-600">Messages Sent</p>
                  <p className="text-2xl font-bold text-green-600">1,234</p>
                </div>
                <Send className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Open Rate</p>
                  <p className="text-2xl font-bold text-blue-600">98%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Response Rate</p>
                  <p className="text-2xl font-bold text-purple-600">34%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Subscribers</p>
                  <p className="text-2xl font-bold text-amber-600">567</p>
                </div>
                <Users className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Send */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Quick Send SMS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Select Recipients</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>All Contacts (567)</option>
                    <option>Active Leads (89)</option>
                    <option>Past Clients (234)</option>
                    <option>Sphere of Influence (345)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message ({160 - 0} chars remaining)</label>
                  <Textarea 
                    placeholder="Hi {firstName}, just wanted to check in! Any real estate questions? Reply STOP to opt out."
                    rows={4}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-3">
                  <Button className="bg-green-600 hover:bg-green-700 flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </Button>
                  <Button variant="outline">
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">SMS Best Practices</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="text-sm space-y-2">
                    <li>✓ Keep messages under 160 characters</li>
                    <li>✓ Always include opt-out instructions</li>
                    <li>✓ Send during business hours (9 AM - 6 PM)</li>
                    <li>✓ Personalize with recipient's name</li>
                    <li>✓ Include clear call-to-action</li>
                    <li>✓ Follow up on responses quickly</li>
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Compliance:</strong> Only send to contacts who have opted in to receive SMS messages.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Campaigns */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Active SMS Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Weekly Market Updates",
                  type: "recurring",
                  status: "active",
                  subscribers: 345,
                  lastSent: "Today at 9:00 AM",
                  responseRate: 28
                },
                {
                  name: "New Listing Alerts",
                  type: "automated",
                  status: "active",
                  subscribers: 167,
                  lastSent: "2 hours ago",
                  responseRate: 42
                },
                {
                  name: "Open House Reminders",
                  type: "scheduled",
                  status: "scheduled",
                  subscribers: 89,
                  lastSent: "Scheduled for Sunday 10 AM",
                  responseRate: 0
                }
              ].map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{campaign.name}</h3>
                      <p className="text-sm text-slate-600 capitalize">{campaign.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Subscribers</p>
                      <p className="font-semibold">{campaign.subscribers}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Response Rate</p>
                      <p className="font-semibold text-green-600">{campaign.responseRate}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Last Sent</p>
                      <p className="text-xs text-slate-500">{campaign.lastSent}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={
                        campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {campaign.status}
                      </Badge>
                      
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={campaign.status === 'active' ? 'text-red-600' : 'text-green-600'}
                      >
                        {campaign.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* SMS Templates */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>SMS Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "New Listing Alert", message: "🏠 New listing just hit the market in {city}! {price} - {bedrooms}BR/{bathrooms}BA. Want details? Reply YES!" },
                { name: "Market Update", message: "Hi {firstName}! {city} market update: Homes selling {trend}. Great time to {action}. Questions? Call me!" },
                { name: "Open House Reminder", message: "Reminder: Open house TODAY {time} at {address}. See you there! Reply STOP to opt out." },
                { name: "Price Reduction", message: "PRICE DROP! {address} reduced to {newPrice}. This won't last long. Want to see it? Reply YES!" },
                { name: "Holiday Greeting", message: "Happy {holiday} from {agentName}! Wishing you and your family a wonderful celebration. 🎉" },
                { name: "Check In", message: "Hi {firstName}! Just checking in - any real estate questions? I'm here to help! Reply STOP to opt out." }
              ].map((template, index) => (
                <Card key={index} className="border hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">{template.name}</h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">{template.message}</p>
                    <Button size="sm" className="w-full">Use Template</Button>
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