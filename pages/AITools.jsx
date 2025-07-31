
import React, { useState, useEffect } from "react";
import { LeadMagnet } from "@/api/entities";
import { User } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  FileText,
  BarChart3,
  Eye,
  Download,
  TrendingUp,
  Brain,
  Video, // Added for AI Video Generator
  Users, // Added for Competitor Watchdog
  UserCheck, // Added for Digital Twin
  Lock // Added Lock icon
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";

import LeadMagnetGenerator from "../components/ai-tools/LeadMagnetGenerator";
import ContentLibrary from "../components/ai-tools/ContentLibrary";
import MarketAnalysis from "../components/ai-tools/MarketAnalysis";
import SocialContentGenerator from "../components/ai-tools/SocialContentGenerator";
import ContentAutopilot from "../components/ai-tools/ContentAutopilot";
import AIVideoGenerator from "../components/ai-tools/AIVideoGenerator"; // Import new component
import CompetitorWatchdog from "../components/ai-tools/CompetitorWatchdog"; // Import new component
import DigitalTwinSetup from "../components/ai-tools/DigitalTwinSetup"; // Import new component

const aiToolsNavigation = [
  {
    id: "content-autopilot",
    label: "Content Autopilot",
    icon: Sparkles,
    description: "Your AI content and compliance engine"
  },
  {
    id: "lead-magnets",
    label: "Lead Magnets",
    icon: FileText,
    description: "Generate compelling real estate reports and guides"
  },
  {
    id: "social-content",
    label: "Social Content", 
    icon: Sparkles,
    description: "Create posts and captions for social media"
  },
  {
    id: "video-generator",
    label: "AI Video",
    icon: Video,
    description: "Generate videos with AI avatars and voice"
  },
  {
    id: "market-analysis",
    label: "Market Analysis",
    icon: BarChart3,
    description: "AI-powered market insights and reports"
  },
  {
    id: "competitor-watchdog",
    label: "Competitor Watchdog",
    icon: Users,
    description: "Analyze your local competition"
  },
  {
    id: "digital-twin",
    label: "Digital Twin",
    icon: UserCheck,
    description: "Create your AI digital twin"
  }
];

const FeatureLock = ({ tier, children }) => (
  <div className="relative">
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-lg border-2 border-dashed">
      <Lock className="w-12 h-12 text-slate-400 mb-4" />
      <h3 className="text-xl font-bold text-slate-800">Upgrade to {tier}</h3>
      <p className="text-slate-600 mb-4">This feature is exclusively available on the {tier} plan.</p>
      <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <Link to={createPageUrl("Pricing")}>View Plans & Upgrade</Link>
      </Button>
    </div>
    <div className="blur-sm pointer-events-none opacity-50">
      {children}
    </div>
  </div>
);

