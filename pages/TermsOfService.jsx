import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Shield } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scale className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <p className="text-slate-600">Last updated: December 2024</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
                <p>By accessing or using AIRealtors247 ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
                <p><strong>AIRealtors247 is a software tool and marketing platform designed for real estate professionals.</strong> We provide:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>AI-powered content generation for marketing purposes</li>
                  <li>CRM and lead management tools</li>
                  <li>Social media automation and scheduling</li>
                  <li>Compliance monitoring and suggestions</li>
                  <li>Training and educational resources</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">3. Important Disclaimers</h2>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h3 className="font-bold text-red-900 mb-2">Critical Legal Notice:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-red-800">
                    <li><strong>AIRealtors247 is NOT a licensed real estate broker, agent, or legal advisor</strong></li>
                    <li><strong>We do NOT provide legal, financial, or professional real estate advice</strong></li>
                    <li><strong>You are solely responsible for compliance with all local, state, and federal laws</strong></li>
                    <li><strong>You must consult your broker of record, real estate board, or legal counsel for guidance</strong></li>
                    <li><strong>All AI-generated content requires your review and approval before use</strong></li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">4. User Responsibilities</h2>
                <p>You agree to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide accurate information about your real estate license and credentials</li>
                  <li>Review all AI-generated content for accuracy and compliance before use</li>
                  <li>Comply with all applicable real estate laws and regulations in your jurisdiction</li>
                  <li>Maintain current real estate licensing as required by your jurisdiction</li>
                  <li>Follow your brokerage's policies and procedures</li>
                  <li>Respect intellectual property rights and trademark restrictions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">5. REALTOR® Trademark</h2>
                <p>REALTOR® is a registered trademark of the National Association of REALTORS® and Canadian Real Estate Association. You may only use this term if you are a current member of the applicable association. AIRealtors247 is not affiliated with or endorsed by NAR, CREA, or any real estate board.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">6. AI Content and Accuracy</h2>
                <p>AI-generated content is provided for guidance and inspiration only. You acknowledge that:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>AI may produce inaccurate or inappropriate content</li>
                  <li>You are responsible for fact-checking all information</li>
                  <li>Legal compliance is your sole responsibility</li>
                  <li>Market data may not be current or accurate</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">7. Privacy and Data</h2>
                <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">8. Payment and Subscriptions</h2>
                <p>Subscription fees are billed in advance and are non-refundable except as required by law. You may cancel your subscription at any time through your account settings.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">9. Limitation of Liability</h2>
                <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, AIREALTORS247 SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM YOUR USE OF THE SERVICE.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact Information</h2>
                <p>For questions about these Terms of Service, please contact us at legal@airealtors247.com</p>
              </section>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}