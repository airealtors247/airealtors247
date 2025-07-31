import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cookie, Settings } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cookie className="w-8 h-8 text-amber-600" />
            </div>
            <CardTitle className="text-3xl">Cookie Policy</CardTitle>
            <p className="text-slate-600">Last updated: December 2024</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">1. What Are Cookies</h2>
                <p>Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our platform.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">2. Types of Cookies We Use</h2>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Essential Cookies</h3>
                    <p className="text-blue-800">Required for the website to function properly. These cannot be disabled.</p>
                    <ul className="list-disc pl-6 mt-2 text-blue-700">
                      <li>Authentication tokens</li>
                      <li>Session management</li>
                      <li>Security features</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Functional Cookies</h3>
                    <p className="text-green-800">Remember your preferences and settings.</p>
                    <ul className="list-disc pl-6 mt-2 text-green-700">
                      <li>Language preferences</li>
                      <li>Dashboard layout</li>
                      <li>Theme settings</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">Analytics Cookies</h3>
                    <p className="text-purple-800">Help us understand how you use our platform.</p>
                    <ul className="list-disc pl-6 mt-2 text-purple-700">
                      <li>Google Analytics</li>
                      <li>Usage statistics</li>
                      <li>Performance monitoring</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-orange-900 mb-2">Marketing Cookies</h3>
                    <p className="text-orange-800">Used to deliver relevant advertisements.</p>
                    <ul className="list-disc pl-6 mt-2 text-orange-700">
                      <li>Facebook Pixel</li>
                      <li>Google Ads</li>
                      <li>LinkedIn Insights</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">3. Third-Party Cookies</h2>
                <p>Some cookies are placed by third-party services we use:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Google Analytics:</strong> Website usage analysis</li>
                  <li><strong>Stripe:</strong> Payment processing</li>
                  <li><strong>Intercom:</strong> Customer support chat</li>
                  <li><strong>Social Media Platforms:</strong> Login and sharing features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">4. Managing Cookies</h2>
                <p>You can control cookies through:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies</li>
                  <li><strong>Cookie Preferences:</strong> Use our cookie consent banner to manage preferences</li>
                  <li><strong>Opt-out Tools:</strong> Some third parties provide opt-out mechanisms</li>
                </ul>
                <p className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <strong>Note:</strong> Disabling essential cookies may affect website functionality.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">5. Cookie Consent</h2>
                <p>By using our website, you consent to our use of cookies as described in this policy. You can withdraw consent at any time by adjusting your browser settings or contacting us.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">6. Updates to This Policy</h2>
                <p>We may update this Cookie Policy periodically. Changes will be posted on this page with an updated revision date.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">7. Contact Us</h2>
                <p>For questions about our use of cookies, please contact us at privacy@airealtors247.com</p>
              </section>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}