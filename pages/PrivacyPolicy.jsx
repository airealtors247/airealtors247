import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
            <p className="text-slate-600">Last updated: December 2024</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
                <h3 className="text-lg font-semibold mb-2">Personal Information:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name, email address, phone number</li>
                  <li>Real estate license information</li>
                  <li>Brokerage name and contact details</li>
                  <li>Profile photo (optional)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">Usage Data:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Pages visited, features used</li>
                  <li>AI content generation requests</li>
                  <li>Voice commands and interactions</li>
                  <li>Device information and IP address</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide and improve our services</li>
                  <li>Generate personalized AI content</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Send important updates and notifications</li>
                  <li>Provide customer support</li>
                  <li>Ensure platform security and compliance</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">3. Information Sharing</h2>
                <p>We do not sell your personal information. We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Service Providers:</strong> Third-party vendors who help us operate our platform</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or asset sale</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">4. Third-Party Services</h2>
                <p>Our platform integrates with:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Social media platforms (Facebook, Instagram, LinkedIn, etc.)</li>
                  <li>CRM systems (HubSpot, Salesforce, etc.)</li>
                  <li>Payment processors (Stripe)</li>
                  <li>AI services (OpenAI, ElevenLabs, etc.)</li>
                  <li>Communication services (Twilio, SendGrid, etc.)</li>
                </ul>
                <p>Each service has its own privacy policy governing the use of your data.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Security</h2>
                <p>We implement industry-standard security measures including:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Secure cloud infrastructure (AWS)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">6. Your Rights</h2>
                <p>Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your personal information</li>
                  <li>Restrict processing of your information</li>
                  <li>Data portability</li>
                  <li>Object to processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">7. International Transfers</h2>
                <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">8. Retention</h2>
                <p>We retain your information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your account at any time.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">9. Children's Privacy</h2>
                <p>Our service is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact Us</h2>
                <p>For privacy-related questions or to exercise your rights, contact us at privacy@airealtors247.com</p>
              </section>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}