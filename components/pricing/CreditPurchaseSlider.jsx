import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Zap, 
  Clock, 
  CheckCircle,
  TrendingUp,
  Coins,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { createStripeCheckout } from "@/api/functions";

const planPricing = {
  explorer: { basePrice: 0, creditRate: 0.05 }, // $0.05 per credit
  starter: { basePrice: 47, creditRate: 0.04 }, // $0.04 per credit  
  accelerator: { basePrice: 97, creditRate: 0.03 }, // $0.03 per credit
  powerhouse: { basePrice: 197, creditRate: 0.025 }, // $0.025 per credit
  team: { basePrice: 697, creditRate: 0.02 }, // $0.02 per credit
  empire: { basePrice: 1497, creditRate: 0.015 } // $0.015 per credit
};

export default function CreditPurchaseSlider({ user, onPurchase }) {
  const [creditAmount, setCreditAmount] = useState([5000]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const userPlan = user?.subscription_tier || 'explorer';
  const pricing = planPricing[userPlan] || planPricing.explorer;
  const selectedCredits = creditAmount[0];
  
  // Calculate discount
  const getVolumeDiscount = () => {
    if (selectedCredits >= 50000) return 20;
    if (selectedCredits >= 25000) return 15;
    if (selectedCredits >= 10000) return 10;
    return 0;
  };
  
  const discountPercent = getVolumeDiscount();
  const baseCost = selectedCredits * pricing.creditRate;
  const discountAmount = baseCost * (discountPercent / 100);
  const totalCost = (baseCost - discountAmount).toFixed(2);
  
  const handlePurchase = async () => {
    setIsProcessing(true);
    try {
      const { data } = await createStripeCheckout({
        creditAmount: selectedCredits,
        userPlan: userPlan
      });
      
      // Redirect to Stripe Checkout
      window.location.href = data.url;
      
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Could not initiate purchase. Please try again.');
      setIsProcessing(false);
    }
  };

  const getSavingsMessage = () => {
    const higherPlanRate = planPricing.explorer.creditRate;
    const savings = ((higherPlanRate - pricing.creditRate) * selectedCredits).toFixed(2);
    if (savings > 0) {
      return `You save $${savings} with your ${userPlan} plan pricing!`;
    }
    return null;
  };

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Coins className="w-6 h-6 text-white" />
          </div>
          Add-On Credits Slider
        </CardTitle>
        <p className="text-slate-600">
          💳 Need more credits? Add what you need — no upgrade required.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Current Plan Info */}
        <div className="bg-white rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Your Current Plan</h3>
              <p className="text-slate-600 text-sm">
                {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan
              </p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              ${(pricing.creditRate * 1000).toFixed(0)}/1K credits
            </Badge>
          </div>
        </div>

        {/* Credit Slider */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-4">
              How many credits do you need?
            </label>
            <Slider
              value={creditAmount}
              onValueChange={setCreditAmount}
              max={100000}
              min={1000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>1,000</span>
              <span>50,000</span>
              <span>100,000</span>
            </div>
          </div>

          {/* Purchase Summary */}
          <div className="bg-white rounded-xl p-6 border-2 border-blue-200 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Coins className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-slate-600">Credits</span>
                </div>
                <div className="text-3xl font-bold text-blue-600">
                  {selectedCredits.toLocaleString()}
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-slate-600">One-time Cost</span>
                </div>
                <div className="space-y-1">
                  {discountPercent > 0 && (
                    <div className="text-lg text-slate-400 line-through">
                      ${baseCost.toFixed(2)}
                    </div>
                  )}
                  <div className="text-3xl font-bold text-green-600">
                    ${totalCost}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Discount Badge */}
            {discountPercent > 0 && (
              <div className="text-center">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {discountPercent}% Volume Discount Applied! Save ${discountAmount.toFixed(2)}
                </Badge>
              </div>
            )}
            
            {/* Additional Info */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Clock className="w-4 h-4 text-green-500" />
                <span>📅 Expires: <strong>Never</strong></span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>✅ Delivered <strong>instantly</strong></span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                <span>Use for any AI feature - total flexibility!</span>
              </div>
              
              {getSavingsMessage() && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-3">
                  <div className="flex items-center gap-2 text-green-800 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    {getSavingsMessage()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Purchase Button */}
          <Button 
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {isProcessing ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Creating Secure Payment...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5" />
                Buy {selectedCredits.toLocaleString()} Credits Now
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </Button>
          
          <p className="text-xs text-center text-slate-500">
            🔒 Secure payment powered by Stripe • 💳 All major cards accepted
          </p>
        </div>
      </div>
    </Card>
  );
}