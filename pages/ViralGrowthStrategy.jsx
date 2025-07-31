import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Zap, 
  Target, 
  Crown,
  Rocket,
  Star,
  DollarSign,
  Share2
} from 'lucide-react';

export default function ViralGrowthStrategy() {
  const growthHacks = [
    {
      title: "Freemium Viral Loop",
      description: "Massive value before payment creates evangelical users",
      tactics: [
        "500 free credits = 50+ AI-generated content pieces",
        "14-day full access trial (no feature restrictions)",
        "Show time savings: 20+ hours/week automation",
        "Calculate ROI: $50K+ annual revenue increase potential"
      ],
      impact: "90%+ trial-to-paid conversion",
      timeline: "Immediate",
      cost: "Low",
      viralCoefficient: "2.3x"
    },
    {
      title: "Geographic Arbitrage Pricing",
      description: "Price according to local purchasing power for maximum adoption",
      tactics: [
        "Tier 1 Markets (US/CA/UK): Premium pricing $97-997/month",
        "Tier 2 Markets (EU): Moderate pricing €77-347/month", 
        "Tier 3 Markets (APAC): Growth pricing $47-197/month",
        "Tier 4 Markets (MEA): Penetration pricing $37-167/month"
      ],
      impact: "10x faster global expansion",
      timeline: "3 months",
      cost: "Medium",
      viralCoefficient: "4.1x"
    },
    {
      title: "Network Effect Amplification",
      description: "Every user acquisition drives exponential growth",
      tactics: [
        "Referral rewards: 1 free month per successful signup",
        "Brokerage partnerships: Bulk pricing + rev share",
        "Success story amplification through AI-generated case studies",
        "Industry influencer partnership program"
      ],
      impact: "Exponential word-of-mouth growth",
      timeline: "6 months",
      cost: "High",
      viralCoefficient: "5.7x"
    },
    {
      title: "Content Marketing Engine",
      description: "AI-powered content attracts and converts leads organically",
      tactics: [
        "Daily AI-generated real estate market insights",
        "Platform-generated success stories and case studies",
        "User-generated content amplification",
        "SEO-optimized landing pages for every major market"
      ],
      impact: "Organic traffic dominance",
      timeline: "9 months",
      cost: "Low",
      viralCoefficient: "1.8x"
    },
    {
      title: "Partnership Ecosystem",
      description: "Strategic partnerships create distribution channels",
      tactics: [
        "MLS integration partnerships",
        "Real estate association endorsements",
        "Technology partner integrations (CRMs, etc.)",
        "Educational institution partnerships"
      ],
      impact: "Enterprise sales acceleration",
      timeline: "12 months",
      cost: "High",
      viralCoefficient: "3.2x"
    },
    {
      title: "AI-Powered Personalization",
      description: "Hyper-relevant experiences drive retention and referrals",
      tactics: [
        "Market-specific AI training for local relevance",
        "Behavioral analytics-driven feature recommendations",
        "Personalized onboarding flows by experience level",
        "Dynamic pricing based on usage patterns"
      ],
      impact: "Reduced churn, increased LTV",
      timeline: "18 months",
      cost: "High",
      viralCoefficient: "2.9x"
    }
  ];

  const marketDomination = {
    phase1: {
      title: "Market Entry (Months 1-6)",
      target: "English-speaking markets",
      customers: "0 → 1,000",
      revenue: "$0 → $200K MRR",
      tactics: [
        "Launch in US, Canada, UK, Australia",
        "Freemium model with viral mechanics",
        "Influencer partnerships in real estate",
        "Content marketing and SEO dominance"
      ]
    },
    phase2: {
      title: "European Expansion (Months 6-12)",
      target: "EU markets",
      customers: "1,000 → 5,000",
      revenue: "$200K → $1M MRR",
      tactics: [
        "GDPR-compliant rollout in major EU countries",
        "Localized pricing and features",
        "European real estate partnership deals",
        "Multi-language AI content generation"
      ]
    },
    phase3: {
      title: "Global Dominance (Months 12-24)",
      target: "Worldwide coverage",
      customers: "5,000 → 20,000",
      revenue: "$1M → $5M MRR",
      tactics: [
        "Asia Pacific and emerging market entry",
        "Enterprise and white-label offerings",
        "API ecosystem for third-party integrations",
        "IPO preparation and market leadership"
      ]
    }
  };

  const competitiveAdvantages = [
    {
      title: "First-Mover AI Advantage",
      description: "First comprehensive AI platform specifically for real estate",
      moat: "18-24 month technology lead"
    },
    {
      title: "Global-First Architecture", 
      description: "Built for 70+ countries from day one, not retrofitted",
      moat: "Regulatory compliance and localization barriers"
    },
    {
      title: "Enterprise Infrastructure",
      description: "AWS-based, infinitely scalable, enterprise-grade security",
      moat: "High switching costs and integration complexity"
    },
    {
      title: "Network Effects",
      description: "Platform becomes more valuable as more agents join",
      moat: "Exponential value creation with scale"
    },
    {
      title: "Data Advantages",
      description: "AI improves with every interaction across all users",
      moat: "Compound learning and personalization"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900">Viral Growth & Market Domination</h1>
              <p className="text-xl text-slate-600">Strategic Blueprint for Global Real Estate AI Leadership</p>
            </div>
          </div>
        </div>

        {/* Growth Hacks Matrix */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {growthHacks.map((hack, index) => (
            <Card key={index} className="shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{hack.title}</CardTitle>
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    {hack.viralCoefficient}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{hack.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-slate-800 mb-2">Tactics:</h4>
                  <ul className="text-xs space-y-1">
                    {hack.tactics.map((tactic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                        <span className="text-slate-700">{tactic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="font-medium text-slate-600">Timeline:</span>
                    <p className="text-slate-800">{hack.timeline}</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-600">Cost:</span>
                    <p className={`font-semibold ${
                      hack.cost === 'Low' ? 'text-green-600' : 
                      hack.cost === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                    }`}>{hack.cost}</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-600">Impact:</span>
                    <p className="text-purple-600 font-semibold">{hack.impact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Market Domination Phases */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Target className="w-6 h-6 text-red-500" />
              Market Domination Roadmap
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-3 gap-6">
              {Object.entries(marketDomination).map(([key, phase], index) => (
                <div key={key} className="relative">
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
                  )}
                  
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <CardTitle className="text-lg">{phase.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-slate-600">Target:</span>
                          <p className="text-slate-800">{phase.target}</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">Customers:</span>
                          <p className="text-purple-600 font-bold">{phase.customers}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium text-slate-600">Revenue:</span>
                          <p className="text-green-600 font-bold text-lg">{phase.revenue}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-slate-800 mb-2">Key Tactics:</h4>
                        <ul className="text-xs space-y-1">
                          {phase.tactics.map((tactic, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-slate-700">{tactic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Competitive Moats */}
        <Card className="shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl text-center">🏰 Competitive Moats & Defensibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitiveAdvantages.map((advantage, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <h3 className="font-bold text-lg mb-2">{advantage.title}</h3>
                  <p className="text-sm opacity-90 mb-3">{advantage.description}</p>
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">
                    {advantage.moat}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trajectory */}
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <DollarSign className="w-6 h-6 text-green-500" />
              Revenue Trajectory & Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-bold text-green-800">Year 1</h3>
                  <div className="text-2xl font-extrabold text-green-600">$2.4M ARR</div>
                  <p className="text-sm text-green-700">1K customers</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-bold text-blue-800">Year 2</h3>
                  <div className="text-2xl font-extrabold text-blue-600">$12M ARR</div>
                  <p className="text-sm text-blue-700">5K customers</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-bold text-purple-800">Year 3</h3>
                  <div className="text-2xl font-extrabold text-purple-600">$60M ARR</div>
                  <p className="text-sm text-purple-700">20K customers</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-bold text-yellow-800">Year 5</h3>
                  <div className="text-2xl font-extrabold text-yellow-600">$500M ARR</div>
                  <p className="text-sm text-yellow-700">IPO Ready</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-600 to-purple-600 text-white p-6 rounded-xl text-center">
                <h3 className="text-2xl font-bold mb-2">🎯 Ultimate Goal: Global Market Leadership</h3>
                <p className="text-lg opacity-90">
                  Become the #1 AI platform for real estate professionals worldwide
                </p>
                <div className="mt-4 flex justify-center gap-4 text-sm">
                  <Badge className="bg-white/20 text-white">500,000+ Active Users</Badge>
                  <Badge className="bg-white/20 text-white">70+ Countries</Badge>
                  <Badge className="bg-white/20 text-white">$1B+ Valuation</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}