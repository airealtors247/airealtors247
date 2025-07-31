import React, { useState, useEffect } from 'react';
import { User } from "@/api/entities";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContactImportWizard from "../components/referral/ContactImportWizard";
import SocialMediaBlaster from "../components/referral/SocialMediaBlaster";
import ReferralDashboard from "../components/referral/ReferralDashboard";

export default function ReferralEnginePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    }
    setIsLoading(false);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center bg-gradient-to-r from-purple-900 to-blue-900 rounded-3xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">
            🚀 Viral Referral Engine
          </h1>
          <p className="text-xl text-purple-100 mb-4">
            Turn every contact into credits. Every post into profit. Every user into your marketing team.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold">100</div>
              <div className="text-purple-200">Credits per paid referral</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold">$0</div>
              <div className="text-purple-200">Cost to you upfront</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="text-2xl font-bold">∞</div>
              <div className="text-purple-200">Viral potential</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm h-12">
            <TabsTrigger value="dashboard" className="text-sm">📊 Dashboard</TabsTrigger>
            <TabsTrigger value="contacts" className="text-sm">📱 Import Contacts</TabsTrigger>
            <TabsTrigger value="social" className="text-sm">📣 Social Blast</TabsTrigger>
            <TabsTrigger value="ugc" className="text-sm">🎥 UGC Videos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <ReferralDashboard user={user} />
          </TabsContent>

          <TabsContent value="contacts" className="mt-6">
            <ContactImportWizard user={user} onComplete={() => {}} />
          </TabsContent>

          <TabsContent value="social" className="mt-6">
            <SocialMediaBlaster user={user} onComplete={() => {}} />
          </TabsContent>

          <TabsContent value="ugc" className="mt-6">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">🎥 UGC Video Generator</h3>
              <p className="text-gray-600 mb-6">Coming soon - Record quick selfie videos that auto-post with AI branding!</p>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
                <p className="text-orange-800">
                  <strong>Next:</strong> 15-second selfie videos with AI overlay + auto-posting = 3-10x viral reach!
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}