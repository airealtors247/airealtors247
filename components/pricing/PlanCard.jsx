
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Coins, Building2, Users, Star, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlanCard({ plan, billingCycle, getButtonLink }) {
  const getPrice = (p) => billingCycle === 'annual' ? p.annualPrice : p.monthlyPrice;
  const getCredits = (p) => billingCycle === 'annual' ? p.annualCredits : p.monthlyCredits;
  const getOriginalSetupFee = (p) => p.originalSetupFee;
  const getSetupFee = (p) => p.setupFee;

  // Get the appropriate credit examples based on billing cycle
  const getCreditExamples = (p) => {
    if (billingCycle === 'annual' && p.creditExamplesAnnual) {
      return p.creditExamplesAnnual;
    }
    return p.creditExamples || [];
  };

  // Icon mapping for enterprise plans
  const planIcons = {
    'AI Team Pro': Users,
    'AI Empire Suite': Building2,
    'AI Explorer': Star
  };
  const PlanIcon = planIcons[plan.name];

  return (
    <Card className={`shadow-xl border-0 rounded-2xl flex flex-col ${plan.highlight ? 'border-4 border-purple-500 scale-105 transform' : 'border-slate-200'}`}>
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-purple-600 text-white px-4 py-1 text-sm">
            {plan.id === 'accelerator' ? 'Most Popular' : plan.id === 'empire' ? 'Full White-Label' : 'Best Value'}
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pt-8 pb-4">
        {plan.isFree && (
            <div className="mb-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 text-lg font-extrabold shadow-lg rounded-full inline-block">
                    14-DAY FREE TRIAL
                </div>
            </div>
        )}
        {PlanIcon && (
           <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
             <PlanIcon className="w-8 h-8 text-slate-600" />
           </div>
        )}
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <p className="text-slate-500 text-sm h-12">{plan.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-6 px-6 flex-grow">
        {plan.isCustom ? (
          <div className="text-center py-8">
            <span className="text-4xl font-bold">Custom Pricing</span>
            <p className="text-slate-500">Let's build your perfect plan</p>
          </div>
        ) : (
          <>
            <div className="text-center">
              {plan.isFree ? (
                <div>
                  <span className="text-5xl font-bold">FREE</span>
                  <p className="text-lg text-slate-600 mt-2">for {plan.trialDays} days</p>
                  <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CreditCard className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-semibold text-orange-800">Credit Card Required</span>
                    </div>
                    <p className="text-xs text-orange-700 mb-2">
                      Auto-enrolls to ${plan.autoEnrollPrice}/month with {plan.autoEnrollCredits.toLocaleString()} credits after {plan.trialDays} days
                    </p>
                    <p className="text-xs text-green-700 font-medium">
                      Cancel anytime during trial - no charges if cancelled
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <span className="text-5xl font-bold">${getPrice(plan)}</span>
                  <span className="text-slate-500">/month</span>
                </>
              )}
              {billingCycle === 'annual' && !plan.isFree && <p className="text-sm text-slate-500">Billed annually</p>}
            </div>

            <div className="text-center bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Coins className="w-6 h-6 text-blue-600" />
                <span className="text-2xl font-bold text-blue-900">{getCredits(plan)?.toLocaleString() || 'Custom'}</span>
                <span className="text-blue-700 font-medium">{plan.isFree ? `credits for ${plan.trialDays} days` : 'credits/month'}</span>
              </div>
              {billingCycle === 'annual' && !plan.isFree && (
                <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 mt-2">
                  <p className="text-sm font-bold text-yellow-800">🎉 DOUBLE CREDITS with Annual!</p>
                  <p className="text-xs text-yellow-700">4X Better Value: Half Price + Double Credits</p>
                </div>
              )}
              <p className="text-sm text-blue-600 mt-2">Use credits for any AI feature - total flexibility!</p>
            </div>
            
            {!plan.isFree && (
              <>
                <div className="text-center bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="font-semibold text-yellow-800">One-time setup:</p>
                  <span className="text-red-500 line-through mr-2">${getOriginalSetupFee(plan)?.toLocaleString() || '0'}</span>
                  <span className="font-bold text-2xl text-slate-800">${getSetupFee(plan)?.toLocaleString() || '0'}</span>
                  <p className="text-xs text-green-600 mt-1">Reduced setup fee for Beta Founders!</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                  <p className="font-bold text-center mb-2">🎉 BETA FOUNDERS SAVINGS</p>
                  <ul className="text-sm space-y-1">
                    <li>✓ You Save ${(plan.monthlyPrice || 0) - getPrice(plan)}/month on subscription</li>
                    <li>✓ You Save ${(getOriginalSetupFee(plan) || 0) - (getSetupFee(plan) || 0)} on setup fee</li>
                    {billingCycle === 'annual' && <li className="font-bold">✓ DOUBLE CREDITS: 4X Better Value!</li>}
                    <li className="font-bold">✓ Total First Year Savings: ${(((plan.monthlyPrice || 0) - getPrice(plan)) * 12 + ((getOriginalSetupFee(plan) || 0) - (getSetupFee(plan) || 0))).toLocaleString()}</li>
                  </ul>
                </div>
              </>
            )}
          </>
        )}

        <ul className="space-y-3 pt-4">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-slate-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="bg-slate-50 rounded-lg p-4">
          <h4 className="font-semibold text-slate-900 mb-3 text-sm">
            {plan.isCustom
              ? 'Example Credit Usage:'
              : plan.isFree
                ? `Your ${plan.trialDays}-day trial (${plan.monthlyCredits} credits) can:`
                : `Your ${getCredits(plan)?.toLocaleString() || 'N/A'} ${billingCycle} credits can:`
            }
          </h4>
          <ul className="space-y-2">
            {getCreditExamples(plan).map((example, index) => (
              <li key={index} className="text-xs text-slate-600 flex items-center gap-2">
                <Zap className="w-3 h-3 text-blue-500" />
                {example}
              </li>
            ))}
          </ul>
          {billingCycle === 'annual' && !plan.isFree && !plan.isCustom && (
            <div className="mt-3 pt-3 border-t border-slate-200">
              <p className="text-xs font-bold text-purple-700">🚀 Annual = 4X BETTER VALUE!</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex-col gap-3 p-6">
        {plan.isCustom ? (
          <Button asChild className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-6 text-lg">
            <a href="mailto:sales@airealtors247.com?subject=Inquiry for AI Empire Suite">Contact Sales</a>
          </Button>
        ) : plan.isFree ? (
          <Button asChild className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 text-base">
            <a href={getButtonLink(plan, 'monthly')} target="_blank">
              Start 14-Day FREE Trial
            </a>
          </Button>
        ) : (
          <>
            <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 text-base">
              <Link to={getButtonLink(plan, 'monthly')} target="_blank">
                Monthly Plan - ${plan.monthlyPrice}/month
              </Link>
            </Button>
            
            <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 text-base relative">
              <Link to={getButtonLink(plan, 'annual')} target="_blank">
                <div className="flex items-center justify-center gap-2">
                  <span>Annual Plan - ${plan.annualPrice}/month</span>
                  <Badge className="bg-yellow-400 text-purple-900 text-xs font-bold">4X VALUE!</Badge>
                </div>
              </Link>
            </Button>
            
            <p className="text-xs text-slate-500 text-center">
              💡 Annual plans include {plan.annualCredits?.toLocaleString() || 'more'} credits/month vs {plan.monthlyCredits?.toLocaleString() || 'fewer'} for monthly
            </p>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
