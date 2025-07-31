
import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { LegalCompliance } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  TrendingUp, Users, DollarSign, Target, Phone, Mail, MessageSquare, Calendar,
  CheckCircle, AlertCircle, Activity, Zap, Bot, Bell, FileText, Video, Mic,
  Headphones, BookOpen, GraduationCap, MapPin, Star, Globe, Camera, Share2,
  Building2, ClipboardList, Crown, Gift, Inbox, Search, Filter, Download,
  Upload, Eye, Edit, Settings, Shield, Lock, Unlock, Plus, Minus, ArrowRight,
  ArrowLeft, ChevronRight, Home, Briefcase, PieChart as PieChartIcon, BarChart3,
  TrendingDown, UserPlus, UserMinus, PhoneCall, Voicemail, Speaker, Volume2,
  Radio, Wifi, Signal, Bluetooth, Cast, PlayCircle, PauseCircle, StopCircle,
  SkipForward, SkipBack, FastForward, Rewind, Repeat, Shuffle, VolumeX,
  Volume1, Layers, Copy, Scissors, PaintBucket, Brush, Palette, Image, Film,
  Music, Archive, FolderOpen, Folder, Save, RefreshCw, RotateCcw, RotateCw,
  FlipHorizontal, FlipVertical, Crop, Move, Maximize, Minimize, Square, Circle,
  Triangle, Pentagon, Hexagon, Octagon, Mouse, Keyboard, Monitor, Smartphone,
  Tablet, Laptop, Server, Database, HardDrive, Cpu, MemoryStick, Usb, Plug,
  Battery, BatteryLow, Power, PowerOff, ClipboardPaste, Award, Gauge,
  Timer, Compass, Flag, Megaphone, Handshake, UserCheck,
  Network, Layers3, Package, ShoppingCart, CreditCard, Coins, Receipt, Clock,
  Lightbulb, CheckSquare, FileClock, ListChecks, Users2, Store, Library, Calculator, ShieldCheck,
  Rocket, Link as LinkIcon
} from "lucide-react";

import LegalComplianceModal from "../components/ui/LegalComplianceModal";
import DailyMotivation from "../components/dashboard/DailyMotivation";
import BusyRealtorController from "../components/dashboard/BusyRealtorController";

// NEW: Branded color palette for charts and highlights
const BRAND_COLORS = ['#1f2937', '#f59e0b', '#10b981', '#4f46e5', '#ef4444', '#3b82f6']; // Primary: slate-800, amber-500, emerald-500, indigo-600, red-500, blue-500

// Complete sample data for ALL features
const smartCRMData = [
  { name: 'Hot Leads', value: 45, color: '#ef4444' },
  { name: 'Warm Leads', value: 89, color: '#f59e0b' },
  { name: 'Cold Leads', value: 156, color: '#3b82f6' },
  { name: 'Closed Deals', value: 31, color: '#10b981' }
];

const leadInboxData = [
  { status: 'Unread', count: 24 },
  { status: 'Responded', count: 156 },
  { status: 'Scheduled', count: 12 },
  { status: 'Qualified', count: 45 }
];

const leadVaultData = [
  { day: 'Mon', newLeads: 12, qualified: 4, converted: 1 },
  { day: 'Tue', newLeads: 18, qualified: 7, converted: 2 },
  { day: 'Wed', newLeads: 15, qualified: 5, converted: 1 },
  { day: 'Thu', newLeads: 22, qualified: 8, converted: 3 },
  { day: 'Fri', newLeads: 19, qualified: 6, converted: 2 },
  { day: 'Sat', newLeads: 8, qualified: 2, converted: 0 },
  { day: 'Sun', newLeads: 5, qualified: 1, converted: 0 }
];

const aiLeadFinderData = [
  { source: 'Facebook', found: 156, verified: 89, contacted: 45 },
  { source: 'LinkedIn', found: 89, verified: 67, contacted: 23 },
  { source: 'Instagram', found: 234, verified: 178, contacted: 67 },
  { source: 'Public Records', found: 445, verified: 312, contacted: 89 }
];

const leadQualityData = [
  { name: 'Valid Emails', value: 85, color: '#10b981' },
  { name: 'Invalid Emails', value: 15, color: '#ef4444' },
  { name: 'Valid Phones', value: 78, color: '#3b82f6' },
  { name: 'Invalid Phones', value: 22, color: '#f59e0b' }
];

const voiceOutboundData = [
  { day: 'Mon', calls: 45, connected: 12, appointments: 3 },
  { day: 'Tue', calls: 52, connected: 18, appointments: 5 },
  { day: 'Wed', calls: 38, connected: 15, appointments: 4 },
  { day: 'Thu', calls: 61, connected: 22, appointments: 7 },
  { day: 'Fri', calls: 48, connected: 19, appointments: 6 },
  { day: 'Sat', calls: 29, connected: 8, appointments: 2 },
  { day: 'Sun', calls: 15, connected: 4, appointments: 1 }
];

const aiReceptionistData = [
  { hour: '9AM', calls: 12, handled: 12, satisfaction: 4.8 },
  { hour: '10AM', calls: 18, handled: 18, satisfaction: 4.9 },
  { hour: '11AM', calls: 15, handled: 15, satisfaction: 4.7 },
  { hour: '12PM', calls: 22, handled: 22, satisfaction: 4.8 },
  { hour: '1PM', calls: 19, handled: 19, satisfaction: 4.9 },
  { hour: '2PM', calls: 25, handled: 25, satisfaction: 4.8 }
];

const callRecordingData = [
  { type: 'Inbound', recorded: 156, transcribed: 142, analyzed: 138 },
  { type: 'Outbound', recorded: 234, transcribed: 225, analyzed: 218 },
  { type: 'Conferences', recorded: 45, transcribed: 43, analyzed: 41 }
];

