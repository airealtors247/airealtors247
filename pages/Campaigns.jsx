import React, { useState, useEffect } from "react";
import { Campaign } from "@/api/entities";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target,
  Plus,
  Play,
  Pause,
  Calendar,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Zap,
  Mail,
  Phone,
  Share2
} from "lucide-react";

import CampaignStats from "../components/campaigns/CampaignStats";
import CampaignGrid from "../components/campaigns/CampaignGrid";
import CampaignForm from "../components/campaigns/CampaignForm";
import CampaignAnalytics from "../components/campaigns/CampaignAnalytics";

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-800", icon: Calendar },
  scheduled: { label: "Scheduled", color: "bg-blue-100 text-blue-800", icon: Calendar },
  active: { label: "Active", color: "bg-green-100 text-green-800", icon: Play },
  paused: { label: "Paused", color: "bg-yellow-100 text-yellow-800", icon: Pause },
  completed: { label: "Completed", color: "bg-purple-100 text-purple-800", icon: Activity }
};

const campaignTypes = {
  social_media: { label: "Social Media", icon: Share2, color: "text-blue-600" },
  email: { label: "Email Marketing", icon: Mail, color: "text-green-600" },
  voice_call: { label: "Voice Calling", icon: Phone, color: "text-purple-600" },
  mixed: { label: "Multi-Channel", icon: Zap, color: "text-orange-600" }
};

export default function CampaignsPage() {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const [userData, campaignsData] = await Promise.all([
        User.me(),
        Campaign.list("-created_date")
      ]);
      
      setUser(userData);
      setCampaigns(campaignsData);
    } catch (error) {
      console.error("Error loading campaigns:", error);
    }
    setIsLoading(false);
  };

  const handleCreateCampaign = async (campaignData) => {
    try {
      await Campaign.create(campaignData);
      setShowForm(false);
      setEditingCampaign(null);
      loadCampaigns();
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  const handleUpdateCampaign = async (campaignId, updates) => {
    try {
      await Campaign.update(campaignId, updates);
      loadCampaigns();
    } catch (error) {
      console.error("Error updating campaign:", error);
    }
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setShowForm(true);
  };

  const handleStatusChange = async (campaign, newStatus) => {
    await handleUpdateCampaign(campaign.id, { status: newStatus });
  };

  const calculateStats = () => {
    const totalCampaigns = campaigns.length;
    const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
    const totalLeads = campaigns.reduce((sum, c) => sum + (c.metrics?.leads_generated || 0), 0);
    const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);
    const avgConversion = campaigns.length > 0 
      ? campaigns.reduce((sum, c) => sum + (c.metrics?.conversion_rate || 0), 0) / campaigns.length
      : 0;

    return {
      totalCampaigns,
      activeCampaigns,
      totalLeads,
      totalBudget,
      avgConversion: avgConversion.toFixed(1)
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                Campaign Management
              </h1>
              <p className="text-slate-600 text-lg">
                Create and manage multi-channel marketing campaigns to generate leads
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Campaign Stats */}
        <CampaignStats stats={stats} />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center">
            <TabsList className="grid w-96 grid-cols-3 bg-slate-100">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Campaigns
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Templates
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-8">
            <CampaignGrid 
              campaigns={campaigns}
              statusConfig={statusConfig}
              campaignTypes={campaignTypes}
              onEdit={handleEditCampaign}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <CampaignAnalytics campaigns={campaigns} />
          </TabsContent>

          <TabsContent value="templates" className="mt-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">Campaign Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(campaignTypes).map(([type, config]) => (
                    <Card key={type} className="hover:shadow-lg transition-shadow duration-200 cursor-pointer border border-slate-200">
                      <CardContent className="p-6 text-center">
                        <config.icon className={`w-12 h-12 mx-auto mb-4 ${config.color}`} />
                        <h3 className="font-semibold text-slate-900 mb-2">{config.label}</h3>
                        <p className="text-sm text-slate-600 mb-4">
                          Start a {config.label.toLowerCase()} campaign with optimized settings
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setEditingCampaign({ type });
                            setShowForm(true);
                          }}
                        >
                          Use Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Campaign Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CampaignForm
                campaign={editingCampaign}
                onSubmit={handleCreateCampaign}
                onCancel={() => {
                  setShowForm(false);
                  setEditingCampaign(null);
                }}
                campaignTypes={campaignTypes}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}