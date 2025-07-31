
import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  User as UserIcon,
  Crown,
  Camera,
  Save,
  Calendar,
  Phone,
  ShieldCheck,
  Lock,
  AlertTriangle,
  Target,
  Rocket,
  Zap,
  PlayCircle
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import NicheSpecializationSetup from "../components/onboarding/NicheSpecializationSetup";
import PhoneNumberManager from '../components/profile/PhoneNumberManager';
import QuickSetupWizard from '../components/dashboard/QuickSetupWizard';
import PowerfulIntegrations from '../components/dashboard/PowerfulIntegrations';
import OneClickAutomation from '../components/dashboard/OneClickAutomation';

const subscriptionTiers = {
  trial: { name: "Trial", color: "bg-gray-500", price: 0 },
  starter: { name: "Starter", color: "bg-blue-500", price: 97 },
  professional: { name: "Professional", color: "bg-green-500", price: 297 },
  premium: { name: "Premium", color: "bg-purple-500", price: 497 },
  enterprise: { name: "Enterprise", color: "bg-red-500", price: 997 },
  unlimited: { name: "Unlimited", color: "bg-amber-500", price: 1497 }
};

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company_name: "",
    phone: "",
    license_number: "",
    brokerage_address: ""
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [pendingChanges, setPendingChanges] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      setFormData({
        full_name: userData.full_name || "",
        email: userData.email || "",
        company_name: userData.company_name || "",
        phone: userData.phone || "",
        license_number: userData.license_number || "",
        brokerage_address: userData.brokerage_address || ""
      });
      setPendingChanges(userData.pending_profile_changes);
    } catch (error) {
      console.error("Error loading user:", error);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await User.updateMyUserData({
        pending_profile_changes: {
          full_name: formData.full_name,
          company_name: formData.company_name,
          phone: formData.phone,
          brokerage_address: formData.brokerage_address,
        }
      });
      await loadUser();
      alert("Profile changes submitted for approval.");
    } catch (error) {
      console.error("Error submitting changes:", error);
    }
    setIsSaving(false);
  };

  const handle2FASetup = async () => {
    const currentlyEnabled = user?.two_factor_enabled;
    const action = currentlyEnabled ? 'disable' : 'enable';
    if (window.confirm(`Are you sure you want to ${action} Two-Factor Authentication?`)) {
      alert(`The flow to ${action} 2FA would be initiated here.`);
    }
  };
  
  const getTrialDaysRemaining = () => {
    if (!user?.trial_ends_date) return 0;
    const trialEnd = new Date(user.trial_ends_date);
    const today = new Date();
    const diffTime = trialEnd - today;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const currentTier = subscriptionTiers[user?.subscription_tier] || subscriptionTiers.trial;
  const trialDaysLeft = getTrialDaysRemaining();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-600">Manage your profile, integrations, and account settings.</p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user?.profile_image_url} />
              <AvatarFallback>{user?.full_name?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-bold text-slate-900">{user?.full_name}</div>
              <div className="text-sm text-slate-500">{user?.email}</div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 bg-slate-100 h-auto p-1 rounded-xl">
            <TabsTrigger value="profile" className="text-xs md:text-sm"><UserIcon className="w-4 h-4 mr-1 md:mr-2" />Profile</TabsTrigger>
            <TabsTrigger value="setup" className="text-xs md:text-sm"><Rocket className="w-4 h-4 mr-1 md:mr-2" />Setup</TabsTrigger>
            <TabsTrigger value="integrations" className="text-xs md:text-sm"><Zap className="w-4 h-4 mr-1 md:mr-2" />Integrations</TabsTrigger>
            <TabsTrigger value="automation" className="text-xs md:text-sm"><PlayCircle className="w-4 h-4 mr-1 md:mr-2" />Automation</TabsTrigger>
            <TabsTrigger value="phones" className="text-xs md:text-sm"><Phone className="w-4 h-4 mr-1 md:mr-2" />Numbers</TabsTrigger>
            <TabsTrigger value="specialization" className="text-xs md:text-sm"><Target className="w-4 h-4 mr-1 md:mr-2" />Niche</TabsTrigger>
            <TabsTrigger value="subscription" className="text-xs md:text-sm"><Crown className="w-4 h-4 mr-1 md:mr-2" />Plan</TabsTrigger>
            <TabsTrigger value="security" className="text-xs md:text-sm"><ShieldCheck className="w-4 h-4 mr-1 md:mr-2" />Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
             <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>My Profile</CardTitle>
                      <CardDescription>Update your personal and brokerage information.</CardDescription>
                    </div>
                    <div className="relative">
                      <Avatar className="w-16 h-16 ring-2 ring-blue-100">
                        <AvatarImage src={user?.profile_image_url} />
                        <AvatarFallback className="bg-blue-600 text-white font-bold">
                          {user?.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <Button size="icon" variant="outline" className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full">
                        <Camera className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                    {pendingChanges && (
                      <Alert variant="destructive" className="bg-yellow-50 border-yellow-200 text-yellow-800 mb-6">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription>
                          You have pending profile changes awaiting admin approval. Your current information is displayed below.
                        </AlertDescription>
                      </Alert>
                    )}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Full Name</label>
                        <Input value={formData.full_name} onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))} placeholder="Your full name"/>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Email Address</label>
                        <Input value={formData.email} disabled className="bg-slate-50"/>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Company Name</label>
                        <Input value={formData.company_name} onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))} placeholder="Your real estate company"/>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Phone Number</label>
                        <Input value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} placeholder="Your phone number"/>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Brokerage Address</label>
                        <Input value={formData.brokerage_address} onChange={(e) => setFormData(prev => ({ ...prev, brokerage_address: e.target.value }))} placeholder="Your brokerage address"/>
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-slate-700 mb-2 block">Real Estate License Number</label>
                        <Input value={formData.license_number} disabled placeholder="Your license number" className="bg-slate-50"/>
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700">
                        {isSaving ? "Submitting..." : <><Save className="w-4 h-4 mr-2" />Submit for Approval</>}
                      </Button>
                    </div>
                </CardContent>
             </Card>
          </TabsContent>

          <TabsContent value="setup" className="mt-6">
            <QuickSetupWizard user={user} />
          </TabsContent>

          <TabsContent value="integrations" className="mt-6">
            <PowerfulIntegrations user={user} />
          </TabsContent>

          <TabsContent value="automation" className="mt-6">
            <OneClickAutomation user={user} />
          </TabsContent>

          <TabsContent value="phones" className="mt-6">
             <PhoneNumberManager user={user} />
          </TabsContent>
          
          <TabsContent value="specialization" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Specialization</CardTitle>
                <CardDescription>
                  Configure your niche to ensure all AI-generated content positions you as a specialist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user?.niche_specialization ? (
                  <div className="space-y-6">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-blue-900">Current Specialization</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Property Focus:</h4>
                            <div className="flex flex-wrap gap-2">
                              {user.niche_specialization.property_types?.map((type) => (
                                <Badge key={type} className="bg-blue-100 text-blue-800">
                                  {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Target Clients:</h4>
                            <div className="flex flex-wrap gap-2">
                              {user.niche_specialization.target_clientele?.map((clientele) => (
                                <Badge key={clientele} className="bg-green-100 text-green-800">
                                  {clientele.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {user.niche_specialization.brand_positioning && (
                            <div>
                              <h4 className="font-semibold text-blue-900 mb-2">Brand Positioning:</h4>
                              <p className="text-blue-800 italic">"{user.niche_specialization.brand_positioning}"</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('specialization_edit')}
                    >
                      Update Specialization
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No specialization set</h3>
                    <p className="text-slate-500 mb-4">Configure your niche to get targeted AI content</p>
                    <Button onClick={() => setActiveTab('specialization_edit')}>
                      Set Up Specialization
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specialization_edit" className="mt-6">
            <NicheSpecializationSetup
              initialData={user?.niche_specialization || {}}
              onComplete={async (nicheData) => {
                await User.updateMyUserData({ niche_specialization: nicheData });
                await loadUser();
                setActiveTab('specialization');
              }}
            />
          </TabsContent>

          <TabsContent value="subscription" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription & Billing</CardTitle>
                <CardDescription>Manage your AIRealtors247 plan and view billing history.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-slate-600">Current Plan</p>
                            <p className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Badge className={`${currentTier.color} text-white`}>{currentTier.name}</Badge>
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-slate-600">Monthly Rate</p>
                            <p className="text-xl font-bold text-slate-900">${currentTier.price}/mo</p>
                        </div>
                    </div>
                     {user?.subscription_status === 'trial' && (
                        <div className="text-center pt-4 border-t">
                            <p className="text-amber-700 font-semibold">{trialDaysLeft} days remaining in your trial.</p>
                        </div>
                    )}
                    <div className="flex gap-2 pt-4 border-t">
                        <Button>Upgrade Plan</Button>
                        <Button variant="outline">View Billing History</Button>
                    </div>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Enhance your account security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="w-5 h-5 text-slate-600" />
                      <div>
                        <div className="font-medium">Two-Factor Authentication (2FA)</div>
                        <div className="text-sm text-slate-600">Add an extra layer of security.</div>
                      </div>
                    </div>
                    <Button variant={user?.two_factor_enabled ? "destructive" : "outline"} size="sm" onClick={handle2FASetup}>
                      {user?.two_factor_enabled ? 'Disable 2FA' : 'Enable 2FA'}
                    </Button>
                  </CardContent>
                </Card>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    For enhanced security, it is highly recommended to enable Two-Factor Authentication.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
}