const emailCampaignData = [
  { campaign: 'Welcome Series', sent: 1250, opened: 425, clicked: 89, converted: 12 },
  { campaign: 'Market Updates', sent: 2100, opened: 714, clicked: 156, converted: 23 },
  { campaign: 'Listing Alerts', sent: 890, opened: 356, clicked: 78, converted: 15 },
  { campaign: 'Holiday Greetings', sent: 1850, opened: 629, clicked: 145, converted: 8 }
];

const smsCampaignData = [
  { campaign: 'Quick Responses', sent: 450, delivered: 438, opened: 401, replied: 89 },
  { campaign: 'Appointment Reminders', sent: 234, delivered: 231, opened: 225, replied: 12 },
  { campaign: 'Follow-ups', sent: 567, delivered: 552, opened: 489, replied: 134 }
];

const socialMediaData = [
  { platform: 'Facebook', posts: 45, engagement: 1250, leads: 23 },
  { platform: 'Instagram', posts: 38, engagement: 890, leads: 18 },
  { platform: 'LinkedIn', posts: 25, engagement: 456, leads: 12 },
  { platform: 'TikTok', posts: 52, engagement: 2100, leads: 34 }
];

const digitalTwinData = [
  { type: 'Listing Videos', created: 45, views: 12500, leads: 23 },
  { type: 'Market Updates', created: 28, views: 8900, leads: 15 },
  { type: 'Client Messages', created: 67, views: 5600, leads: 8 }
];

const reviewData = [
  { month: 'Jan', requests: 25, received: 18, google: 12, rating: 4.8 },
  { month: 'Feb', requests: 32, received: 28, google: 19, rating: 4.9 },
  { month: 'Mar', requests: 28, received: 24, google: 16, rating: 4.7 },
  { month: 'Apr', requests: 35, received: 31, google: 22, rating: 4.8 }
];

const territoryData = [
  { name: '90210', leads: 45, listings: 8, avgPrice: '$2.1M', activity: 85 },
  { name: '90211', leads: 38, listings: 6, avgPrice: '$1.8M', activity: 72 },
  { name: '90212', leads: 52, listings: 12, avgPrice: '$2.5M', activity: 91 }
];

