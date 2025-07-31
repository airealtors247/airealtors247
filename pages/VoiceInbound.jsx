import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  PhoneCall, 
  Clock, 
  CheckCircle,
  Users,
  Calendar,
  MapPin,
  Star,
  Settings,
  Mic
} from "lucide-react";

export default function VoiceInboundPage() {
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <PhoneCall className="w-6 h-6 text-white" />
                </div>
                Voice AI - Inbound Receptionist
              </h1>
              <p className="text-slate-600 text-lg">
                24/7 AI receptionist that handles all your incoming calls professionally
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                <PhoneCall className="w-3 h-3 mr-1" />
                Online 24/7
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <Mic className="w-3 h-3 mr-1" />
                AI Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Calls Today</p>
                  <p className="text-2xl font-bold text-blue-600">43</p>
                </div>
                <PhoneCall className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Appointments Set</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <Calendar className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Leads Captured</p>
                  <p className="text-2xl font-bold text-purple-600">28</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-amber-600">4.9</p>
                </div>
                <Star className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Configuration */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">AI Receptionist Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Business Name</label>
                  <Input value={user?.brokerage_name || ""} placeholder="Your Brokerage Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">AI Voice Personality</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Professional & Friendly</option>
                    <option>Warm & Personal</option>
                    <option>Authoritative & Expert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Phone Number</label>
                  <Input value={user?.mobile_phone || ""} placeholder="+1 (555) 123-4567" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Service Areas</label>
                  <Input placeholder="Beverly Hills, West Hollywood, Santa Monica" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Specializations</label>
                  <Input placeholder="Luxury homes, First-time buyers, Investment properties" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Update AI Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Calls */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Recent Inbound Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Johnson", phone: "+1 (555) 987-6543", outcome: "Appointment Scheduled", time: "2:15 PM", duration: "4:22" },
                { name: "Mike Chen", phone: "+1 (555) 876-5432", outcome: "Info Requested", time: "1:45 PM", duration: "2:18" },
                { name: "Lisa Garcia", phone: "+1 (555) 765-4321", outcome: "Callback Requested", time: "12:30 PM", duration: "3:45" },
                { name: "David Kim", phone: "+1 (555) 654-3210", outcome: "Appointment Scheduled", time: "11:20 AM", duration: "5:12" },
                { name: "Emma Wilson", phone: "+1 (555) 543-2109", outcome: "Lead Captured", time: "10:15 AM", duration: "3:28" }
              ].map((call, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <PhoneCall className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{call.name}</p>
                      <p className="text-sm text-slate-600">{call.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={
                      call.outcome === 'Appointment Scheduled' ? 'bg-green-100 text-green-800' :
                      call.outcome === 'Lead Captured' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {call.outcome}
                    </Badge>
                    <p className="text-sm text-slate-500 mt-1">{call.time} • {call.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}