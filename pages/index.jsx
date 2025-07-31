import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import AITools from "./AITools";

import Territory from "./Territory";

import Leads from "./Leads";

import Campaigns from "./Campaigns";

import Profile from "./Profile";

import Deployment from "./Deployment";

import Onboarding from "./Onboarding";

import TrialSignup from "./TrialSignup";

import Listings from "./Listings";

import EmailSequences from "./EmailSequences";

import Reviews from "./Reviews";

import Appointments from "./Appointments";

import WebsiteBuilder from "./WebsiteBuilder";

import Inbox from "./Inbox";

import Growth from "./Growth";

import Transactions from "./Transactions";

import Team from "./Team";

import Compliance from "./Compliance";

import Feedback from "./Feedback";

import AgencyDashboard from "./AgencyDashboard";

import Prospecting from "./Prospecting";

import SubAccounts from "./SubAccounts";

import AccountSnapshots from "./AccountSnapshots";

import Reselling from "./Reselling";

import AddOns from "./AddOns";

import AffiliatePortal from "./AffiliatePortal";

import AppMarketplace from "./AppMarketplace";

import TemplateLibrary from "./TemplateLibrary";

import Partners from "./Partners";

import University from "./University";

import SaaSEducation from "./SaaSEducation";

import Ideas from "./Ideas";

import SwagStore from "./SwagStore";

import SummerOfAI from "./SummerOfAI";

import MobileApp from "./MobileApp";

import DataVerification from "./DataVerification";

import CRM from "./CRM";

import DocumentCenter from "./DocumentCenter";

import SystemStatus from "./SystemStatus";

import SystemHealth from "./SystemHealth";

import FeedbackDashboard from "./FeedbackDashboard";

import Pricing from "./Pricing";

import TermsOfService from "./TermsOfService";

import PrivacyPolicy from "./PrivacyPolicy";

import CookiePolicy from "./CookiePolicy";

import DataPolicy from "./DataPolicy";

import GlobalPricingStrategy from "./GlobalPricingStrategy";

import ViralGrowthStrategy from "./ViralGrowthStrategy";

import FounderCampaign from "./FounderCampaign";

import VoiceOutbound from "./VoiceOutbound";

import VoiceInbound from "./VoiceInbound";

import EmailCampaigns from "./EmailCampaigns";

import SMSCampaigns from "./SMSCampaigns";

import SocialMediaAI from "./SocialMediaAI";

import AIEmployee from "./AIEmployee";

import AIContentAutopilot from "./AIContentAutopilot";

import LeadMagnets from "./LeadMagnets";

import AIVideoGenerator from "./AIVideoGenerator";

import MarketAnalysis from "./MarketAnalysis";

import CompetitorWatchdog from "./CompetitorWatchdog";

import AIListingWriter from "./AIListingWriter";

import VRTours from "./VRTours";

import ListingAnalytics from "./ListingAnalytics";

import ReferralEngine from "./ReferralEngine";

import GoalTracker from "./GoalTracker";

import DigitalTwin from "./DigitalTwin";

import Integrations from "./Integrations";

import Automations from "./Automations";

import Security from "./Security";

import AILeadFinder from "./AILeadFinder";

import LeadSegmentation from "./LeadSegmentation";

import DealTracker from "./DealTracker";

import ReelsGenerator from "./ReelsGenerator";

import MarketReportGenerator from "./MarketReportGenerator";

import BuyerGuideCreator from "./BuyerGuideCreator";

import CMAGenerator from "./CMAGenerator";

import TextToVideo from "./TextToVideo";

import SuccessStories from "./SuccessStories";

import HowItWorks from "./HowItWorks";

import InfluencerFinder from "./InfluencerFinder";

import CreditPurchase from "./CreditPurchase";

import AIExecutiveSecretary from "./AIExecutiveSecretary";

import RealtorGuide from "./RealtorGuide";

import MarketingHome from "./MarketingHome";

import InfrastructureDashboard from "./InfrastructureDashboard";