const referralData = [
  { month: 'Jan', sent: 25, converted: 8, credits: 800 },
  { month: 'Feb', sent: 32, converted: 12, credits: 1200 },
  { month: 'Mar', sent: 28, converted: 9, credits: 900 },
  { month: 'Apr', sent: 35, converted: 15, credits: 1500 }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#84cc16', '#f97316'];

// Clickable Feature Box Component
const FeatureBox = ({ title, icon: Icon, data, chart, linkTo, stats, bgGradient = "from-slate-100 to-gray-100" }) => ( // Updated default gradient
  <Link to={linkTo} className="block">
    <Card className={`shadow-xl border-0 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br ${bgGradient}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="p-2 bg-white/50 rounded-lg">
            <Icon className="w-5 h-5" />
          </div>
          {title}
          <ChevronRight className="w-4 h-4 ml-auto text-slate-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {chart && (
          <div className="h-32 mb-4">
            {chart}
          </div>
        )}
        {stats && (
          <div className="space-y-2">
            {stats.map((stat, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-slate-600">{stat.label}</span>
                <span className="font-bold text-slate-900">{stat.value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  </Link>
);

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showComplianceModal, setShowComplianceModal] = useState(false);
  const [hasLegalCompliance, setHasLegalCompliance] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // For demonstration purposes, mock the User.me() to include is_beta_founder
      // In a real app, User.me() would fetch this from your backend.
      const currentUser = await User.me();
      // Example of adding is_beta_founder for testing:
      // If you want to test the beta founder view, uncomment the line below:
      // currentUser.is_beta_founder = true;
      setUser(currentUser);
      await checkLegalCompliance(currentUser);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const checkLegalCompliance = async (currentUser) => {
    if (currentUser && currentUser.email) {
      try {
        const existingCompliance = await LegalCompliance.filter({
          user_email: currentUser.email,
          compliance_version: "1.0"
        }, "-created_date", 1);

        setHasLegalCompliance(existingCompliance.length > 0);
      } catch (error) {
        console.error('Error checking legal compliance:', error);
        setHasLegalCompliance(false);
      }
    }
  };

  const handleComplianceSuccess = async () => {
    setShowComplianceModal(false);
    setHasLegalCompliance(true);
    loadDashboardData();
  };

  const handleInteractionAttempt = () => {
    if (!hasLegalCompliance) {
      setShowComplianceModal(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-8"> {/* Updated loading bg */}
        <div className="max-w-screen-2xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-64 bg-slate-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showComplianceModal && user && (
        <LegalComplianceModal
          user={user}
          onSuccess={handleComplianceSuccess}
        />
      )}

      {!hasLegalCompliance && (
        <div
          className="fixed inset-0 z-30 cursor-pointer"
          onClick={handleInteractionAttempt}
          style={{ background: 'transparent' }}
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-screen-2xl mx-auto space-y-12">

          {/* Header */}
          <div className="text-center bg-gradient-to-r from-slate-800 to-gray-900 rounded-3xl p-8 text-white">
            <h1 className="text-5xl font-bold mb-4">
              🚀 AI Army Control Centre
            </h1>
            <p className="text-xl text-slate-200 mb-4">
              Master Control Hub for All 99+ AI Engines
            </p>
            <p className="text-lg text-slate-300">
              ⚡ Live performance data • Deep feature access • 100% hands-free automation
            </p>
            {!hasLegalCompliance && (
              <div className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-white font-medium">
                  🔓 Click anywhere to unlock your complete AI dashboard and activate all features.
                </p>
              </div>
            )}
          </div>

          {/* NEW: AI Executive Assistant Card */}
          <Card className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-2xl">
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="hidden md:block w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 overflow-hidden">
                  <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a2b2b1612_ExecutiveAssistant.png"
                    alt="AI Executive Assistant"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Meet Your AI Executive Assistant</h2>
                  <p className="text-blue-100 mt-1 max-w-2xl">
                    The ultimate hands-free experience. Your AI assistant will now manage campaigns, follow up with leads, and run your entire platform autonomously.
                  </p>
                </div>
              </div>
              <Link to={createPageUrl("AIExecutiveSecretary")}>
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold shadow-lg w-full md:w-auto">
                  Activate & Delegate
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Today's Insights */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-amber-500 pb-3 flex items-center gap-3"> {/* Kept amber border for highlight */}
              <Lightbulb className="w-8 h-8 text-amber-600" />
              Today's Action Center
            </h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <DailyMotivation />
              </div>
              <div className="lg:col-span-2">
                <BusyRealtorController user={user} />
              </div>
            </div>
          </div>


          {/* Core CRM & Lead Management */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-slate-700 pb-3 flex items-center gap-3"> {/* Updated border color */}
              <Users className="w-8 h-8 text-slate-800" /> {/* Updated icon color */}
              Core CRM & Lead Management
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 1. Smart Client CRM */}
              <FeatureBox
                title="AI Smart Client CRM"
                icon={Users}
                linkTo={createPageUrl("CRM")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={smartCRMData} cx="50%" cy="50%" outerRadius={50} dataKey="value">
                        {smartCRMData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} /> // Updated chart colors
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Total Contacts", value: "2,431" },
                  { label: "Pipeline Value", value: "$12.5M" }
                ]}
              />

              {/* 2. Lead Inbox & Conversation Tracker */}
              <FeatureBox
                title="Lead Inbox & Conversation Tracker"
                icon={Inbox}
                linkTo={createPageUrl("Inbox")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leadInboxData}>
                      <Bar dataKey="count" fill={BRAND_COLORS[0]} /> {/* Updated bar color */}
                      <XAxis dataKey="status" hide />
                      <YAxis hide />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Unread Messages", value: "24" },
                  { label: "Response Rate", value: "94%" }
                ]}
              />

              {/* 3. Lead Vault & Opportunity Manager */}
              <FeatureBox
                title="Lead Vault & Opportunity Manager"
                icon={Target}
                linkTo={createPageUrl("Leads")}
                bgGradient="from-amber-50 to-orange-100" // Updated to accent color
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={leadVaultData}>
                      <Line type="monotone" dataKey="newLeads" stroke={BRAND_COLORS[1]} strokeWidth={2} /> {/* Updated line color */}
                      <Line type="monotone" dataKey="qualified" stroke={BRAND_COLORS[2]} strokeWidth={2} /> {/* Updated line color */}
                      <XAxis dataKey="day" hide />
                      <YAxis hide />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Total Leads", value: "1,250" },
                  { label: "Hot Leads", value: "78" }
                ]}
              />

              {/* 4. AI Lead Finder */}
              <FeatureBox
                title="AI Lead Finder"
                icon={Search}
                linkTo={createPageUrl("AILeadFinder?prompt=" + encodeURIComponent("Find property owners in zip code 90210 who have lived in their home for over 10 years and are likely to sell in the next 12 months."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={aiLeadFinderData}>
                      <Area dataKey="found" fill={BRAND_COLORS[3]} fillOpacity={0.3} />
                      <Area dataKey="verified" fill={BRAND_COLORS[2]} fillOpacity={0.6} />
                      <XAxis dataKey="source" hide />
                      <YAxis hide />
                      <Tooltip />
                    </AreaChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Leads Found Today", value: "234" },
                  { label: "Verified Contacts", value: "89%" }
                ]}
              />

              {/* 5. AI Lead Quality Verifier */}
              <FeatureBox
                title="AI Lead Quality Verifier"
                icon={Shield}
                linkTo={createPageUrl("DataVerification?prompt=" + encodeURIComponent("Verify the phone numbers and email addresses for my new leads from the 'Website' source in the last 24 hours."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={leadQualityData} cx="50%" cy="50%" outerRadius={50} dataKey="value">
                        {leadQualityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={BRAND_COLORS[index % BRAND_COLORS.length]} /> // Updated chart colors
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Verified Today", value: "456" },
                  { label: "Quality Score", value: "92%" }
                ]}
              />

              {/* 6. Smart Lead Tags & Segmentation */}
              <FeatureBox
                title="Smart Lead Tags & Segmentation"
                icon={Filter}
                linkTo={createPageUrl("LeadSegmentation")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Active Segments", value: "12" },
                  { label: "Auto-Tagged", value: "1,234" },
                  { label: "Custom Tags", value: "45" },
                  { label: "Smart Rules", value: "8" }
                ]}
              />

              {/* 7. Smart Deal Timeline Tracker */}
              <FeatureBox
                title="Smart Deal Timeline Tracker"
                icon={Clock}
                linkTo={createPageUrl("DealTracker")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Active Deals", value: "23" },
                  { label: "Avg. Cycle Time", value: "45 days" },
                  { label: "At Risk Deals", value: "3" },
                  { label: "Closing This Month", value: "8" }
                ]}
              />
            </div>
          </div>

          {/* AI Voice & Communications */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-green-600 pb-3 flex items-center gap-3"> {/* Updated border */}
              <Phone className="w-8 h-8 text-green-700" /> {/* Updated icon */}
              AI Voice & Communications
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 8. AI Receptionist 24/7 */}
              <FeatureBox
                title="AI Receptionist 24/7"
                icon={PhoneCall}
                linkTo={createPageUrl("VoiceInbound")}
                bgGradient="from-green-50 to-teal-50" // Updated to accent
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={aiReceptionistData}>
                      <Area dataKey="calls" fill={BRAND_COLORS[2]} fillOpacity={0.3} />
                      <Area dataKey="handled" fill={BRAND_COLORS[2]} fillOpacity={0.6} />
                      <XAxis dataKey="hour" hide />
                      <YAxis hide />
                      <Tooltip />
                    </AreaChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Calls Today", value: "47" },
                  { label: "100% Answered", value: "✓" }
                ]}
              />

              {/* 9. AI Outbound Caller */}
              <FeatureBox
                title="AI Outbound Caller"
                icon={Phone}
                linkTo={createPageUrl("VoiceOutbound")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={voiceOutboundData}>
                      <Bar dataKey="calls" fill={BRAND_COLORS[0]} />
                      <Bar dataKey="connected" fill={BRAND_COLORS[2]} />
                      <XAxis dataKey="day" hide />
                      <YAxis hide />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Calls Made", value: "288" },
                  { label: "Connected", value: "98" }
                ]}
              />

              {/* 10. Call Recording & Call Logs */}
              <FeatureBox
                title="Call Recording & Call Logs"
                icon={Mic}
                linkTo={createPageUrl("VoiceInbound")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={callRecordingData}>
                      <Bar dataKey="recorded" fill={BRAND_COLORS[0]} />
                      <Bar dataKey="transcribed" fill={BRAND_COLORS[2]} />
                      <XAxis dataKey="type" hide />
                      <YAxis hide />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Recorded Today", value: "156" },
                  { label: "Transcribed", value: "98%" }
                ]}
              />

              {/* 11. AI Live Call Transcriptions */}
              <FeatureBox
                title="AI Live Call Transcriptions"
                icon={Volume2}
                linkTo={createPageUrl("VoiceInbound")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Active Calls", value: "23" },
                  { label: "Words/Min", value: "1,245" },
                  { label: "Accuracy", value: "97.8%" },
                  { label: "Languages", value: "12" }
                ]}
              />

              {/* 12. AI Meeting Notes Summarizer */}
              <FeatureBox
                title="AI Meeting Notes Summarizer"
                icon={FileText}
                linkTo={createPageUrl("Appointments")}
                bgGradient="from-amber-50 to-orange-100" // Updated to accent
                stats={[
                  { label: "Meetings Summarized", value: "234" },
                  { label: "Action Items Created", value: "567" },
                  { label: "Time Saved", value: "45 hrs" },
                  { label: "Quality Score", value: "8.9/10" }
                ]}
              />

              {/* 13. AI Note Generator (Voice to Text) */}
              <FeatureBox
                title="AI Note Generator (Voice to Text)"
                icon={Headphones}
                linkTo={createPageUrl("VoiceInbound")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Notes Generated", value: "156" },
                  { label: "Accuracy", value: "98%" },
                  { label: "Hours Saved", value: "45" },
                  { label: "Action Items", value: "234" }
                ]}
              />

              {/* 14. AI Text-to-Speech Listing Narration */}
              <FeatureBox
                title="AI Text-to-Speech Listing Narration"
                icon={Speaker}
                linkTo={createPageUrl("AIVideoGenerator")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Audio Files Created", value: "89" },
                  { label: "Total Listens", value: "2,340" },
                  { label: "Voice Clones", value: "3" },
                  { label: "Languages", value: "8" }
                ]}
              />
            </div>
          </div>

          {/* AI Marketing & Campaigns */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-orange-500 pb-3 flex items-center gap-3">
              <Megaphone className="w-8 h-8 text-orange-600" />
              AI Marketing & Campaigns
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 15. AI Email Campaign Builder */}
              <FeatureBox
                title="AI Email Campaign Builder"
                icon={Mail}
                linkTo={createPageUrl("EmailCampaigns?prompt=" + encodeURIComponent("Create a 5-day email campaign for new buyer leads. Day 1: Welcome and intro. Day 2: Top 3 tips for buyers. Day 3: Showcase a featured listing. Day 4: Client testimonial. Day 5: Call to action for a consultation."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emailCampaignData}>
                      <Bar dataKey="sent" fill={BRAND_COLORS[0]} />
                      <Bar dataKey="opened" fill={BRAND_COLORS[2]} />
                      <XAxis dataKey="campaign" hide />
                      <YAxis hide />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Emails Sent", value: "6,090" },
                  { label: "Open Rate", value: "35.2%" }
                ]}
              />

              {/* 16. AI SMS Campaign Scheduler */}
              <FeatureBox
                title="AI SMS Campaign Scheduler"
                icon={MessageSquare}
                linkTo={createPageUrl("SMSCampaigns?prompt=" + encodeURIComponent("Draft an SMS message for an open house reminder this Saturday at 2 PM for 123 Main St. Include a link to the virtual tour."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={smsCampaignData}>
                      <Line type="monotone" dataKey="sent" stroke={BRAND_COLORS[0]} strokeWidth={2} />
                      <Line type="monotone" dataKey="replied" stroke={BRAND_COLORS[2]} strokeWidth={2} />
                      <XAxis dataKey="campaign" hide />
                      <YAxis hide />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "SMS Sent", value: "850" },
                  { label: "Delivery Rate", value: "89%" }
                ]}
              />

              {/* 17. AI Social Media Scheduler */}
              <FeatureBox
                title="AI Social Media Scheduler"
                icon={Share2}
                linkTo={createPageUrl("SocialMediaAI?prompt=" + encodeURIComponent("Generate a 'Market Monday' post for Instagram. Include a key statistic about the Beverly Hills market, a relevant image, and engaging questions for my followers."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={socialMediaData}>
                      <Bar dataKey="posts" fill={BRAND_COLORS[5]} />
                      <Bar dataKey="leads" fill={BRAND_COLORS[2]} />
                      <XAxis dataKey="platform" hide />
                      <YAxis hide />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Posts This Month", value: "160" },
                  { label: "Leads Generated", value: "87" }
                ]}
              />

              {/* 18. Campaign Analytics Dashboard */}
              <FeatureBox
                title="Campaign Analytics Dashboard"
                icon={BarChart3}
                linkTo={createPageUrl("EmailCampaigns")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Active Campaigns", value: "12" },
                  { label: "Total ROI", value: "340%" },
                  { label: "Best Performer", value: "Email" },
                  { label: "Conversion Rate", value: "8.7%" }
                ]}
              />

              {/* 19. Automated Lead Routing */}
              <FeatureBox
                title="Automated Lead Routing"
                icon={Network}
                linkTo={createPageUrl("CRM")}
                bgGradient="from-green-50 to-emerald-50" // Kept existing good green accent
                stats={[
                  { label: "Leads Routed Today", value: "89" },
                  { label: "Routing Rules", value: "15" },
                  { label: "Avg. Response Time", value: "3 min" },
                  { label: "Success Rate", value: "94%" }
                ]}
              />

              {/* 20. Auto-Follow-Up Reminders */}
              <FeatureBox
                title="Auto-Follow-Up Reminders"
                icon={Bell}
                linkTo={createPageUrl("CRM")}
                bgGradient="from-amber-50 to-orange-100" // Updated to accent
                stats={[
                  { label: "Reminders Set", value: "234" },
                  { label: "Completed Today", value: "67" },
                  { label: "Success Rate", value: "89%" },
                  { label: "Avg. Response", value: "2.5 days" }
                ]}
              />
            </div>
          </div>

          {/* Content & Template Generation */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-indigo-500 pb-3 flex items-center gap-3">
              <FileText className="w-8 h-8 text-indigo-600" />
              Content & Template Generation
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 21. Done-For-You Template Library */}
              <FeatureBox
                title="Done-For-You Template Library"
                icon={Library}
                linkTo={createPageUrl("TemplateLibrary")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Total Templates", value: "500+" },
                  { label: "Categories", value: "25" },
                  { label: "Most Used", value: "Email" },
                  { label: "User Rating", value: "4.9/5" }
                ]}
              />

              {/* 22. Ready-to-Use Email Campaigns */}
              <FeatureBox
                title="Ready-to-Use Email Campaigns"
                icon={Mail}
                linkTo={createPageUrl("EmailCampaigns")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Email Templates", value: "150+" },
                  { label: "Categories", value: "12" },
                  { label: "Templates Used", value: "234" },
                  { label: "Success Rate", value: "92%" }
                ]}
              />

              {/* 23. Social Post Templates for Listings */}
              <FeatureBox
                title="Social Post Templates for Listings"
                icon={Camera}
                linkTo={createPageUrl("SocialMediaAI")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Template Designs", value: "200+" },
                  { label: "Posts Generated", value: "1,245" },
                  { label: "Avg Engagement", value: "+340%" },
                  { label: "Platforms", value: "6" }
                ]}
              />

              {/* 24. AI Instagram/Facebook Reels Script Generator */}
              <FeatureBox
                title="AI Reels Script Generator"
                icon={Video}
                linkTo={createPageUrl("ReelsGenerator?prompt=" + encodeURIComponent("Generate a 30-second Instagram Reel script showcasing the top 3 features of a luxury condo. Include visuals for a modern kitchen, a stunning city view, and a rooftop pool."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Scripts Created", value: "89" },
                  { label: "Total Views", value: "15.6K" },
                  { label: "Leads from Reels", value: "234" },
                  { label: "Engagement Rate", value: "67%" }
                ]}
              />

              {/* 25. AI Market Report Generator */}
              <FeatureBox
                title="AI Market Report Generator"
                icon={TrendingUp}
                linkTo={createPageUrl("MarketReportGenerator?prompt=" + encodeURIComponent("Generate a Q2 market report for Beverly Hills, 90210. Include average sale price, days on market, and inventory levels. Conclude with a prediction for Q3."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Reports Generated", value: "156" },
                  { label: "Data Sources", value: "12" },
                  { label: "Avg. Pages", value: "8" },
                  { label: "Client Downloads", value: "2,340" }
                ]}
              />

              {/* 26. AI First-Time Buyer Guide Creator */}
              <FeatureBox
                title="AI First-Time Buyer Guide Creator"
                icon={Home}
                linkTo={createPageUrl("BuyerGuideCreator?prompt=" + encodeURIComponent("Create a comprehensive First-Time Home Buyer's Guide for the Los Angeles area. Include sections on getting pre-approved, finding an agent, making an offer, and the closing process."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Guides Created", value: "45" },
                  { label: "Templates Available", value: "25" },
                  { label: "Downloads", value: "890" },
                  { label: "Conversion Rate", value: "23%" }
                ]}
              />
            </div>
          </div>

          {/* Productivity & Personalization */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-emerald-500 pb-3 flex items-center gap-3">
              <Zap className="w-8 h-8 text-emerald-600" />
              Productivity & Personalization
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               <FeatureBox
                title="AI Personal Assistant"
                icon={Bot}
                linkTo={createPageUrl("AIEmployee?prompt=" + encodeURIComponent("Review my calendar for this week and identify three time slots where I can schedule client follow-up calls. Then, draft a list of my top 5 priority leads to call."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Tasks Completed Today", value: "34" },
                  { label: "Time Saved", value: "2.5 hours" },
                  { label: "Pending Tasks", value: "5" },
                  { label: "Success Rate", value: "98%" }
                ]}
              />
              <FeatureBox
                title="AI Business Coach"
                icon={ClipboardList}
                linkTo={createPageUrl("Growth?prompt=" + encodeURIComponent("Based on my goal of closing 3 deals this month, create a daily action plan for me for the next 7 days. Include prospecting, follow-up, and marketing activities."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Action Plan Generated", value: "Today" },
                  { label: "Tasks on Plan", value: "8" },
                  { label: "Tasks Completed", value: "3" },
                  { label: "Goal Alignment", value: "92%" }
                ]}
              />
              <FeatureBox
                title="AI Calendar & Appointment Manager"
                icon={Calendar}
                linkTo={createPageUrl("Appointments")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Appointments Today", value: "5" },
                  { label: "This Week", value: "28" },
                  { label: "Conflicts Avoided", value: "3" },
                  { label: "Open Slots", value: "8" }
                ]}
              />
              <FeatureBox
                title="Smart Task Checklist"
                icon={ListChecks}
                linkTo={createPageUrl("Transactions")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Active Checklists", value: "12" },
                  { label: "Tasks Due Today", value: "8" },
                  { label: "Overdue Tasks", value: "2" },
                  { label: "Completion Rate", value: "85%" }
                ]}
              />
              <FeatureBox
                title="Onboarding Checklist for Teams"
                icon={Users2}
                linkTo={createPageUrl("Team")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "New Members Onboarding", value: "2" },
                  { label: "Avg. Onboarding Time", value: "3 days" },
                  { label: "Completion Rate", value: "100%" },
                  { label: "Templates Available", value: "5" }
                ]}
              />
            </div>
          </div>

          {/* Transaction & Document Management */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-cyan-500 pb-3 flex items-center gap-3">
              <FileClock className="w-8 h-8 text-cyan-600" />
              Transaction & Document Management
            </h2>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               <FeatureBox
                title="Contract-to-Close Transaction Manager"
                icon={FileClock}
                linkTo={createPageUrl("Transactions")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Active Transactions", value: "15" },
                  { label: "Pending Closings", value: "4" },
                  { label: "Documents Missing", value: "8" },
                  { label: "Avg. Closing Time", value: "32 days" }
                ]}
              />
               <FeatureBox
                title="Document Automation & Templates"
                icon={FileText}
                linkTo={createPageUrl("DocumentCenter")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Templates Available", value: "48" },
                  { label: "Documents Generated", value: "112" },
                  { label: "Time Saved", value: "18 hours" },
                  { label: "Error Reduction", value: "95%" }
                ]}
              />
              <FeatureBox
                title="E-Signature Integration"
                icon={Edit}
                linkTo={createPageUrl("DocumentCenter")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Documents Sent for Signature", value: "34" },
                  { label: "Awaiting Signature", value: "12" },
                  { label: "Signed Today", value: "5" },
                  { label: "Avg. Signature Time", value: "2 hours" }
                ]}
              />
             </div>
          </div>

          {/* Analytics & Strategy */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-rose-500 pb-3 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-rose-600" />
              Analytics & Strategy
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureBox
                title="AI Market Insights"
                icon={TrendingUp}
                linkTo={createPageUrl("MarketAnalysis?prompt=" + encodeURIComponent("Provide a 1-page summary of the current real estate market trends in Miami, Florida. Include data on inventory, price trends, and buyer demand. End with a 3-point summary of opportunities for agents."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Current Market Trend", value: "Uptrend" },
                  { label: "Hot Zip Codes", value: "3" },
                  { label: "Avg. Days on Market", value: "28" },
                  { label: "Price Change (30d)", value: "+2.1%" }
                ]}
              />
              <FeatureBox
                title="AI Competitor Watchdog"
                icon={Eye}
                linkTo={createPageUrl("CompetitorWatchdog?prompt=" + encodeURIComponent("Track the top 3 real estate agents in zip code 90210. Report on their new listings this week, average days on market, and their most engaging social media content."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Competitors Tracked", value: "15" },
                  { label: "New Listings by Competitors", value: "8" },
                  { label: "Their Avg. DOM", value: "34" },
                  { label: "Opportunities Found", value: "4" }
                ]}
              />
              <FeatureBox
                title="AI Social Trends Analyzer"
                icon={Activity}
                linkTo={createPageUrl("SocialMediaAI?prompt=" + encodeURIComponent("What are the trending real estate topics and hashtags on TikTok and Instagram right now? Provide 3 content ideas based on these trends."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Trending Topic", value: "First-Time Buyer Tips" },
                  { label: "Top Platform", value: "Instagram" },
                  { label: "Viral Sound", value: "Upbeat Acoustic" },
                  { label: "Best Post Time", value: "6 PM" }
                ]}
              />
              <FeatureBox
                title="AI CMA Generator"
                icon={Calculator}
                linkTo={createPageUrl("CMAGenerator?prompt=" + encodeURIComponent("Generate a Comparative Market Analysis (CMA) for the property at 456 Oak Avenue, Beverly Hills, CA 90210. Use 5 comparable active listings and 5 comparable sold listings from the last 6 months."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "CMAs Generated", value: "18" },
                  { label: "Avg. Generation Time", value: "3 min" },
                  { label: "Accuracy Score", value: "94%" },
                  { label: "Conversion Rate", value: "72%" }
                ]}
              />
            </div>
          </div>

          {/* Video & Digital Presence */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-yellow-500 pb-3 flex items-center gap-3">
              <Video className="w-8 h-8 text-yellow-600" />
              Video & Digital Presence
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 42. AI Digital Twin Video Creator */}
              <FeatureBox
                title="AI Digital Twin Video Creator"
                icon={UserCheck}
                linkTo={createPageUrl("DigitalTwin?prompt=" + encodeURIComponent("Use my digital twin to create a 60-second market update video for July. The script should cover the latest interest rate news and local inventory levels."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={digitalTwinData}>
                      <Bar dataKey="created" fill={BRAND_COLORS[0]} />
                      <Bar dataKey="leads" fill={BRAND_COLORS[2]} />
                      <XAxis dataKey="type" hide />
                      <YAxis hide />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Videos Created", value: "167" },
                  { label: "Total Views", value: "32.1K" }
                ]}
              />

              {/* 43. AI Text-to-Video Posts */}
              <FeatureBox
                title="AI Text-to-Video Posts"
                icon={Film}
                linkTo={createPageUrl("TextToVideo?prompt=" + encodeURIComponent("Take my latest blog post about '5 Tips for Boosting Curb Appeal' and turn it into a 60-second video with stock footage and animated text overlays."))}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Videos Generated", value: "234" },
                  { label: "Platforms", value: "8" },
                  { label: "Total Views", value: "45.6K" },
                  { label: "Engagement Rate", value: "78%" }
                ]}
              />

              {/* 44. Personalized Market Update Videos */}
              <FeatureBox
                title="Personalized Market Update Videos"
                icon={TrendingUp}
                linkTo={createPageUrl("AIVideoGenerator")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Updates Created", value: "67" },
                  { label: "Subscriber Views", value: "12.3K" },
                  { label: "Client Retention", value: "94%" },
                  { label: "Referral Rate", value: "23%" }
                ]}
              />

              {/* 45. Built-in Video Hosting */}
              <FeatureBox
                title="Built-in Video Hosting"
                icon={Server}
                linkTo={createPageUrl("AIVideoGenerator")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Videos Hosted", value: "890" },
                  { label: "Storage Used", value: "2.4 TB" },
                  { label: "Monthly Views", value: "89.5K" },
                  { label: "Uptime", value: "99.9%" }
                ]}
              />
            </div>
          </div>

          {/* Referrals & Reviews */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-purple-500 pb-3 flex items-center gap-3">
              <Gift className="w-8 h-8 text-purple-600" />
              Referrals & Reviews
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 73. Referral Credit Dashboard */}
              <FeatureBox
                title="Referral Credit Dashboard"
                icon={CreditCard}
                linkTo={createPageUrl("ReferralEngine")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={referralData}>
                      <Line type="monotone" dataKey="sent" stroke={BRAND_COLORS[1]} strokeWidth={2} />
                      <Line type="monotone" dataKey="converted" stroke={BRAND_COLORS[2]} strokeWidth={2} />
                      <XAxis dataKey="month" hide />
                      <YAxis hide />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Total Credits Earned", value: "4,500" },
                  { label: "Active Referrals", value: "23" }
                ]}
              />

              {/* 74. Referral Leaderboard & Contests */}
              <FeatureBox
                title="Referral Leaderboard & Contests"
                icon={Award}
                linkTo={createPageUrl("ReferralEngine")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Current Rank", value: "#5" },
                  { label: "Top Referrer", value: "Sarah J." },
                  { label: "Contest Ends", value: "12 days" },
                  { label: "Prize Pool", value: "$5,000" }
                ]}
              />

              {/* 75. Instant Referral Payouts */}
              <FeatureBox
                title="Instant Referral Payouts"
                icon={Coins}
                linkTo={createPageUrl("ReferralEngine")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Payouts This Month", value: "$2,340" },
                  { label: "Processing Time", value: "Instant" },
                  { label: "Success Rate", value: "100%" },
                  { label: "Payment Methods", value: "8" }
                ]}
              />

              {/* 77. AI Review Automation */}
              <FeatureBox
                title="AI Review Automation"
                icon={Star}
                linkTo={createPageUrl("Reviews")}
                bgGradient="from-amber-50 to-orange-100" // Updated to accent
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={reviewData}>
                      <Area dataKey="requests" fill={BRAND_COLORS[1]} fillOpacity={0.3} />
                      <Area dataKey="received" fill={BRAND_COLORS[2]} fillOpacity={0.6} />
                      <XAxis dataKey="month" hide />
                      <YAxis hide />
                      <Tooltip />
                    </AreaChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Avg Rating", value: "4.8★" },
                  { label: "Reviews This Month", value: "31" }
                ]}
              />

              {/* 78. Custom Review Requests */}
              <FeatureBox
                title="Custom Review Requests"
                icon={MessageSquare}
                linkTo={createPageUrl("Reviews")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Requests Sent", value: "156" },
                  { label: "Response Rate", value: "67%" },
                  { label: "Custom Templates", value: "12" },
                  { label: "Avg Response Time", value: "2.3 days" }
                ]}
              />

              {/* 79. Review Syndication to Google */}
              <FeatureBox
                title="Review Syndication to Google"
                icon={Globe}
                linkTo={createPageUrl("Reviews")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Reviews Synced", value: "89" },
                  { label: "Google Rating", value: "4.9★" },
                  { label: "Sync Success Rate", value: "98%" },
                  { label: "Visibility Boost", value: "+240%" }
                ]}
              />
            </div>
          </div>

          {/* Territory & Analytics */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-blue-500 pb-3 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-blue-600" />
              Territory & Analytics
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 72. AI Geographic Farming Tool */}
              <FeatureBox
                title="AI Geographic Farming Tool"
                icon={MapPin}
                linkTo={createPageUrl("Territory")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                chart={
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={territoryData}>
                      <Bar dataKey="leads" fill={BRAND_COLORS[0]} />
                      <Bar dataKey="listings" fill={BRAND_COLORS[2]} />
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip />
                    </BarChart>
                  </ResponsiveContainer>
                }
                stats={[
                  { label: "Territories Claimed", value: "12" },
                  { label: "Market Share", value: "18%" }
                ]}
              />

              {/* Additional Analytics Features */}
              <FeatureBox
                title="Monthly Analytics Reports"
                icon={BarChart3}
                linkTo={createPageUrl("MarketAnalysis")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Reports Generated", value: "24" },
                  { label: "Data Points", value: "500+" },
                  { label: "Export Formats", value: "8" },
                  { label: "Automation", value: "100%" }
                ]}
              />

              <FeatureBox
                title="Real-Time ROI Calculator"
                icon={Calculator}
                linkTo={createPageUrl("Growth")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Current ROI", value: "340%" },
                  { label: "Marketing Spend", value: "$2,450" },
                  { label: "Revenue Generated", value: "$8,330" },
                  { label: "Profit Margin", value: "71%" }
                ]}
              />
            </div>
          </div>

          {/* Team & Brokerage Tools */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-orange-500 pb-3 flex items-center gap-3">
              <Building2 className="w-8 h-8 text-orange-600" />
              Team & Brokerage Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureBox
                title="Team Management Panel"
                icon={Users2}
                linkTo={createPageUrl("Team")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Team Members", value: "8" },
                  { label: "Active Agents", value: "6" },
                  { label: "Team Performance", value: "+15%" },
                  { label: "Pending Invites", value: "1" }
                ]}
              />
              <FeatureBox
                title="Performance Tracking by Agent"
                icon={BarChart3}
                linkTo={createPageUrl("Team")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Top Agent", value: "You" },
                  { label: "Team GCI", value: "$250k" },
                  { label: "Team Deals", value: "45" },
                  { label: "Leaderboard Rank", value: "#1" }
                ]}
              />
              <FeatureBox
                title="Sub-Accounts for Agents & Teams"
                icon={Users}
                linkTo={createPageUrl("SubAccounts")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Total Sub-Accounts", value: "8" },
                  { label: "Accounts Available", value: "2" },
                  { label: "Avg. Usage", value: "75%" },
                  { label: "Highest Performer", value: "Jane Doe" }
                ]}
              />
            </div>
          </div>

          {/* Reseller & Agency Tools */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-green-500 pb-3 flex items-center gap-3">
              <Repeat className="w-8 h-8 text-green-600" />
              Reseller & Agency Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureBox
                title="Reseller White-Label Options"
                icon={Palette}
                linkTo={createPageUrl("Reselling")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Branding", value: "Active" },
                  { label: "Custom Domain", value: "Connected" },
                  { label: "Clients", value: "12" },
                  { label: "MRR", value: "$1,250" }
                ]}
              />
              <FeatureBox
                title="Affiliate Program Dashboard"
                icon={Gift}
                linkTo={createPageUrl("AffiliatePortal")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Affiliate Rank", value: "#23" },
                  { label: "Total Clicks", value: "1,256" },
                  { label: "Conversions", value: "48" },
                  { label: "Owed Payout", value: "$450" }
                ]}
              />
              <FeatureBox
                title="AI App Store / Marketplace"
                icon={Store}
                linkTo={createPageUrl("AppMarketplace")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Installed Apps", value: "5" },
                  { label: "Available Apps", value: "25" },
                  { label: "Pending Updates", value: "1" },
                  { label: "App Credits Spent", value: "500" }
                ]}
              />
            </div>
          </div>

          {/* Platform & Compliance */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-slate-900 border-b-4 border-red-500 pb-3 flex items-center gap-3">
              <Shield className="w-8 h-8 text-red-600" />
              Platform & Compliance
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* 95. Global Compliance Center */}
              <FeatureBox
                title="Global Compliance Center (DNC/GDPR/TPCA)"
                icon={ShieldCheck}
                linkTo={createPageUrl("Compliance")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "DNC Records", value: "2.4M" },
                  { label: "Compliance Score", value: "100%" },
                  { label: "Auto-Scrubbing", value: "Active" },
                  { label: "Violations", value: "0" }
                ]}
              />

              {/* 96. Mobile App Access */}
              <FeatureBox
                title="Mobile App Access (Full Functionality)"
                icon={Smartphone}
                linkTo={createPageUrl("MobileApp")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "App Downloads", value: "12.5K" },
                  { label: "Daily Active Users", value: "89%" },
                  { label: "App Rating", value: "4.8★" },
                  { label: "Features Available", value: "99+" }
                ]}
              />

              {/* 97. In-App Training Videos */}
              <FeatureBox
                title="In-App Training Videos"
                icon={PlayCircle}
                linkTo={createPageUrl("University")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Training Videos", value: "150+" },
                  { label: "Completion Rate", value: "87%" },
                  { label: "Avg. Watch Time", value: "12 min" },
                  { label: "User Satisfaction", value: "4.9/5" }
                ]}
              />

              {/* 98. AIRealtors Academy Access */}
              <FeatureBox
                title="AIRealtors Academy Access"
                icon={GraduationCap}
                linkTo={createPageUrl("University")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Courses Available", value: "45" },
                  { label: "Certificates Earned", value: "12" },
                  { label: "Hours of Content", value: "200+" },
                  { label: "Completion Rate", value: "92%" }
                ]}
              />

              {/* 99. AIRealtors Swag Store */}
              <FeatureBox
                title="AIRealtors Swag Store (Branded Merch)"
                icon={ShoppingCart}
                linkTo={createPageUrl("SwagStore")}
                bgGradient="from-slate-100 to-gray-100" // Updated
                stats={[
                  { label: "Products Available", value: "50+" },
                  { label: "Orders This Month", value: "234" },
                  { label: "Custom Branding", value: "Available" },
                  { label: "Shipping", value: "Worldwide" }
                ]}
              />
            </div>
          </div>

          {/* Footer CTA */}
          <div className="text-center bg-gradient-to-r from-slate-800 to-gray-900 rounded-3xl p-12 text-white mt-16">
            <h2 className="text-4xl font-bold mb-4">
              🚀 99+ AI-Powered Features at Your Fingertips
            </h2>
            <p className="text-xl text-slate-200 mb-6">
              This is just the beginning. Your AI real estate empire starts here.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button size="lg" className="bg-white text-slate-800 hover:bg-gray-100">
                Explore All Features
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-800">
                Watch Demo
              </Button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
