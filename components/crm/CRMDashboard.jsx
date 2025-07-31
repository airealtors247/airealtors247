import React, { useState, useEffect } from 'react';
import { Contact } from '@/api/entities';
import { Deal } from '@/api/entities';
import { CommunicationLog } from '@/api/entities';
import { User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Target,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  DollarSign,
  Activity,
  Plus
} from "lucide-react";

export default function CRMDashboard({ user }) {
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    totalContacts: 0,
    activeDeals: 0,
    dealValue: 0,
    conversionRate: 0
  });

  useEffect(() => {
    loadCRMData();
  }, []);

  const loadCRMData = async () => {
    try {
      const [contactsData, dealsData, activityData] = await Promise.all([
        Contact.filter({ realtor_email: user.email }, '-created_date', 100),
        Deal.filter({ realtor_email: user.email }, '-created_date', 50),
        CommunicationLog.filter({ realtor_email: user.email }, '-timestamp', 20)
      ]);

      setContacts(contactsData);
      setDeals(dealsData);
      setRecentActivity(activityData);

      // Calculate stats
      const activeDeals = dealsData.filter(d => !['closed_won', 'closed_lost'].includes(d.stage));
      const totalDealValue = activeDeals.reduce((sum, deal) => sum + (deal.deal_value || 0), 0);
      const closedWon = dealsData.filter(d => d.stage === 'closed_won').length;
      const conversionRate = dealsData.length > 0 ? (closedWon / dealsData.length * 100).toFixed(1) : 0;

      setStats({
        totalContacts: contactsData.length,
        activeDeals: activeDeals.length,
        dealValue: totalDealValue,
        conversionRate
      });
    } catch (error) {
      console.error("Error loading CRM data:", error);
    }
  };

  const getStageColor = (stage) => {
    const colors = {
      prospect: "bg-gray-100 text-gray-800",
      qualified: "bg-blue-100 text-blue-800",
      presentation: "bg-yellow-100 text-yellow-800",
      negotiation: "bg-orange-100 text-orange-800",
      contract: "bg-purple-100 text-purple-800",
      closing: "bg-indigo-100 text-indigo-800",
      closed_won: "bg-green-100 text-green-800",
      closed_lost: "bg-red-100 text-red-800"
    };
    return colors[stage] || colors.prospect;
  };

  return (
    <div className="space-y-6">
      {/* CRM Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Contacts</p>
                <p className="text-2xl font-bold text-slate-900">{stats.totalContacts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Deals</p>
                <p className="text-2xl font-bold text-slate-900">{stats.activeDeals}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pipeline Value</p>
                <p className="text-2xl font-bold text-slate-900">${stats.dealValue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-slate-900">{stats.conversionRate}%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="deals" className="w-full">
        <TabsList>
          <TabsTrigger value="deals">Active Deals</TabsTrigger>
          <TabsTrigger value="contacts">Recent Contacts</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="deals" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Active Deals Pipeline</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Deal
            </Button>
          </div>
          
          <div className="space-y-3">
            {deals.filter(deal => !['closed_won', 'closed_lost'].includes(deal.stage)).map((deal) => (
              <Card key={deal.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-slate-900">{deal.deal_name}</h4>
                      <p className="text-sm text-slate-600">{deal.property_address}</p>
                      <p className="text-sm text-slate-500">Expected: {deal.expected_close_date}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getStageColor(deal.stage)}>
                        {deal.stage.replace('_', ' ')}
                      </Badge>
                      <p className="text-sm font-semibold text-slate-900 mt-1">
                        ${deal.deal_value?.toLocaleString() || 'TBD'}
                      </p>
                      <p className="text-xs text-slate-500">{deal.probability}% probability</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent Contacts</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Contact
            </Button>
          </div>
          
          <div className="space-y-3">
            {contacts.slice(0, 10).map((contact) => (
              <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {contact.first_name} {contact.last_name}
                      </h4>
                      <div className="flex items-center gap-4 mt-1">
                        {contact.email && (
                          <span className="text-sm text-slate-600 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {contact.email}
                          </span>
                        )}
                        {contact.phone && (
                          <span className="text-sm text-slate-600 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {contact.phone}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`bg-${contact.lead_status === 'hot' ? 'red' : contact.lead_status === 'warm' ? 'yellow' : 'blue'}-100 text-${contact.lead_status === 'hot' ? 'red' : contact.lead_status === 'warm' ? 'yellow' : 'blue'}-800`}>
                        {contact.lead_status}
                      </Badge>
                      <p className="text-xs text-slate-500 mt-1">{contact.contact_type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <Card key={activity.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {activity.communication_type === 'email' && <Mail className="w-4 h-4 text-blue-600" />}
                      {activity.communication_type === 'phone_call' && <Phone className="w-4 h-4 text-blue-600" />}
                      {activity.communication_type === 'meeting' && <Calendar className="w-4 h-4 text-blue-600" />}
                      {!['email', 'phone_call', 'meeting'].includes(activity.communication_type) && <Activity className="w-4 h-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">
                        {activity.communication_type.replace('_', ' ')} - {activity.subject}
                      </p>
                      <p className="text-sm text-slate-600">{activity.content?.substring(0, 100)}...</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}