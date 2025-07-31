import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Zap, 
  Crown,
  Target,
  Rocket,
  Shield,
  Star
} from 'lucide-react';

export default function GlobalPricingStrategy() {
  const [selectedRegion, setSelectedRegion] = useState('northamerica');

  const pricingTiers = {
    northamerica: {
      region: "North America (US, CA)",
      currency: "USD",
      plans: [
        {
          name: "Trial",
          price: "$1",
          period: "14 days",
          description: "Experience the power with minimal risk",
          credits: 500,
          features: [
            "Full platform access",
            "AI content generation",
            "Basic CRM",
            "1 social account",
            "Email support"
          ],
          highlight: false,
          viralHook: "Almost free trial to remove barriers"
        },
        {
          name: "Starter",
          price: "$97",
          period: "month",
          description: "Perfect for new agents building their business",
          credits: 2000,
          features: [
            "Everything in Trial",
            "3 social accounts",
            "AI website builder",
            "Email sequences",
            "Phone support",
            "Basic analytics"
          ],
          highlight: false,
          viralHook: "Under $100 psychological barrier"
        },
        {
          name: "Professional",
          price: "$197",
          period: "month",
          description: "For established agents scaling their operations",
          credits: 5000,
          features: [
            "Everything in Starter",
            "Unlimited social accounts",
            "Advanced AI tools",
            "Transaction management",
            "Team collaboration",
            "Advanced analytics",
            "Priority support"
          ],
          highlight: true,
          viralHook: "Sweet spot for serious agents"
        },
        {
          name: "Premium",
          price: "$397",
          period: "month",
          description: "High-volume agents and small teams",
          credits: 15000,
          features: [
            "Everything in Professional",
            "Digital twin creation",
            "White-label options",
            "API access",
            "Custom integrations",
            "Dedicated success manager"
          ],
          highlight: false,
          viralHook: "Luxury positioning for top performers"
        },
        {
          name: "Enterprise",
          price: "$997",
          period: "month",
          description: "Brokerages and large teams",
          credits: 50000,
          features: [
            "Everything in Premium",
            "Multi-agent management",
            "Custom branding",
            "Advanced compliance tools",
            "On-premise deployment option",
            "24/7 dedicated support"
          ],
          highlight: false,
          viralHook: "Enterprise credibility and features"
        }
      ]
    },
    europe: {
      region: "Europe (UK, EU)",
      currency: "EUR",
      plans: [
        {
          name: "Trial",
          price: "€1",
          period: "14 days",
          description: "GDPR-compliant trial with full features",
          credits: 500,
          features: [
            "Full platform access",
            "GDPR compliance built-in",
            "Multi-language support",
            "Local market data",
            "EU data residency"
          ],
          highlight: false,
          viralHook: "Compliance-first messaging"
        },
        {
          name: "Starter",
          price: "€87",
          period: "month",
          description: "For agents in competitive European markets",
          credits: 2000,
          features: [
            "Everything in Trial",
            "Local currency support",
            "Regional compliance",
            "Local property data",
            "Multi-language AI content"
          ],
          highlight: false,
          viralHook: "Localized for European market"
        },
        {
          name: "Professional",
          price: "€177",
          period: "month",
          description: "Advanced tools for European estate agents",
          credits: 5000,
          features: [
            "Everything in Starter",
            "Cross-border transaction tools",
            "Currency conversion",
            "EU regulatory compliance",
            "Local market analytics"
          ],
          highlight: true,
          viralHook: "European-specific features"
        },
        {
          name: "Premium",
          price: "€347",
          period: "month",
          description: "For established European agencies",
          credits: 15000,
          features: [
            "Everything in Professional",
            "Multi-country operations",
            "Advanced GDPR tools",
            "European market insights",
            "Priority European support"
          ],
          highlight: false,
          viralHook: "Premium European positioning"
        }
      ]
    },
    asiapacific: {
      region: "Asia Pacific",
      currency: "USD",
      plans: [
        {
          name: "Trial",
          price: "$0.50",
          period: "14 days",
          description: "Ultra-low barrier entry for emerging markets",
          credits: 500,
          features: [
            "Full platform access",
            "Local language support",
            "Regional property formats",
            "Local currency display",
            "Time zone optimization"
          ],
          highlight: false,
          viralHook: "Extremely low price point for market penetration"
        },
        {
          name: "Starter",
          price: "$47",
          period: "month",
          description: "Affordable for growing markets",
          credits: 2000,
          features: [
            "Everything in Trial",
            "Local market data",
            "Cultural customization",
            "Regional compliance",
            "Local payment methods"
          ],
          highlight: false,
          viralHook: "50% discount vs Western markets"
        },
        {
          name: "Professional",
          price: "$97",
          period: "month",
          description: "Full features at emerging market prices",
          credits: 5000,
          features: [
            "Everything in Starter",
            "Advanced AI tools",
            "Multi-market support",
            "Cultural AI training",
            "Regional partnerships"
          ],
          highlight: true,
          viralHook: "Western features at local prices"
        },
        {
          name: "Premium",
          price: "$197",
          period: "month",
          description: "Enterprise features for APAC leaders",
          credits: 15000,
          features: [
            "Everything in Professional",
            "Multi-country deployment",
            "Local integration partners",
            "Cultural market insights",
            "Regional success management"
          ],
          highlight: false,
          viralHook: "Premium positioning in growth markets"
        }
      ]
    },
    middleeast: {
      region: "Middle East & Africa",
      currency: "USD",
      plans: [
        {
          name: "Trial",
          price: "$0.25",
          period: "14 days",
          description: "Ultra-accessible entry point",
          credits: 500,
          features: [
            "Full platform access",
            "Arabic language support",
            "Islamic finance compatibility",
            "Regional property types",
            "Cultural customization"
          ],
          highlight: false,
          viralHook: "Lowest price globally for maximum adoption"
        },
        {
          name: "Starter",
          price: "$37",
          period: "month",
          description: "Designed for emerging real estate markets",
          credits: 2000,
          features: [
            "Everything in Trial",
            "Local regulatory compliance",
            "Cultural market data",
            "Regional partnerships",
            "Local payment integration"
          ],
          highlight: false,
          viralHook: "Extremely competitive regional pricing"
        },
        {
          name: "Professional",
          price: "$77",
          period: "month",
          description: "Advanced tools for developing markets",
          credits: 5000,
          features: [
            "Everything in Starter",
            "Multi-language AI content",
            "Cross-border tools",
            "Cultural AI training",
            "Regional market insights"
          ],
          highlight: true,
          viralHook: "First-world technology at local prices"
        },
        {
          name: "Premium",
          price: "$167",
          period: "month",
          description: "Enterprise solution for regional leaders",
          credits: 15000,
          features: [
            "Everything in Professional",
            "Multi-country support",
            "Cultural compliance tools",
            "Regional success management",
            "Local partnership network"
          ],
          highlight: false,
          viralHook: "Regional market leadership positioning"
        }
      ]
    }
  };

  const viralStrategies = [
    {
      title: "Freemium Viral Loop",
      description: "Users get massive value before paying",
      tactics: [
        "500 free credits = 50+ pieces of AI content",
        "Full platform access for 14 days",
        "No feature restrictions during trial",
        "Viral sharing incentives for referrals"
      ],
      impact: "90%+ trial-to-paid conversion rate"
    },
    {
      title: "Geographic Arbitrage",
      description: "Price according to local purchasing power",
      tactics: [
        "North America: Premium pricing ($97-$997)",
        "Europe: Slight discount for compliance value",
        "Asia Pacific: 50% discount for market penetration",
        "MEA: 75% discount for maximum adoption"
      ],
      impact: "10x faster global expansion"
    },
    {
      title: "Network Effect Amplification",
      description: "Every user brings more users",
      tactics: [
        "Referral rewards: 1 month free per signup",
        "Team/brokerage viral multipliers",
        "Success story social proof engine",
        "Industry influencer partnership program"
      ],
      impact: "Exponential growth through word-of-mouth"
    },
    {
      title: "Value Demonstration Strategy",
      description: "Show ROI before asking for payment",
      tactics: [
        "Generate first lead magnet in 60 seconds",
        "Create 30 days of social content instantly",
        "Show potential time savings: 20+ hours/week",
        "Calculate revenue impact: $50K+ annual increase"
      ],
      impact: "Value-based selling vs feature competition"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900">Global Pricing & Viral Strategy</h1>
              <p className="text-xl text-slate-600">World Domination Through Strategic Market Penetration</p>
            </div>
          </div>
        </div>

        {/* Viral Strategy Overview */}
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center">🚀 Viral Adoption Strategy 🚀</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {viralStrategies.map((strategy, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4">
                  <h3 className="font-bold text-lg mb-2">{strategy.title}</h3>
                  <p className="text-sm mb-3 opacity-90">{strategy.description}</p>
                  <ul className="text-xs space-y-1 mb-3">
                    {strategy.tactics.map((tactic, i) => (
                      <li key={i} className="opacity-80">• {tactic}</li>
                    ))}
                  </ul>
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                    {strategy.impact}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Pricing Tabs */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Regional Pricing Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedRegion} onValueChange={setSelectedRegion} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="northamerica">🇺🇸🇨🇦 North America</TabsTrigger>
                <TabsTrigger value="europe">🇪🇺🇬🇧 Europe</TabsTrigger>
                <TabsTrigger value="asiapacific">🌏 Asia Pacific</TabsTrigger>
                <TabsTrigger value="middleeast">🌍 MEA</TabsTrigger>
              </TabsList>
              
              {Object.entries(pricingTiers).map(([key, region]) => (
                <TabsContent key={key} value={key}>
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-slate-900">{region.region}</h3>
                      <p className="text-slate-600">Optimized for local market conditions and purchasing power</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                      {region.plans.map((plan, index) => (
                        <Card key={index} className={`relative overflow-hidden ${plan.highlight ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'}`}>
                          {plan.highlight && (
                            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                              MOST POPULAR
                            </div>
                          )}
                          
                          <CardHeader className={plan.highlight ? 'pt-12' : ''}>
                            <CardTitle className="text-xl">{plan.name}</CardTitle>
                            <div className="text-3xl font-bold text-slate-900">
                              {plan.price}
                              <span className="text-sm text-slate-600">/{plan.period}</span>
                            </div>
                            <p className="text-sm text-slate-600">{plan.description}</p>
                          </CardHeader>
                          
                          <CardContent>
                            <div className="space-y-3">
                              <div className="text-center">
                                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                  {plan.credits.toLocaleString()} Credits/Month
                                </Badge>
                              </div>
                              
                              <ul className="space-y-2 text-sm">
                                {plan.features.map((feature, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                                <h4 className="font-semibold text-yellow-800 text-xs mb-1">Viral Hook:</h4>
                                <p className="text-yellow-700 text-xs">{plan.viralHook}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Market Domination Tactics */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" />
                Market Penetration Tactics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">🎯 Geographic Rollout Strategy</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Phase 1: English markets (US, CA, UK, AU)</li>
                    <li>• Phase 2: European expansion (DE, FR, ES, IT)</li>
                    <li>• Phase 3: Asia Pacific (SG, HK, JP, KR)</li>
                    <li>• Phase 4: Emerging markets (LATAM, MEA, India)</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💰 Revenue Optimization</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• High-value markets: Premium pricing</li>
                    <li>• Growth markets: Penetration pricing</li>
                    <li>• Volume discounts: Enterprise packages</li>
                    <li>• Freemium conversion: Value demonstration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-5 h-5 text-purple-500" />
                Viral Growth Multipliers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">🔥 Network Effect Engines</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Referral rewards: Free months for signups</li>
                    <li>• Brokerage partnerships: Bulk pricing</li>
                    <li>• Success story amplification</li>
                    <li>• Industry influencer program</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">⚡ Competitive Advantages</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• First-mover AI advantage in real estate</li>
                    <li>• Global-first architecture</li>
                    <li>• Enterprise-grade infrastructure</li>
                    <li>• Comprehensive feature set</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Projections */}
        <Card className="bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center">💎 Revenue Projection Model 💎</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Year 1 Target</h3>
                <div className="text-4xl font-extrabold mb-2">$2.4M ARR</div>
                <ul className="text-sm space-y-1 opacity-90">
                  <li>• 1,000 paying customers</li>
                  <li>• $200 average monthly revenue</li>
                  <li>• 85% gross margin</li>
                  <li>• 5% monthly churn rate</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">Year 2 Target</h3>
                <div className="text-4xl font-extrabold mb-2">$12M ARR</div>
                <ul className="text-sm space-y-1 opacity-90">
                  <li>• 5,000 paying customers</li>
                  <li>• $240 average monthly revenue</li>
                  <li>• 87% gross margin</li>
                  <li>• 3% monthly churn rate</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">Year 3 Target</h3>
                <div className="text-4xl font-extrabold mb-2">$60M ARR</div>
                <ul className="text-sm space-y-1 opacity-90">
                  <li>• 20,000 paying customers</li>
                  <li>• $300 average monthly revenue</li>
                  <li>• 90% gross margin</li>
                  <li>• 2% monthly churn rate</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                🏆 Target: $100M+ ARR by Year 5 (IPO Ready)
              </Badge>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}