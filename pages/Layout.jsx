

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import {
  LayoutDashboard,
  MapPin,
  Users,
  Settings,
  Crown,
  Target,
  Sparkles,
  Shield,
  Cloud,
  Star,
  Globe,
  Inbox,
  Calendar as CalendarIcon,
  TrendingUp as GrowthIcon,
  ClipboardList,
  Building2,
  ShieldCheck,
  Store,
  MessageSquare,
  Sun,
  Users2,
  Camera,
  Repeat,
  PlusSquare,
  Share2,
  Library,
  Handshake,
  GraduationCap,
  BookOpen,
  ShoppingBag,
  Lightbulb,
  Smartphone,
  DollarSign,
  TrendingUp,
  Zap,
  HeartPulse,
  Phone,
  PhoneCall,
  Mail,
  Bot,
  Video, // New import
  FileText, // New import
  BarChart3, // New import
  UserCheck, // New import
  Edit, // New import
  Gift, // New import
  CheckSquare, // New import
  PlayCircle, // New import
  Lock, // New import
  HelpCircle, // New import for outline
  Coins, // New import for outline
  Server, // New import for outline
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VoiceCommandBar from "@/components/ui/VoiceCommandBar";
import ZeroLearningCurveAssistant from "@/components/support/ZeroLearningCurveAssistant";

const featureNavigation = [
  {
    group: "Navigation",
    items: [
      { title: "How It Works", url: createPageUrl("HowItWorks"), icon: HelpCircle },
      { title: "Complete Guide", url: createPageUrl("RealtorGuide"), icon: BookOpen }, // NEW
      { title: "Pricing", url: createPageUrl("Pricing"), icon: DollarSign },
      { title: "Success Stories", url: createPageUrl("SuccessStories"), icon: Star },
      { title: "Features", url: createPageUrl("Dashboard"), icon: Zap }
    ]
  },
  {
    group: "Core Tools",
    items: [
      { title: "Dashboard", url: createPageUrl("Dashboard"), icon: LayoutDashboard },
      { title: "Inbox", url: createPageUrl("Inbox"), icon: Inbox },
      { title: "My Calendar", url: createPageUrl("Appointments"), icon: CalendarIcon },
      { title: "Transactions", url: createPageUrl("Transactions"), icon: ClipboardList },
    ],
  },
  {
    group: "AI Marketing Suite",
    items: [
      { title: "AI Content Autopilot", url: createPageUrl("AIContentAutopilot"), icon: Sparkles, badge: "New" },
      { title: "Social Media AI", url: createPageUrl("SocialMediaAI"), icon: Share2 },
      { title: "Email Campaigns", url: createPageUrl("EmailCampaigns"), icon: Mail },
      { title: "SMS Campaigns", url: createPageUrl("SMSCampaigns"), icon: MessageSquare },
      { title: "AI Video Generator", url: createPageUrl("AIVideoGenerator"), icon: Video, badge: "Premium" },
      { title: "Website Builder", url: createPageUrl("WebsiteBuilder"), icon: Globe },
      { title: "Influencer AI", url: createPageUrl("InfluencerFinder"), icon: Users2, badge: "New" },
    ],
  },
  {
    group: "AI Lead Generation",
    items: [
      { title: "Lead Magnets", url: createPageUrl("LeadMagnets"), icon: FileText },
      { title: "AI Listing Writer", url: createPageUrl("AIListingWriter"), icon: Edit },
      { title: "AI Market Analysis", url: createPageUrl("MarketAnalysis"), icon: BarChart3 },
      { title: "Competitor Watchdog", url: createPageUrl("CompetitorWatchdog"), icon: Users2, badge: "Pro" },
    ],
  },
  {
    group: "Client & Lead Management",
    items: [
      { title: "AI Powered CRM", url: createPageUrl("CRM"), icon: Users },
      { title: "Lead Pipeline", url: createPageUrl("Leads"), icon: Target },
      { title: "Property Listings", url: createPageUrl("Listings"), icon: Crown },
      { title: "Realty Tours", url: createPageUrl("VRTours"), icon: Camera, badge: "Premium" },
      { title: "Listing Analytics", url: createPageUrl("ListingAnalytics"), icon: BarChart3 },
      { title: "Review Management", url: createPageUrl("Reviews"), icon: Star },
    ],
  },
  {
    group: "AI Communications",
    items: [
      { title: "Voice AI - Outbound", url: createPageUrl("VoiceOutbound"), icon: Phone, badge: "AI Caller" },
      { title: "Voice AI - Inbound", url: createPageUrl("VoiceInbound"), icon: PhoneCall, badge: "AI Receptionist" },
    ],
  },
  {
    group: "Growth & Strategy",
    items: [
      { title: "Growth Hub", url: createPageUrl("Growth"), icon: GrowthIcon },
      { title: "Referral Engine", url: createPageUrl("ReferralEngine"), icon: Gift },
      { title: "Goal Tracker", url: createPageUrl("GoalTracker"), icon: CheckSquare },
      { title: "Pricing & Plans", url: createPageUrl("Pricing"), icon: DollarSign },
      { title: "Buy Credits", url: createPageUrl("CreditPurchase"), icon: Coins, badge: "Instant" },
    ],
  },
  {
    group: "Your AI",
    items: [
      { title: "AI Executive Assistant", url: createPageUrl("AIExecutiveSecretary"), icon: Crown, badge: "New" },
      { title: "AI Employee", url: createPageUrl("AIEmployee"), icon: Bot, badge: "Any Task" },
      { title: "Digital Twin", url: createPageUrl("DigitalTwin"), icon: UserCheck, badge: "Premium" },
    ],
  },
  {
    group: "Territory & Data",
    items: [
      { title: "Territory Management", url: createPageUrl("Territory"), icon: MapPin },
      { title: "Data Verification", url: createPageUrl("DataVerification"), icon: Shield, badge: "New" },
    ],
  },
  {
    group: "Platform & Account",
    items: [
      { title: "Account Settings", url: createPageUrl("Profile"), icon: Settings },
      { title: "Integrations", url: createPageUrl("Integrations"), icon: Zap },
      { title: "Automations", url: createPageUrl("Automations"), icon: PlayCircle },
      { title: "Team Management", url: createPageUrl("Team"), icon: Building2 },
      { title: "Compliance", url: createPageUrl("Compliance"), icon: ShieldCheck },
      { title: "Security", url: createPageUrl("Security"), icon: Lock },
      { title: "Feedback", url: createPageUrl("Feedback"), icon: MessageSquare, badge: "New" },
    ],
  },
];

const adminNavigationItems = [
  {
    title: "Deployment",
    url: createPageUrl("Deployment"),
    icon: Cloud,
    badge: "Admin",
  },
  {
    title: "Infrastructure",
    url: createPageUrl("InfrastructureDashboard"),
    icon: Server,
    badge: "Admin"
  },
  {
    title: "System Health",
    url: createPageUrl("SystemHealth"),
    icon: HeartPulse,
    badge: "Admin"
  },
  {
    title: "Feedback Dashboard",
    url: createPageUrl("FeedbackDashboard"),
    icon: Inbox,
    badge: "Admin"
  }
];

const agencyNavigationItems = [
    {
        group: "Agency Hub",
        items: [
            { title: "Agency Dashboard", url: createPageUrl("AgencyDashboard"), icon: LayoutDashboard },
            { title: "Prospecting", url: createPageUrl("Prospecting"), icon: Users },
            { title: "Sub-Accounts", url: createPageUrl("SubAccounts"), icon: Users2 },
            { title: "Account Snapshots", url: createPageUrl("AccountSnapshots"), icon: Camera },
        ]
    },
    {
        group: "SaaS Tools",
        items: [
            { title: "Reselling", url: createPageUrl("Reselling"), icon: Repeat },
            { title: "Add-Ons", url: createPageUrl("AddOns"), icon: PlusSquare },
            { title: "Affiliate Portal", url: createPageUrl("AffiliatePortal"), icon: Share2 },
            { title: "App Marketplace", url: createPageUrl("AppMarketplace"), icon: Store, badge: "New" },
        ]
    },
    {
        group: "Ecosystem",
        items: [
            { title: "Template Library", url: createPageUrl("TemplateLibrary"), icon: Library },
            { title: "Partners", url: createPageUrl("Partners"), icon: Handshake },
            { title: "University", url: createPageUrl("University"), icon: GraduationCap },
            { title: "SaaS Education", url: createPageUrl("SaaSEducation"), icon: BookOpen },
            { title: "Ideas", url: createPageUrl("Ideas"), icon: Lightbulb },
            { title: "AIRealtors247 Swag", url: createPageUrl("SwagStore"), icon: ShoppingBag },
        ]
    },
];

const promotionalItems = [
    { title: "Summer of AI", url: createPageUrl("SummerOfAI"), icon: Sun, color: "text-orange-500" },
    { title: "Mobile App", url: createPageUrl("MobileApp"), icon: Smartphone, color: "text-blue-500" },
];

const subscriptionTiers = {
  trial: { name: "Trial", color: "bg-gray-500", icon: Shield },
  starter: { name: "Starter", color: "bg-blue-500", icon: TrendingUp },
  professional: { name: "Professional", color: "bg-green-500", icon: Target },
  premium: { name: "Premium", color: "bg-purple-500", icon: Crown },
  enterprise: { name: "Enterprise", color: "bg-red-500", icon: Sparkles },
  white_label: { name: "White Label", color: "bg-indigo-500", icon: Shield },
  franchise: { name: "Franchise", color: "bg-amber-500", icon: Crown },
};

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSupportHub, setShowSupportHub] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);
    } catch (error) {
      console.error("Error loading user:", error);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await User.logout();
    navigate(createPageUrl("Dashboard"));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  const userTier = currentUser?.subscription_tier || 'trial';
  const tierInfo = subscriptionTiers[userTier];
  const isAdmin = currentUser?.role === 'admin';

  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50`}>
        <Sidebar className="border-r border-slate-200 bg-white shadow-xl">
          <SidebarHeader className="border-b border-slate-200 p-4">
             <Link to={createPageUrl("Dashboard")} className="flex justify-center items-center">
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/975141f0f_AIRealtors247Logo1.png" alt="AIRealtors247 Logo" className="h-32 w-auto" />
             </Link>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            {featureNavigation.map((group) => (
              <SidebarGroup key={group.group} className="mt-2">
                <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                  {group.group}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          asChild 
                          className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-lg mb-1 ${
                            (item.title === 'Account Settings' && location.pathname.includes('/Profile')) || location.pathname === item.url ? 'bg-blue-50 text-blue-700 shadow-sm' : ''
                          }`}
                        >
                          <Link to={item.url} className="flex items-center gap-3 px-4 py-2.5">
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium text-sm">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}

            {isAdmin && (
              <>
                <SidebarGroup className="mt-4">
                  <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                    Platform Admin
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {adminNavigationItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton 
                            asChild 
                            className={`hover:bg-red-50 hover:text-red-700 transition-all duration-200 rounded-xl mb-1 ${
                              location.pathname === item.url ? 'bg-red-50 text-red-700 shadow-sm' : ''
                            }`}
                          >
                            <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                              <item.icon className="w-5 h-5" />
                              <span className="font-medium">{item.title}</span>
                              {item.badge && (
                                <Badge variant="destructive" className="ml-auto text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {agencyNavigationItems.map((group) => (
                  <SidebarGroup key={group.group} className="mt-4">
                    <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                      {group.group}
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {group.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl mb-1 ${
                                location.pathname === item.url ? 'bg-blue-50 text-blue-700 shadow-sm' : ''
                              }`}
                            >
                              <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium text-sm">{item.title}</span>
                                {item.badge && (
                                    <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700 text-xs">
                                      {item.badge}
                                    </Badge>
                                  )}
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </>
            )}

            <SidebarGroup className="mt-6">
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Account Status
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-4 py-3">
                  <div className={`flex items-center gap-3 p-3 rounded-xl ${tierInfo.color} bg-opacity-10 border border-opacity-20`}>
                    <tierInfo.icon className={`w-5 h-5 ${tierInfo.color.replace('bg-', 'text-')}`} />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{tierInfo.name}</p>
                      <p className="text-xs text-slate-500">
                        {currentUser?.subscription_status === 'trial' ? 'Trial Active' : 'Subscription Active'}
                      </p>
                    </div>
                  </div>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
               <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                 Special Offers
               </SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                      {promotionalItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                              asChild
                              className="hover:bg-slate-50 transition-all duration-200 rounded-xl mb-1"
                            >
                              <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                                <span className="font-medium text-sm">{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>

          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start h-auto p-3 hover:bg-slate-50">
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={currentUser?.profile_image} />
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                        {currentUser?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">
                        {currentUser?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate(createPageUrl("Profile"))}>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white border-b border-slate-200 px-6 py-4 md:hidden shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors duration-200" />
              <h1 className="text-xl font-bold text-slate-900">{currentPageName}</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto pb-24">
            {children}
          </div>
        </main>
        
        <VoiceCommandBar />

        <Button
          size="icon"
          className="fixed bottom-24 right-5 w-16 h-16 rounded-full shadow-lg z-40 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 animate-pulse"
          onClick={() => setShowSupportHub(prev => !prev)}
        >
          <Zap className="w-8 h-8 text-white" />
        </Button>

        {showSupportHub && currentUser && (
          <ZeroLearningCurveAssistant 
            user={currentUser} 
            onClose={() => setShowSupportHub(false)}
            currentPageName={currentPageName}
          />
        )}
      </div>
      
    </SidebarProvider>
  );
}

