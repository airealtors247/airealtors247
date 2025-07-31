import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export default function IndustryFocusedBanner() {
  return (
    <Card className="shadow-xl border-2 border-gradient-to-r from-purple-500 to-pink-500 bg-gradient-to-r from-purple-50 to-pink-50">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Why AIRealtors247 vs. Generic AI Tools?
              </h3>
              <p className="text-slate-600">
                Industry-specialized intelligence designed specifically for real estate success.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-red-100 text-red-800 border-red-200">
              ❌ ChatGPT: Generic responses, no compliance
            </Badge>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              ✅ AIRealtors247: Real estate expertise & safety
            </Badge>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-200">
          <div className="text-center">
            <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-slate-900">10X Execution Engine</h4>
            <p className="text-sm text-slate-600">We do 5-10x more work than you plan, to maximize your chances of success.</p>
          </div>
          <div className="text-center">
            <ShieldCheck className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-slate-900">Compliance Built-In</h4>
            <p className="text-sm text-slate-600">AI monitors for compliance, but you are always responsible for final review and adherence to local laws.</p>
          </div>
          <div className="text-center">
            <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-slate-900">Industry Intelligence</h4>
            <p className="text-sm text-slate-600">Pre-trained on real estate best practices, scripts, and market dynamics.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}