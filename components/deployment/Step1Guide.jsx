import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, CreditCard, Shield, Globe } from "lucide-react";

export default function Step1Guide() {
  const [completed, setCompleted] = useState({});

  const toggleComplete = (step) => {
    setCompleted(prev => ({...prev, [step]: !prev[step]}));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-200">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          🎯 Step 1: Create Your AWS Account
        </h1>
        <p className="text-blue-700 text-lg">
          This is where your AIRealtors247 platform will live. Don't worry - I'll guide you through every click!
        </p>
      </div>

      {/* What You'll Need */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-900">
            <Shield className="w-5 h-5" />
            What You'll Need Before Starting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-900">Required Items:</h4>
              <ul className="space-y-1 text-sm text-orange-800">
                <li>✅ Valid email address</li>
                <li>✅ Phone number (for verification)</li>
                <li>✅ Credit card (any major card)</li>
                <li>✅ Valid billing address</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-900">Time Needed:</h4>
              <ul className="space-y-1 text-sm text-orange-800">
                <li>⏱️ Account creation: 5-10 minutes</li>
                <li>⏱️ Identity verification: 2-5 minutes</li>
                <li>⏱️ Support plan selection: 2 minutes</li>
                <li>⏱️ <strong>Total: About 15 minutes</strong></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step-by-Step Instructions */}
      <div className="space-y-4">
        
        {/* Sub-step 1.1 */}
        <Card className={`transition-all duration-300 ${completed['1.1'] ? 'border-green-300 bg-green-50' : 'border-slate-200'}`}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${completed['1.1'] ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {completed['1.1'] ? '✓' : '1'}
                </div>
                Go to AWS Website
              </CardTitle>
              <Button 
                variant={completed['1.1'] ? "outline" : "default"}
                size="sm"
                onClick={() => toggleComplete('1.1')}
              >
                {completed['1.1'] ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">🌐 What to do:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Open your web browser (Chrome, Firefox, Safari, etc.)</li>
                  <li>Go to: <code className="bg-white px-2 py-1 rounded text-blue-600 font-mono">https://aws.amazon.com</code></li>
                  <li>Look for "Create an AWS Account" button (usually orange/yellow)</li>
                  <li>Click on it</li>
                </ol>
              </div>
              <Alert>
                <Globe className="h-4 w-4" />
                <AlertDescription>
                  <strong>Screenshot tip:</strong> The AWS homepage looks like Amazon's shopping site, but with "AWS" in the top-left corner. The "Create Account" button is usually very prominent on the page.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Sub-step 1.2 */}
        <Card className={`transition-all duration-300 ${completed['1.2'] ? 'border-green-300 bg-green-50' : 'border-slate-200'}`}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${completed['1.2'] ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {completed['1.2'] ? '✓' : '2'}
                </div>
                Fill Out Account Information
              </CardTitle>
              <Button 
                variant={completed['1.2'] ? "outline" : "default"}
                size="sm"
                onClick={() => toggleComplete('1.2')}
              >
                {completed['1.2'] ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">📝 Information you'll enter:</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Account Details:</h4>
                    <ul className="space-y-1">
                      <li>• Email address (use your business email)</li>
                      <li>• Password (make it strong!)</li>
                      <li>• AWS account name (e.g., "AIRealtors247")</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Contact Information:</h4>
                    <ul className="space-y-1">
                      <li>• Full name</li>
                      <li>• Phone number</li>
                      <li>• Company name (optional)</li>
                      <li>• Country/Region</li>
                    </ul>
                  </div>
                </div>
              </div>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Use the same email you plan to use for your business. You'll receive important notifications here, and it will be tied to your AIRealtors247 platform.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Sub-step 1.3 */}
        <Card className={`transition-all duration-300 ${completed['1.3'] ? 'border-green-300 bg-green-50' : 'border-slate-200'}`}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${completed['1.3'] ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {completed['1.3'] ? '✓' : '3'}
                </div>
                Add Payment Method
              </CardTitle>
              <Button 
                variant={completed['1.3'] ? "outline" : "default"}
                size="sm"
                onClick={() => toggleComplete('1.3')}
              >
                {completed['1.3'] ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">💳 Payment Information:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Credit card number (Visa, MasterCard, American Express)</li>
                  <li>Expiration date</li>
                  <li>Security code (CVV)</li>
                  <li>Billing address</li>
                </ul>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    <strong>Good news:</strong> AWS has a free tier! For the first 12 months, you get many services free, including what we need to test your platform.
                  </AlertDescription>
                </Alert>
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription className="text-blue-800">
                    <strong>Cost estimate:</strong> Once you go live with real users, expect $500-800/month. But testing and setup will cost almost nothing!
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sub-step 1.4 */}
        <Card className={`transition-all duration-300 ${completed['1.4'] ? 'border-green-300 bg-green-50' : 'border-slate-200'}`}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${completed['1.4'] ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {completed['1.4'] ? '✓' : '4'}
                </div>
                Phone Verification
              </CardTitle>
              <Button 
                variant={completed['1.4'] ? "outline" : "default"}
                size="sm"
                onClick={() => toggleComplete('1.4')}
              >
                {completed['1.4'] ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">📱 What will happen:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>AWS will ask for your phone number</li>
                  <li>You can choose: Voice call OR Text message</li>
                  <li>AWS will send you a 4-digit code</li>
                  <li>Enter the code on the website</li>
                  <li>Verification complete!</li>
                </ol>
              </div>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Tip:</strong> If you don't receive the code within 2 minutes, try the other method (voice if you chose text, or text if you chose voice).
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Sub-step 1.5 */}
        <Card className={`transition-all duration-300 ${completed['1.5'] ? 'border-green-300 bg-green-50' : 'border-slate-200'}`}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${completed['1.5'] ? 'bg-green-500' : 'bg-blue-500'}`}>
                  {completed['1.5'] ? '✓' : '5'}
                </div>
                Choose Support Plan
              </CardTitle>
              <Button 
                variant={completed['1.5'] ? "outline" : "default"}
                size="sm"
                onClick={() => toggleComplete('1.5')}
              >
                {completed['1.5'] ? 'Mark Incomplete' : 'Mark Complete'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-slate-100 p-4 rounded-lg">
                <p className="text-lg font-semibold mb-2">🎯 My recommendation for you:</p>
                <div className="bg-green-100 border border-green-300 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-1">Choose: "Basic Support (Free)"</h4>
                  <p className="text-sm text-green-800">Perfect for getting started. You can upgrade later if needed.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-xs">
                <div className="border rounded p-3">
                  <h4 className="font-semibold">Basic (Free)</h4>
                  <p>Community forums, documentation</p>
                </div>
                <div className="border rounded p-3 opacity-60">
                  <h4 className="font-semibold">Developer ($29/month)</h4>
                  <p>Email support during business hours</p>
                </div>
                <div className="border rounded p-3 opacity-60">
                  <h4 className="font-semibold">Business ($100/month)</h4>
                  <p>24/7 support, faster response</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Next Steps Preview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900">🎉 Once You Complete Step 1...</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-800 mb-4">
            Congratulations! You'll have your AWS account ready. Next, I'll guide you through:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-green-900">Step 2 Preview:</h4>
              <ul className="space-y-1 text-green-700">
                <li>• Setting up billing alerts (so no surprises!)</li>
                <li>• Creating your first "virtual computer" (EC2)</li>
                <li>• Setting up your database</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-900">Don't Worry:</h4>
              <ul className="space-y-1 text-green-700">
                <li>• I'll guide you through every click</li>
                <li>• We'll go slow and steady</li>
                <li>• You can ask questions anytime</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="text-center">
        <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          Ready for Step 2? Let me know when Step 1 is complete! 🚀
        </Button>
      </div>

    </div>
  );
}