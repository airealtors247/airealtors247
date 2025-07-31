import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Lead } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Play, 
  Pause, 
  Users, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Mic,
  Volume2,
  Settings
} from "lucide-react";

export default function VoiceOutboundPage() {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCalls, setActiveCalls] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, leadsData] = await Promise.all([
        User.me(),
        Lead.filter({ status: 'new' }, '-created_date', 20)
      ]);
      
      setUser(userData);
      setLeads(leadsData);
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
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                Voice AI - Outbound Caller
              </h1>
              <p className="text-slate-600 text-lg">
                AI-powered outbound calling system that sounds 100% human
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                <Mic className="w-3 h-3 mr-1" />
                AI Voice Active
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <Phone className="w-3 h-3 mr-1" />
                {user?.voice_minutes_remaining || 0} minutes left
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
                  <p className="text-2xl font-bold text-green-600">24</p>
                </div>
                <Phone className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Connected</p>
                  <p className="text-2xl font-bold text-blue-600">18</p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Appointments</p>
                  <p className="text-2xl font-bold text-purple-600">7</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Success Rate</p>
                  <p className="text-2xl font-bold text-amber-600">29%</p>
                </div>
                <Volume2 className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Caller Control */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
              <Mic className="w-5 h-5" />
              AI Caller Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Call Queue ({leads.length} leads)</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {leads.slice(0, 10).map((lead, index) => (
                    <div key={lead.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium">{lead.first_name} {lead.last_name}</p>
                        <p className="text-sm text-slate-600">{lead.phone}</p>
                      </div>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Call Script</h3>
                <Textarea 
                  placeholder="Hi, this is Sarah from [Brokerage]. I noticed you were interested in properties in [City]. I have some exclusive listings that might interest you. Do you have 2 minutes to chat?"
                  rows={6}
                  className="w-full"
                />
                <div className="flex gap-3">
                  <Button className="bg-green-600 hover:bg-green-700 flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Start AI Calling
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Calls */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Recent Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1,2,3,4,5].map((_, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">John Smith</p>
                      <p className="text-sm text-slate-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    <p className="text-sm text-slate-500 mt-1">2:34 duration</p>
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