import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Influencer } from "@/api/entities";
import { InfluencerCampaign } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users2, 
  Search, 
  Mail, 
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Star,
  Globe,
  Sparkles
} from "lucide-react";

import InfluencerSearchForm from "../components/influencer/InfluencerSearchForm";
import InfluencerTable from "../components/influencer/InfluencerTable";
import InfluencerCampaignModal from "../components/influencer/InfluencerCampaignModal";

export default function InfluencerFinderPage() {
  const [user, setUser] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      
      // Load influencers safely
      try {
        const influencersData = await Influencer.list("-created_date");
        setInfluencers(influencersData || []);
      } catch (error) {
        console.warn("Could not load influencers:", error);
        setInfluencers([]);
      }
      
      // Load campaigns safely
      try {
        const campaignsData = await InfluencerCampaign.list("-created_date");
        setCampaigns(campaignsData || []);
      } catch (error) {
        console.warn("Could not load campaigns:", error);
        setCampaigns([]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleSearch = async (searchData) => {
    setIsSearching(true);
    try {
      // Simulate AI search - in real implementation, this would call an AI service
      const mockResults = [
        {
          name: "Sarah Johnson",
          platform: "instagram",
          follower_count: 25000,
          engagement_rate: 4.2,
          category: searchData.category,
          country: searchData.country,
          email: "sarah.johnson@email.com",
          profile_url: "https://instagram.com/sarahjohnson",
          bio: "Business coach helping entrepreneurs scale their ventures",
          verified: true,
          contact_info: {
            email: "sarah.johnson@email.com",
            website: "www.sarahjohnsoncoaching.com"
          }
        },
        {
          name: "Mike Rodriguez",
          platform: "linkedin",
          follower_count: 15000,
          engagement_rate: 6.1,
          category: searchData.category,
          country: searchData.country,
          email: "mike.rodriguez@email.com",
          profile_url: "https://linkedin.com/in/mikerodriguez",
          bio: "Sales trainer and business development expert",
          verified: false,
          contact_info: {
            email: "mike.rodriguez@email.com",
            phone: "+1-555-123-4567"
          }
        }
      ];

      // Save to database
      for (const result of mockResults) {
        try {
          await Influencer.create({
            ...result,
            search_query: `${searchData.category} in ${searchData.country}`,
            ai_score: Math.floor(Math.random() * 40) + 60 // 60-100
          });
        } catch (error) {
          console.warn("Could not create influencer:", error);
        }
      }

      await loadData(); // Reload to show new results
    } catch (error) {
      console.error("Error searching influencers:", error);
    }
    setIsSearching(false);
  };

  const handleStartCampaign = (influencer) => {
    setSelectedInfluencer(influencer);
    setShowCampaignModal(true);
  };

  const handleCampaignSubmit = async (campaignData) => {
    try {
      await InfluencerCampaign.create({
        influencer_id: selectedInfluencer.id,
        campaign_name: campaignData.campaignName,
        message_template: campaignData.messageTemplate,
        offer_details: campaignData.offerDetails,
        credits_offered: campaignData.creditsOffered,
        status: 'draft'
      });
      
      setShowCampaignModal(false);
      setSelectedInfluencer(null);
      await loadData();
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
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
                  <Users2 className="w-6 h-6 text-white" />
                </div>
                Influencer AI
              </h1>
              <p className="text-slate-600 text-lg">
                Find and recruit brand ambassadors with AI-powered search and outreach
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-100 text-purple-800">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <Globe className="w-3 h-3 mr-1" />
                Global Search
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
                  <p className="text-sm text-slate-600">Influencers Found</p>
                  <p className="text-2xl font-bold text-purple-600">{influencers.length}</p>
                </div>
                <Search className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {campaigns.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Response Rate</p>
                  <p className="text-2xl font-bold text-green-600">68%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">New Ambassadors</p>
                  <p className="text-2xl font-bold text-amber-600">12</p>
                </div>
                <Star className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-100">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              AI Search
            </TabsTrigger>
            <TabsTrigger value="influencers" className="flex items-center gap-2">
              <Users2 className="w-4 h-4" />
              Found Influencers
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Campaigns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="mt-8">
            <InfluencerSearchForm 
              onSearch={handleSearch} 
              isLoading={isSearching}
            />
          </TabsContent>

          <TabsContent value="influencers" className="mt-8">
            <InfluencerTable 
              influencers={influencers}
              onStartCampaign={handleStartCampaign}
            />
          </TabsContent>

          <TabsContent value="campaigns" className="mt-8">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle>Campaign Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                {campaigns.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No campaigns yet</h3>
                    <p className="text-slate-600 mb-4">Start by searching for influencers and launching your first campaign</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {campaigns.map((campaign, index) => (
                      <div key={campaign.id || index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                        <div>
                          <h3 className="font-semibold text-slate-900">{campaign.campaign_name}</h3>
                          <p className="text-sm text-slate-600">
                            {campaign.credits_offered} credits • {campaign.status}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                            campaign.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                            'bg-blue-100 text-blue-800'
                          }>
                            {campaign.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Campaign Modal */}
        {showCampaignModal && (
          <InfluencerCampaignModal
            influencer={selectedInfluencer}
            onSubmit={handleCampaignSubmit}
            onClose={() => {
              setShowCampaignModal(false);
              setSelectedInfluencer(null);
            }}
          />
        )}
      </div>
    </div>
  );
}