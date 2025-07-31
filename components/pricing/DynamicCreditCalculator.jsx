import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Zap, MapPin, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import GeolocationPricingEngine from './GeolocationPricingEngine';

const BASE_CREDIT_COSTS = {
  voice_call: 5,
  sms_send: 1, 
  email_generation: 2,
  ai_video: 12,
  data_enrichment: 3,
  market_analysis: 4
};

export default function DynamicCreditCalculator({ user }) {
  const [creditAmount, setCreditAmount] = useState(1000);
  const [pricingInfo, setPricingInfo] = useState(null);
  const [finalPricing, setFinalPricing] = useState(null);

  useEffect(() => {
    if (pricingInfo) {
      calculateFinalPricing();
    }
  }, [creditAmount, pricingInfo]);

  const calculateFinalPricing = () => {
    if (!pricingInfo) return;

    // Base pricing tiers (USD)
    let basePricePerCredit = 0.08; // Default
    if (creditAmount <= 500) basePricePerCredit = 0.10;
    else if (creditAmount <= 1000) basePricePerCredit = 0.09;
    else if (creditAmount <= 5000) basePricePerCredit = 0.08;
    else if (creditAmount <= 10000) basePricePerCredit = 0.07;
    else basePricePerCredit = 0.06;

    // Apply location multiplier
    const adjustedPrice = basePricePerCredit * pricingInfo.multiplier;
    const totalPrice = creditAmount * adjustedPrice;
    
    // Add cross-border fee if applicable
    const crossBorderFee = pricingInfo.mismatch ? totalPrice * 0.15 : 0;
    const finalTotal = totalPrice + crossBorderFee;

    setFinalPricing({
      basePrice: totalPrice,
      crossBorderFee: crossBorderFee,
      finalTotal: finalTotal,
      pricePerCredit: adjustedPrice,
      savings: pricingInfo.multiplier < 1 ? (creditAmount * 0.08) - totalPrice : 0
    });
  };

  const handlePricingUpdate = (info) => {
    setPricingInfo(info);
  };

  const getUsageExamples = () => {
    return Object.entries(BASE_CREDIT_COSTS).map(([action, cost]) => ({
      action: action.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      cost: cost,
      quantity: Math.floor(creditAmount / cost)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Location Detection */}
      <GeolocationPricingEngine user={user} onPricingUpdate={handlePricingUpdate} />
      
      {/* Credit Calculator */}
      <Card className="shadow-xl border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-600" />
            Smart Credit Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* Credit Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-medium">Credits: {creditAmount.toLocaleString()}</Label>
              {finalPricing && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    ${finalPricing.finalTotal.toFixed(2)}
                  </div>
                  <div className="text-sm text-slate-500">
                    ${finalPricing.pricePerCredit.toFixed(4)} per credit
                  </div>
                </div>
              )}
            </div>
            
            <Slider
              value={[creditAmount]}
              onValueChange={(value) => setCreditAmount(value[0])}
              max={25000}
              min={100}
              step={100}
              className="w-full"
            />
          </div>

          {/* Pricing Breakdown */}
          {finalPricing && (
            <div className="bg-slate-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base Cost ({creditAmount.toLocaleString()} credits)</span>
                <span>${finalPricing.basePrice.toFixed(2)}</span>
              </div>
              
              {finalPricing.crossBorderFee > 0 && (
                <div className="flex justify-between text-sm text-orange-600">
                  <span>Cross-Border Fee (15%)</span>
                  <span>+${finalPricing.crossBorderFee.toFixed(2)}</span>
                </div>
              )}
              
              {finalPricing.savings > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Regional Discount</span>
                  <span>-${finalPricing.savings.toFixed(2)}</span>
                </div>
              )}
              
              <hr className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${finalPricing.finalTotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Cross-border Warning */}
          {pricingInfo?.mismatch && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Cross-Border Usage Detected:</strong> A 15% fee applies when using credits outside your registration country. 
                This prevents pricing arbitrage and ensures fair usage.
              </AlertDescription>
            </Alert>
          )}

          {/* Usage Examples */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-3">What you can do with {creditAmount.toLocaleString()} credits:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {getUsageExamples().map((example, index) => (
                <div key={index} className="text-sm">
                  <span className="font-medium">{example.quantity}x</span> {example.action}
                </div>
              ))}
            </div>
          </div>

          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
            disabled={!finalPricing}
          >
            Buy {creditAmount.toLocaleString()} Credits for ${finalPricing?.finalTotal.toFixed(2) || '0.00'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}