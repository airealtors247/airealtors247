import React from 'react';
import DNCManager from '../components/compliance/DNCManager';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldCheck, AlertTriangle, BookUser } from 'lucide-react';

export default function CompliancePage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                Compliance & Safety Center
            </h1>
            <p className="text-slate-600 text-lg mt-1">
                Manage your Do-Not-Call list and understand your responsibilities.
            </p>
        </div>
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader className="flex flex-row items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600" />
          <div_
            <CardTitle className="text-yellow-900">Important User Responsibility</CardTitle>
            <CardDescription className="text-yellow-800">
              AIRealtors247 provides powerful automation tools. It is your sole responsibility to ensure all communications comply with federal, state, provincial, and local laws, including DNC, TCPA, CASL, and all real estate advertising regulations.
            </CardDescription>
          </div_>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <DNCManager />
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-600" />
                        How We Help
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <p>
                        <strong>Automated Checks:</strong> Before sending communications, our system performs checks against your local DNC list and national registries where available.
                    </p>
                    <p>
                        <strong>AI Content Review:</strong> AI-generated content is reviewed for language that may violate fair housing laws. However, final approval is always yours.
                    </p>
                    <p>
                        <strong>Unsubscribe Links:</strong> All marketing emails and SMS campaigns automatically include the required unsubscribe links and language (e.g., 'Reply STOP to cancel').
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookUser className="w-5 h-5 text-blue-600" />
                        Best Practices
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                   <p>✓ Regularly sync your contacts with your local DNC list.</p>
                   <p>✓ Always honor unsubscribe requests immediately.</p>
                   <p>✓ Review all AI-generated campaigns before launching.</p>
                   <p>✓ Consult a legal professional for specific compliance questions.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}