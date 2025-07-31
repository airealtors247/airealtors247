import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mail, 
  Smartphone, 
  Upload, 
  Users, 
  Zap, 
  Gift, 
  CheckCircle,
  AlertTriangle,
  Download,
  Phone
} from 'lucide-react';

export default function ContactImportWizard({ user, onComplete }) {
  const [step, setStep] = useState(1);
  const [importMethod, setImportMethod] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [autoOutreach, setAutoOutreach] = useState(true);
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState(null);

  const importMethods = [
    {
      id: 'gmail',
      name: 'Gmail Contacts',
      icon: Mail,
      description: 'Import from your Gmail account',
      color: 'bg-red-50 border-red-200 text-red-800',
      estimate: '500-2,000 contacts'
    },
    {
      id: 'outlook',
      name: 'Outlook Contacts',
      icon: Mail,
      description: 'Import from your Outlook account',
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      estimate: '300-1,500 contacts'
    },
    {
      id: 'iphone',
      name: 'iPhone Contacts',
      icon: Smartphone,
      description: 'Import from your iPhone',
      color: 'bg-gray-50 border-gray-200 text-gray-800',
      estimate: '200-1,000 contacts'
    },
    {
      id: 'android',
      name: 'Android Contacts',
      icon: Phone,
      description: 'Import from your Android phone',
      color: 'bg-green-50 border-green-200 text-green-800',
      estimate: '200-1,000 contacts'
    },
    {
      id: 'csv',
      name: 'Upload CSV File',
      icon: Upload,
      description: 'Upload a CSV file with contacts',
      color: 'bg-purple-50 border-purple-200 text-purple-800',
      estimate: 'Unlimited'
    }
  ];

  const handleImport = async () => {
    setIsImporting(true);
    
    // Simulate the import process
    setTimeout(() => {
      const mockResults = {
        total_imported: Math.floor(Math.random() * 1500) + 500,
        emails_sent: Math.floor(Math.random() * 1200) + 400,
        sms_sent: Math.floor(Math.random() * 800) + 200,
        credits_earned: 250,
        referral_link: `https://airealtors247.com/invite/${user.email.split('@')[0]}`
      };
      
      setImportResults(mockResults);
      setIsImporting(false);
      setStep(3);
    }, 3000);
  };

  if (step === 1) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-slate-900 mb-2">
            🚀 Import Your Contacts & Earn Credits Instantly
          </CardTitle>
          <p className="text-lg text-slate-600">
            Import all your contacts with one click, then automatically invite them to earn unlimited credits!
          </p>
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-lg p-4 mt-4">
            <p className="text-green-800 font-semibold">
              🎯 <strong>Instant Rewards:</strong> +50 credits per signup, +500 credits per paid upgrade
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {importMethods.map((method) => (
              <Card 
                key={method.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  importMethod === method.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-slate-50'
                }`}
                onClick={() => setImportMethod(method.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full ${method.color} flex items-center justify-center mx-auto mb-4`}>
                    <method.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{method.name}</h3>
                  <p className="text-sm text-slate-600 mb-3">{method.description}</p>
                  <Badge variant="outline" className="text-xs">
                    Est. {method.estimate}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {importMethod && (
            <div className="space-y-4 pt-6 border-t">
              <Alert>
                <Gift className="h-4 w-4" />
                <AlertDescription>
                  <strong>What happens next:</strong> We'll import your contacts, save them to your private CRM, 
                  and automatically send personalized invites about your real estate services + AI Realtors 247.
                </AlertDescription>
              </Alert>

              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="consent" 
                  checked={consentGiven}
                  onCheckedChange={setConsentGiven}
                />
                <label htmlFor="consent" className="text-sm text-slate-700 leading-relaxed">
                  I confirm I have permission to contact these people and send them information 
                  about my real estate services and AI Realtors 247.
                </label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="auto-outreach" 
                  checked={autoOutreach}
                  onCheckedChange={setAutoOutreach}
                />
                <label htmlFor="auto-outreach" className="text-sm text-slate-700 leading-relaxed">
                  Automatically send introduction emails and SMS messages to my contacts 
                  (recommended for maximum credit earnings)
                </label>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => setStep(2)} 
                  disabled={!consentGiven}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  Continue to Import
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (step === 2) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-900">
            Ready to Import from {importMethods.find(m => m.id === importMethod)?.name}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!isImporting ? (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-blue-900 mb-2">What Will Happen:</h3>
                <ul className="text-sm text-blue-800 space-y-2 text-left max-w-md mx-auto">
                  <li>✅ Import all your contacts instantly</li>
                  <li>✅ Save them securely in your private CRM</li>
                  <li>✅ AI generates personalized messages</li>
                  <li>✅ Auto-send invites via email & SMS</li>
                  <li>✅ Start earning credits immediately</li>
                </ul>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleImport}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Import Contacts & Start Earning
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
              <h3 className="text-xl font-semibold text-slate-900">Importing Your Contacts...</h3>
              <p className="text-slate-600">This may take a few moments. Please don't close this window.</p>
              
              <div className="bg-slate-50 rounded-lg p-4 max-w-md mx-auto">
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Connecting to your account...
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    Importing contacts...
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="w-4 h-4"></div>
                    Saving to your CRM...
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <div className="w-4 h-4"></div>
                    Sending invites...
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (step === 3 && importResults) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-900">
            🎉 Import Successful!
          </CardTitle>
          <p className="text-lg text-slate-600">
            Your viral referral campaign is now live and earning you credits!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-4">📊 Import Results</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-blue-800">Contacts Imported:</span>
                  <span className="font-bold text-blue-900">{importResults.total_imported.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">Emails Sent:</span>
                  <span className="font-bold text-blue-900">{importResults.emails_sent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-800">SMS Sent:</span>
                  <span className="font-bold text-blue-900">{importResults.sms_sent.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-4">💰 Credits Earned</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-900 mb-2">
                  +{importResults.credits_earned}
                </div>
                <p className="text-sm text-green-800">
                  Bonus credits for completing import
                </p>
                <p className="text-xs text-green-700 mt-2">
                  Earn +50 more for each signup!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
            <h3 className="font-semibold text-purple-900 mb-3">🔗 Your Personal Referral Link</h3>
            <div className="flex items-center gap-3">
              <Input 
                value={importResults.referral_link} 
                readOnly 
                className="bg-white"
              />
              <Button 
                onClick={() => navigator.clipboard.writeText(importResults.referral_link)}
                variant="outline"
              >
                Copy
              </Button>
            </div>
            <p className="text-sm text-purple-700 mt-2">
              Share this link anywhere to earn more credits. Every signup = +50 credits, every paid upgrade = +500 credits!
            </p>
          </div>

          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">What's Next?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-50 rounded-lg p-4">
                <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="font-medium">Watch Your CRM</p>
                <p className="text-slate-600">All contacts are now in your CRM</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <Gift className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="font-medium">Track Earnings</p>
                <p className="text-slate-600">Monitor signups & credits earned</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <Zap className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="font-medium">Use AI Tools</p>
                <p className="text-slate-600">Start using your credits on AI features</p>
              </div>
            </div>

            <Button 
              onClick={onComplete}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}