import AWSHosting from "./AWSHosting";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    AITools: AITools,
    
    Territory: Territory,
    
    Leads: Leads,
    
    Campaigns: Campaigns,
    
    Profile: Profile,
    
    Deployment: Deployment,
    
    Onboarding: Onboarding,
    
    TrialSignup: TrialSignup,
    
    Listings: Listings,
    
    EmailSequences: EmailSequences,
    
    Reviews: Reviews,
    
    Appointments: Appointments,
    
    WebsiteBuilder: WebsiteBuilder,
    
    Inbox: Inbox,
    
    Growth: Growth,
    
    Transactions: Transactions,
    
    Team: Team,
    
    Compliance: Compliance,
    
    Feedback: Feedback,
    
    AgencyDashboard: AgencyDashboard,
    
    Prospecting: Prospecting,
    
    SubAccounts: SubAccounts,
    
    AccountSnapshots: AccountSnapshots,
    
    Reselling: Reselling,
    
    AddOns: AddOns,
    
    AffiliatePortal: AffiliatePortal,
    
    AppMarketplace: AppMarketplace,
    
    TemplateLibrary: TemplateLibrary,
    
    Partners: Partners,
    
    University: University,
    
    SaaSEducation: SaaSEducation,
    
    Ideas: Ideas,
    
    SwagStore: SwagStore,
    
    SummerOfAI: SummerOfAI,
    
    MobileApp: MobileApp,
    
    DataVerification: DataVerification,
    
    CRM: CRM,
    
    DocumentCenter: DocumentCenter,
    
    SystemStatus: SystemStatus,
    
    SystemHealth: SystemHealth,
    
    FeedbackDashboard: FeedbackDashboard,
    
    Pricing: Pricing,
    
    TermsOfService: TermsOfService,
    
    PrivacyPolicy: PrivacyPolicy,
    
    CookiePolicy: CookiePolicy,
    
    DataPolicy: DataPolicy,
    
    GlobalPricingStrategy: GlobalPricingStrategy,
    
    ViralGrowthStrategy: ViralGrowthStrategy,
    
    FounderCampaign: FounderCampaign,
    
    VoiceOutbound: VoiceOutbound,
    
    VoiceInbound: VoiceInbound,
    
    EmailCampaigns: EmailCampaigns,
    
    SMSCampaigns: SMSCampaigns,
    
    SocialMediaAI: SocialMediaAI,
    
    AIEmployee: AIEmployee,
    
    AIContentAutopilot: AIContentAutopilot,
    
    LeadMagnets: LeadMagnets,
    
    AIVideoGenerator: AIVideoGenerator,
    
    MarketAnalysis: MarketAnalysis,
    
    CompetitorWatchdog: CompetitorWatchdog,
    
    AIListingWriter: AIListingWriter,
    
    VRTours: VRTours,
    
    ListingAnalytics: ListingAnalytics,
    
    ReferralEngine: ReferralEngine,
    
    GoalTracker: GoalTracker,
    
    DigitalTwin: DigitalTwin,
    
    Integrations: Integrations,
    
    Automations: Automations,
    
    Security: Security,
    
    AILeadFinder: AILeadFinder,
    
    LeadSegmentation: LeadSegmentation,
    
    DealTracker: DealTracker,
    
    ReelsGenerator: ReelsGenerator,
    
    MarketReportGenerator: MarketReportGenerator,
    
    BuyerGuideCreator: BuyerGuideCreator,
    
    CMAGenerator: CMAGenerator,
    
    TextToVideo: TextToVideo,
    
    SuccessStories: SuccessStories,
    
    HowItWorks: HowItWorks,
    
    InfluencerFinder: InfluencerFinder,
    
    CreditPurchase: CreditPurchase,
    
    AIExecutiveSecretary: AIExecutiveSecretary,
    
    RealtorGuide: RealtorGuide,
    
    MarketingHome: MarketingHome,
    
    InfrastructureDashboard: InfrastructureDashboard,
    
    AWSHosting: AWSHosting,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/AITools" element={<AITools />} />
                
                <Route path="/Territory" element={<Territory />} />
                
                <Route path="/Leads" element={<Leads />} />
                
                <Route path="/Campaigns" element={<Campaigns />} />
                
                <Route path="/Profile" element={<Profile />} />
                
                <Route path="/Deployment" element={<Deployment />} />
                
                <Route path="/Onboarding" element={<Onboarding />} />
                
                <Route path="/TrialSignup" element={<TrialSignup />} />
                
                <Route path="/Listings" element={<Listings />} />
                
                <Route path="/EmailSequences" element={<EmailSequences />} />
                
                <Route path="/Reviews" element={<Reviews />} />
                
                <Route path="/Appointments" element={<Appointments />} />
                
                <Route path="/WebsiteBuilder" element={<WebsiteBuilder />} />
                
                <Route path="/Inbox" element={<Inbox />} />
                
                <Route path="/Growth" element={<Growth />} />
                
                <Route path="/Transactions" element={<Transactions />} />
                
                <Route path="/Team" element={<Team />} />
                
                <Route path="/Compliance" element={<Compliance />} />
                
                <Route path="/Feedback" element={<Feedback />} />
                
                <Route path="/AgencyDashboard" element={<AgencyDashboard />} />
                
                <Route path="/Prospecting" element={<Prospecting />} />
                
                <Route path="/SubAccounts" element={<SubAccounts />} />
                
                <Route path="/AccountSnapshots" element={<AccountSnapshots />} />
                
                <Route path="/Reselling" element={<Reselling />} />
                
                <Route path="/AddOns" element={<AddOns />} />
                
                <Route path="/AffiliatePortal" element={<AffiliatePortal />} />
                
                <Route path="/AppMarketplace" element={<AppMarketplace />} />
                
                <Route path="/TemplateLibrary" element={<TemplateLibrary />} />
                
                <Route path="/Partners" element={<Partners />} />
                
                <Route path="/University" element={<University />} />
                
                <Route path="/SaaSEducation" element={<SaaSEducation />} />
                
                <Route path="/Ideas" element={<Ideas />} />
                
                <Route path="/SwagStore" element={<SwagStore />} />
                
                <Route path="/SummerOfAI" element={<SummerOfAI />} />
                
                <Route path="/MobileApp" element={<MobileApp />} />
                
                <Route path="/DataVerification" element={<DataVerification />} />
                
                <Route path="/CRM" element={<CRM />} />
                
                <Route path="/DocumentCenter" element={<DocumentCenter />} />
                
                <Route path="/SystemStatus" element={<SystemStatus />} />
                
                <Route path="/SystemHealth" element={<SystemHealth />} />
                
                <Route path="/FeedbackDashboard" element={<FeedbackDashboard />} />
                
                <Route path="/Pricing" element={<Pricing />} />
                
                <Route path="/TermsOfService" element={<TermsOfService />} />
                
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                
                <Route path="/CookiePolicy" element={<CookiePolicy />} />
                
                <Route path="/DataPolicy" element={<DataPolicy />} />
                
                <Route path="/GlobalPricingStrategy" element={<GlobalPricingStrategy />} />
                
                <Route path="/ViralGrowthStrategy" element={<ViralGrowthStrategy />} />
                
                <Route path="/FounderCampaign" element={<FounderCampaign />} />
                
                <Route path="/VoiceOutbound" element={<VoiceOutbound />} />
                
                <Route path="/VoiceInbound" element={<VoiceInbound />} />
                
                <Route path="/EmailCampaigns" element={<EmailCampaigns />} />
                
                <Route path="/SMSCampaigns" element={<SMSCampaigns />} />
                
                <Route path="/SocialMediaAI" element={<SocialMediaAI />} />
                
                <Route path="/AIEmployee" element={<AIEmployee />} />
                
                <Route path="/AIContentAutopilot" element={<AIContentAutopilot />} />
                
                <Route path="/LeadMagnets" element={<LeadMagnets />} />
                
                <Route path="/AIVideoGenerator" element={<AIVideoGenerator />} />
                
                <Route path="/MarketAnalysis" element={<MarketAnalysis />} />
                
                <Route path="/CompetitorWatchdog" element={<CompetitorWatchdog />} />
                
                <Route path="/AIListingWriter" element={<AIListingWriter />} />
                
                <Route path="/VRTours" element={<VRTours />} />
                
                <Route path="/ListingAnalytics" element={<ListingAnalytics />} />
                
                <Route path="/ReferralEngine" element={<ReferralEngine />} />
                
                <Route path="/GoalTracker" element={<GoalTracker />} />
                
                <Route path="/DigitalTwin" element={<DigitalTwin />} />
                
                <Route path="/Integrations" element={<Integrations />} />
                
                <Route path="/Automations" element={<Automations />} />
                
                <Route path="/Security" element={<Security />} />
                
                <Route path="/AILeadFinder" element={<AILeadFinder />} />
                
                <Route path="/LeadSegmentation" element={<LeadSegmentation />} />
                
                <Route path="/DealTracker" element={<DealTracker />} />
                
                <Route path="/ReelsGenerator" element={<ReelsGenerator />} />
                
                <Route path="/MarketReportGenerator" element={<MarketReportGenerator />} />
                
                <Route path="/BuyerGuideCreator" element={<BuyerGuideCreator />} />
                
                <Route path="/CMAGenerator" element={<CMAGenerator />} />
                
                <Route path="/TextToVideo" element={<TextToVideo />} />
                
                <Route path="/SuccessStories" element={<SuccessStories />} />
                
                <Route path="/HowItWorks" element={<HowItWorks />} />
                
                <Route path="/InfluencerFinder" element={<InfluencerFinder />} />
                
                <Route path="/CreditPurchase" element={<CreditPurchase />} />
                
                <Route path="/AIExecutiveSecretary" element={<AIExecutiveSecretary />} />
                
                <Route path="/RealtorGuide" element={<RealtorGuide />} />
                
                <Route path="/MarketingHome" element={<MarketingHome />} />
                
                <Route path="/InfrastructureDashboard" element={<InfrastructureDashboard />} />
                
                <Route path="/AWSHosting" element={<AWSHosting />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}