export default function AIToolsPage() {
  const [user, setUser] = useState(null);
  const [leadMagnets, setLeadMagnets] = useState([]);
  const [activeTab, setActiveTab] = useState("content-autopilot");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMagnets: 0,
    totalViews: 0,
    totalDownloads: 0,
    conversionRate: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, leadMagnetsData] = await Promise.all([
        User.me(),
        LeadMagnet.list("-created_date", 20)
      ]);
      
      setUser(userData);
      setLeadMagnets(leadMagnetsData);
      
      // Calculate stats
      const totalViews = leadMagnetsData.reduce((sum, magnet) => sum + (magnet.performance_metrics?.views || 0), 0);
      const totalDownloads = leadMagnetsData.reduce((sum, magnet) => sum + (magnet.performance_metrics?.downloads || 0), 0);
      
      setStats({
        totalMagnets: leadMagnetsData.length,
        totalViews,
        totalDownloads,
        conversionRate: totalViews > 0 ? ((totalDownloads / totalViews) * 100).toFixed(1) : 0
      });
    } catch (error) {
      console.error("Error loading AI tools data:", error);
    }
    setIsLoading(false);
  };

  const handleGenerateSuccess = () => {
    loadData(); // Refresh data after successful generation
  };

  const handleUpdateUser = async (updatedData) => {
    // In a real app, this would be a single API call.
    // For simulation, we just update the state.
    setUser(updatedData); 
  };

  const hasAccess = (allowedTiers) => {
    if (!user) return false;
    const currentTier = user.subscription_tier || 'trial';
    // Trial users get access to professional features for a limited time
    if (currentTier === 'trial' && (allowedTiers.includes('professional') || allowedTiers.includes('starter'))) {
        return true;
    }
    return allowedTiers.includes(currentTier);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-slate-200 rounded-xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
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
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">AI Content Studio</h1>
                  <p className="text-slate-600">
                    Industry-specialized AI that knows real estate inside and out
                  </p>
                </div>
              </div>
              
              {/* Industry Focus Differentiator */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 mt-4">
                <h3 className="font-semibold text-blue-900 mb-2">🎯 Why Use This Instead of ChatGPT?</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-red-600 font-medium">❌ Generic AI (ChatGPT, etc.)</p>
                    <ul className="text-red-700 mt-1 space-y-1">
                      <li>• General knowledge only</li>
                      <li>• You train it every time</li>
                      <li>• No real estate compliance</li>
                      <li>• Generic, boring content</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-green-600 font-medium">✅ AIRealtors247 AI</p>
                    <ul className="text-green-700 mt-1 space-y-1">
                      <li>• Pre-trained on real estate</li>
                      <li>• Knows your market & niche</li>
                      <li>• Built-in compliance checks</li>
                      <li>• Converting, professional content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 mb-2">
                {user?.subscription_tier?.replace('_', ' ').toUpperCase()}
              </Badge>
              <div className="font-bold text-2xl text-blue-600">{user?.credits_remaining}</div>
              <div className="text-sm text-slate-500">Credits Remaining</div>
              <Button size="sm" variant="outline" className="mt-2">Buy Credits</Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Content Created</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalMagnets}</div>
              <p className="text-xs text-slate-500">Lead magnets & content</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-slate-500">Content impressions</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Downloads</CardTitle>
              <Download className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalDownloads.toLocaleString()}</div>
              <p className="text-xs text-slate-500">Lead captures</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.conversionRate}%</div>
              <p className="text-xs text-slate-500">View to download</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Tools Tabs */}
        <Card className="shadow-xl border-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-7 bg-slate-100 p-1 rounded-xl">
              {aiToolsNavigation.map((tool) => (
                <TabsTrigger
                  key={tool.id}
                  value={tool.id}
                  className="flex items-center gap-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-200"
                >
                  <tool.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tool.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="mt-6 p-6">
              <TabsContent value="content-autopilot" className="mt-0">
                {hasAccess(['professional', 'premium']) ? (
                  <ContentAutopilot user={user} onUpdateUser={handleUpdateUser} />
                ) : (
                  <FeatureLock tier="Professional">
                    <ContentAutopilot user={user} onUpdateUser={handleUpdateUser} />
                  </FeatureLock>
                )}
              </TabsContent>

              <TabsContent value="lead-magnets" className="mt-0">
                {hasAccess(['starter', 'professional', 'premium', 'trial']) ? (
                  <LeadMagnetGenerator 
                    onSuccess={handleGenerateSuccess}
                    user={user}
                  />
                ) : (
                  <FeatureLock tier="Starter">
                     <LeadMagnetGenerator onSuccess={handleGenerateSuccess} user={user} />
                  </FeatureLock>
                )}
              </TabsContent>
              
              <TabsContent value="social-content" className="mt-0">
                {hasAccess(['starter', 'professional', 'premium', 'trial']) ? (
                  <SocialContentGenerator user={user} />
                ) : (
                  <FeatureLock tier="Starter">
                    <SocialContentGenerator user={user} />
                  </FeatureLock>
                )}
              </TabsContent>

              <TabsContent value="video-generator" className="mt-0">
                {hasAccess(['premium']) ? (
                  <AIVideoGenerator user={user} />
                ) : (
                  <FeatureLock tier="Premium">
                    <AIVideoGenerator user={user} />
                  </FeatureLock>
                )}
              </TabsContent>
              
              <TabsContent value="digital-twin" className="mt-0">
                {hasAccess(['premium']) ? (
                  <DigitalTwinSetup user={user} onComplete={() => alert("Digital Twin created successfully!")} />
                ) : (
                  <FeatureLock tier="Premium">
                    <DigitalTwinSetup user={user} onComplete={() => {}} />
                  </FeatureLock>
                )}
              </TabsContent>

              <TabsContent value="market-analysis" className="mt-0">
                {hasAccess(['professional', 'premium']) ? (
                  <MarketAnalysis user={user} />
                ) : (
                  <FeatureLock tier="Professional">
                    <MarketAnalysis user={user} />
                  </FeatureLock>
                )}
              </TabsContent>

              <TabsContent value="competitor-watchdog" className="mt-0">
                {hasAccess(['professional', 'premium']) ? (
                  <CompetitorWatchdog user={user} />
                ) : (
                  <FeatureLock tier="Professional">
                    <CompetitorWatchdog user={user} />
                  </FeatureLock>
                )}
              </TabsContent>
              
              <TabsContent value="content-library" className="mt-0">
                <ContentLibrary 
                  leadMagnets={leadMagnets}
                  onRefresh={loadData}
                />
              </TabsContent>
            </div>
          </Tabs>
        </Card>

        {/* AI Assistant Tip */}
        <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Pro Tip:</strong> The AI learns from your preferences and territory data to create more targeted content. 
            The more you use it, the better your results become!
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
