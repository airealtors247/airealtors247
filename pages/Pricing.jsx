
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, Coins, ArrowRight } from 'lucide-react'; // Added ArrowRight
import { createPageUrl } from '@/utils';
import PlanCard from '../components/pricing/PlanCard';
import CreditPurchaseSlider from '../components/pricing/CreditPurchaseSlider';
import { createMainAppUrl } from '../components/utils/AppLinks';
import { Button } from "@/components/ui/button"; // Added Button import

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('annual');
  const [bottomRowBilling, setBottomRowBilling] = useState('annual');
  const [user, setUser] = useState(null); // Mock user for slider

  const topRowPlans = [
    {
      id: 'explorer',
      name: 'AI Explorer',
      description: 'Discover how a little organization can make a big difference. 14-day free trial.',
      monthlyPrice: 0,
      annualPrice: 0,
      setupFee: 0,
      originalSetupFee: 0,
      monthlyCredits: 250,
      annualCredits: 250,
      isFree: true,
      autoEnrollPrice: 47,
      autoEnrollCredits: 1250,
      trialDays: 14,
      features: [
        '14-day free trial (250 credits total)',
        'Auto-enrolls to $47/month after 14 days',
        'Access to all 99+ AI features during trial',
        'Connect 1 social media account',
        'Generate 5-10 social posts',
        'Community support',
        'Credit card required for trial activation',
        'Cancel anytime during trial period'
      ],
      highlight: false,
      creditExamples: [
        'Generate 5-10 social posts',
        'Write a few property descriptions',
        'Test AI chat features',
        'Try voice calling features',
        'Create sample lead magnets'
      ]
    },
    {
      id: 'starter',
      name: 'AI Starter',
      description: 'For solo agents who want to stay organized and follow up consistently.',
      monthlyPrice: 97,
      annualPrice: 67, // Updated from 47
      setupFee: 97,
      originalSetupFee: 1497,
      monthlyCredits: 1250,
      annualCredits: 2500,
      features: [
        '1,250 monthly credits (2,500 with annual)',
        'All 99+ AI features included',
        'Connect 3 social media accounts',
        'AI voice calls & SMS campaigns',
        'Email automation & sequences',
        'Basic analytics dashboard',
        'No setup fee (was $1,497)'
      ],
      highlight: false,
      creditExamples: [
        'Generate ~75 social posts',
        'Make ~250 AI voice calls (1 min each)',
        'Send ~1,250 SMS messages'
      ],
      creditExamplesAnnual: [
        'Generate ~150 social posts',
        'Make ~500 AI voice calls (1 min each)',
        'Send ~2,500 SMS messages'
      ]
    },
    {
      id: 'accelerator',
      name: 'AI Accelerator',
      description: 'For busy agents ready to automate marketing and save more time.',
      monthlyPrice: 297, // Updated from 197
      annualPrice: 197, // Updated from 97
      setupFee: 297,
      originalSetupFee: 2497,
      monthlyCredits: 2500,
      annualCredits: 5000,
      features: [
        '2,500 monthly credits (5,000 with annual)',
        'Everything in AI Starter PLUS:',
        'Connect 5 social media accounts',
        'Custom brand voice training',
        'Priority support + live chat',
        'Advanced analytics & reporting'
      ],
      highlight: true,
      creditExamples: [
        'Generate ~150 social posts',
        'Make ~500 AI voice calls (1 min each)',
        'Send ~2,500 SMS messages'
      ],
      creditExamplesAnnual: [
        'Generate ~300 social posts',
        'Make ~1,000 AI voice calls (1 min each)',
        'Send ~5,000 SMS messages'
      ]
    }
  ];

  const bottomRowPlans = [
     {
      id: 'powerhouse',
      name: 'AI Powerhouse',
      description: 'For top performers seeking to delegate more tasks to their AI assistant.',
      monthlyPrice: 497, // Updated from 297
      annualPrice: 397, // Updated from 197
      setupFee: 597,
      originalSetupFee: 3997,
      monthlyCredits: 7500,
      annualCredits: 15000,
      features: [
        '7,500 monthly credits (15,000 with annual)',
        'Everything in AI Accelerator PLUS:',
        'Connect 10 social media accounts',
        'White-label branding options',
        'API access & custom integrations',
        'Dedicated success manager'
      ],
      highlight: false,
      creditExamples: [
        'Generate ~500 social posts',
        'Make ~1,500 AI voice calls (1 min each)',
        'Send ~7,500 SMS messages'
      ],
      creditExamplesAnnual: [
        'Generate ~1,000 social posts',
        'Make ~3,000 AI voice calls (1 min each)',
        'Send ~15,000 SMS messages'
      ]
    },
    {
      id: 'team',
      name: 'AI Team Pro',
      description: 'For teams looking to unify their operations and improve collaboration.',
      monthlyPrice: 997,
      annualPrice: 697,
      setupFee: 997,
      originalSetupFee: 4997,
      monthlyCredits: 25000,
      annualCredits: 50000,
      features: [
        '25,000 monthly credits (50,000 with annual)',
        'Everything in AI Powerhouse PLUS:',
        '5+ User Seats Included',
        'Centralized Billing & Reporting',
        'Team Performance Dashboards',
        'Advanced Lead Routing Rules',
        'Role-Based Permissions',
        'Shared Template Libraries'
      ],
      highlight: false,
      creditExamples: [
        'Power an entire brokerage',
        'Automate marketing for 5+ agents',
        'Generate ~1,500 social posts',
        'Make ~5,000 AI voice calls'
      ],
      creditExamplesAnnual: [
        'Power multiple offices',
        'Automate marketing for 10+ agents',
        'Generate ~3,000 social posts',
        'Make ~10,000 AI voice calls'
      ]
    },
    {
      id: 'empire',
      name: 'AI Empire Suite',
      description: 'For broker-owners and coaches ready to build their own AI-powered ecosystem.',
      isCustom: true,
      features: [
        'Fully custom credit allowances',
        'Everything in AI Team Pro PLUS:',
        'Complete White-Labeling (Your Logo & Brand)',
        'Custom Domain & App Styling',
        'SaaS Reseller Tools & Sub-accounts',
        'Full API & Webhook Access',
        'Dedicated Onboarding & Success Manager',
        'Custom Feature Development'
      ],
      highlight: true,
      creditExamples: [
        'Launch your own branded SaaS',
        'Onboard your entire coaching group',
        'Create a new revenue stream'
      ]
    }
  ];

  const creditCosts = [
    { activity: 'Social Media Post', cost: '1-2 credits' },
    { activity: 'Email Generation', cost: '1 credit' },
    { activity: 'SMS Message', cost: '1 credit' },
    { activity: 'AI Voice Call (per minute)', cost: '5 credits' },
    { activity: 'Contact Verification', cost: '1 credit' },
    { activity: 'AI Video Generation', cost: '15-25 credits' },
    { activity: 'Lead Magnet Creation', cost: '20-30 credits' },
    { activity: 'Market Report', cost: '10-15 credits' }
  ];
  
  const getButtonLink = (plan, cycle) => {
    // Direct Stripe payment links for specific plans
    if (plan.id === 'powerhouse' && cycle === 'monthly') {
      return 'https://buy.stripe.com/cNi9AUgFq6z8e9r3sSfIs0U';
    }
    if (plan.id === 'powerhouse' && cycle === 'annual') {
      return 'https://buy.stripe.com/4gM4gA88UaPoc1j2oOfIs0T';
    }
    if (plan.id === 'accelerator' && cycle === 'monthly') {
      return 'https://buy.stripe.com/4gMfZi88U4r01mF6F4fIs0R';
    }
    if (plan.id === 'accelerator' && cycle === 'annual') {
      return 'https://buy.stripe.com/4gM4gA88UaPoc1j2oOfIs0T';
    }
    if (plan.id === 'starter' && cycle === 'annual') {
      return 'https://buy.stripe.com/4gMfZi88U4r01mF6F4fIs0R';
    }
    
    // For other plans, redirect to main app signup
    return createMainAppUrl('signup');
  };

  const handleCreditPurchase = (credits, cost) => {
    console.log(`Would purchase ${credits} credits for $${cost}`);
    alert(`Demo: Would purchase ${credits} credits for $${cost}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 md:p-8"> {/* Updated background */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Simple, Transparent Plans for Every Agent
          </h1>
          <p className="text-xl text-slate-700 max-w-3xl mx-auto"> {/* Updated text color */}
            Start with the basics and unlock more capabilities as your business grows. 
            All plans are designed to help you save time and stay organized.
          </p>
        </div>

        <div className="flex justify-center">
          <Tabs value={billingCycle} onValueChange={setBillingCycle} className="w-auto">
            <TabsList className="grid grid-cols-2 p-1 bg-slate-200 rounded-full"> {/* Updated tab styling */}
              <TabsTrigger value="monthly" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md">Monthly</TabsTrigger>
              <TabsTrigger value="annual" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md">
                Annual <Badge variant="secondary" className="ml-2 bg-amber-100 text-amber-800">Save with Annual</Badge> {/* Updated badge color */}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Top Row Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {topRowPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billingCycle={billingCycle} getButtonLink={getButtonLink} />
          ))}
        </div>
        
        {/* Credit Purchase Slider - PLACED BETWEEN THE TWO STACKS */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Need Extra Credits? Buy Exactly What You Need
            </h2>
            <p className="text-lg text-slate-600">
              Already have a plan but need more credits? No problem! Purchase additional credits without upgrading.
            </p>
          </div>
          <CreditPurchaseSlider 
            user={user || { subscription_tier: 'accelerator', credits_remaining: 1250 }} 
            onPurchase={handleCreditPurchase}
          />
        </div>

        {/* For Teams and Agencies Header */}
        <div className="text-center space-y-4 pt-12">
            <h2 className="text-3xl font-bold text-slate-900">For Teams and Agencies</h2> {/* Updated text color */}
            <p className="text-lg text-slate-700 max-w-2xl mx-auto"> {/* Updated text color */}
              Solutions designed to help you scale your operations and support your agents.
            </p>
            
            {/* Bottom Row Toggle */}
            <div className="flex justify-center pt-4">
              <Tabs value={bottomRowBilling} onValueChange={setBottomRowBilling} className="w-auto">
                <TabsList className="grid grid-cols-2 p-1 bg-slate-200 rounded-full"> {/* Updated tab styling */}
                  <TabsTrigger value="monthly" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md">Monthly</TabsTrigger>
                  <TabsTrigger value="annual" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-md">
                    Annual <Badge variant="secondary" className="ml-2 bg-amber-100 text-amber-800">Save 30%</Badge> {/* Updated badge color */}
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
        </div>

        {/* Bottom Row Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
           {bottomRowPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billingCycle={bottomRowBilling} getButtonLink={getButtonLink} />
          ))}
        </div>

        {/* Credit Cost Reference */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Coins className="w-6 h-6 text-blue-600" />
              Credit Cost Reference
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {creditCosts.map((item, index) => (
                <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="font-semibold text-slate-900 text-sm">{item.activity}</p>
                  <p className="text-blue-600 font-bold">{item.cost}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                💡 <strong>Unused credits roll over!</strong> No credits are wasted - they accumulate in your account for future use.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-3 pt-8">
          <p className="font-semibold text-slate-700">🛡️ 30-Day Success Guarantee • ⚡ Setup in 7-10 days</p>
          <p className="text-sm text-slate-500">
            📧 Questions? Email <a href="mailto:support@airealtors247.com" className="underline">support@airealtors247.com</a> • 📞 Priority Support: 1-888-985-6393
          </p>
        </div>

        {/* FAQ Section */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-3xl p-8 md:p-12"> {/* Updated section background */}
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">Common Questions</h2> {/* Updated text color */}
            
            <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Can I upgrade or downgrade anytime?</h3> {/* Updated text color */}
                <p className="text-slate-700">Yes! Change your plan anytime. Upgrades take effect immediately, downgrades at your next billing cycle.</p> {/* Updated text color */}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">What if I run out of credits?</h3> {/* Updated text color */}
                <p className="text-slate-700">You can purchase additional credit packs anytime, or upgrade to a higher plan for more monthly credits.</p> {/* Updated text color */}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Is there a setup fee?</h3> {/* Updated text color */}
                <p className="text-slate-700">Setup fees are waived during our launch period. Get started immediately with just your monthly subscription.</p> {/* Updated text color */}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Can I cancel anytime?</h3> {/* Updated text color */}
                <p className="text-slate-700">Absolutely. Cancel anytime with no penalties. Your subscription remains active until the end of your billing period.</p> {/* Updated text color */}
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center space-y-6 py-12">
          <h2 className="text-4xl font-bold text-slate-900"> {/* Updated text color */}
            Ready to Choose Your AI Assistant?
          </h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto"> {/* Updated text color */}
            Start with our free trial and discover which plan fits your business best.
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <a href={createMainAppUrl('signup')} className="inline-block">
              <Button size="lg" className="text-lg bg-gradient-to-r from-slate-800 to-gray-900 hover:from-slate-900 hover:to-black text-white shadow-lg hover:shadow-xl transition-all"> {/* Updated button styling */}
                Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Button variant="outline" className="text-lg border-slate-300 text-slate-700 hover:bg-amber-50 hover:border-amber-300"> {/* Updated button styling */}
              Compare All Plans
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
