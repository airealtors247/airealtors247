import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Lock } from 'lucide-react';

export default function DataPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-purple-600" />
            </div>
            <CardTitle className="text-3xl">Data Management Policy</CardTitle>
            <p className="text-slate-600">Last updated: December 2024</p>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <div className="space-y-6 text-sm leading-relaxed">
              
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">1. Data Collection Principles</h2>
                <p>We collect only the data necessary to provide our services effectively:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Minimal Collection:</strong> We collect only what's needed</li>
                  <li><strong>Purpose Limitation:</strong> Data is used only for stated purposes</li>
                  <li><strong>Accuracy:</strong> We strive to keep data accurate and up-to-date</li>
                  <li><strong>Storage Limitation:</strong> Data is retained only as long as necessary</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">2. Types of Data We Process</h2>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Personal Data</h3>
                    <ul className="list-disc pl-6 text-blue-800">
                      <li>Contact information (name, email, phone)</li>
                      <li>Professional details (license, brokerage)</li>
                      <li>Account credentials and preferences</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Business Data</h3>
                    <ul className="list-disc pl-6 text-green-800">
                      <li>Lead and client information</li>
                      <li>Property listings and transactions</li>
                      <li>Marketing campaigns and content</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">Usage Data</h3>
                    <ul className="list-disc pl-6 text-purple-800">
                      <li>Platform interactions and preferences</li>
                      <li>AI content generation requests</li>
                      <li>Performance and analytics metrics</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data Storage and Security</h2>
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Security Measures:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Encryption:</strong> All data encrypted in transit and at rest</li>
                    <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication</li>
                    <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
                    <li><strong>Backup Systems:</strong> Automated backups with disaster recovery</li>
                    <li><strong>Cloud Infrastructure:</strong> AWS with enterprise-grade security</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data Retention</h2>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Active Accounts:</h4>
                    <p>Data retained while account is active and for legitimate business purposes</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold">Inactive Accounts:</h4>
                    <p>Personal data deleted after 3 years of inactivity (unless legally required to retain)</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold">Account Deletion:</h4>
                    <p>Data deleted within 30 days of account deletion request</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">5. Your Data Rights</h2>
                <p>You have the following rights regarding your data:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Access:</strong> Request copies of your personal data</li>
                  <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                  <li><strong>Restriction:</strong> Limit how we process your data</li>
                  <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
                  <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">6. Data Sharing and Transfers</h2>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">We DO NOT:</h3>
                  <ul className="list-disc pl-6 text-red-800">
                    <li>Sell your personal data to third parties</li>
                    <li>Share client data without your consent</li>
                    <li>Use your data for unrelated purposes</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-4">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">We MAY share data with:</h3>
                  <ul className="list-disc pl-6 text-green-800">
                    <li>Service providers (under strict data processing agreements)</li>
                    <li>Legal authorities (when required by law)</li>
                    <li>New owners (in case of business transfer, with your notice)</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">7. International Transfers</h2>
                <p>If you're located outside the United States, your data may be transferred to and processed in the US. We ensure appropriate safeguards are in place for international transfers.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">8. Data Breach Procedures</h2>
                <p>In the unlikely event of a data breach:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>We will assess and contain the breach immediately</li>
                  <li>Authorities will be notified within 72 hours if required</li>
                  <li>Affected users will be notified without undue delay</li>
                  <li>We will provide clear information about the breach and our response</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">9. Children's Data</h2>
                <p>We do not knowingly collect or process data from individuals under 18 years of age. If we become aware of such data, we will delete it immediately.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact Our Data Protection Team</h2>
                <p>For data-related questions or to exercise your rights:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Email:</strong> privacy@airealtors247.com</li>
                  <li><strong>Response Time:</strong> Within 30 days</li>
                  <li><strong>Data Protection Officer:</strong> Available for complex requests</li>
                </ul>
              </section>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}