import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  User as UserIcon,
  Building,
  Phone,
  MapPin,
  Settings,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Crown,
  Zap
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    first_name: "",
    last_name: "",
    email: "",
    mobile_phone: "",
    
    // Brokerage Info
    brokerage_name: "",
    brokerage_address: "",
    brokerage_city: "",
    brokerage_state: "",
    brokerage_zip: "",
    office_phone: "",
    
    // Territory
    primary_city: "",
    primary_zip_code: "",
    service_areas: [],
    
    // Phone System
    sip_provider: "",
    sip_trunk_1: "",
    sip_trunk_2: "",
    
    // CRM Preference
    crm_option: "provided_ghl", // provided_ghl or existing_crm
    existing_crm_type: "",
    existing_crm_credentials: {}
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
      
      // Pre-fill form with existing data
      setFormData(prev => ({
        ...prev,
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || ""
      }));
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const sipProviders = [
    { id: "twilio", name: "Twilio", description: "Most popular, reliable" },
    { id: "plivo", name: "Plivo", description: "Cost-effective, good quality" },
    { id: "telnyx", name: "Telnyx", description: "Enterprise-grade" },
    { id: "rogers", name: "Rogers (Canada)", description: "Canadian carrier" },
    { id: "bell", name: "Bell (Canada)", description: "Canadian carrier" },
    { id: "other", name: "Other Provider", description: "Custom configuration" }
  ];

  const crmOptions = [
    { id: "provided_ghl", name: "Use Provided GoHighLevel", description: "We setup everything for you (Recommended)" },
    { id: "existing_crm", name: "Connect My Existing CRM", description: "Link your current CRM system" }
  ];

  const existingCrmTypes = [
    { id: "gohighlevel", name: "GoHighLevel" },
    { id: "salesforce", name: "Salesforce" },
    { id: "hubspot", name: "HubSpot" },
    { id: "pipedrive", name: "Pipedrive" },
    { id: "zoho", name: "Zoho CRM" },
    { id: "freshsales", name: "Freshsales" },
    { id: "other", name: "Other CRM" }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Update user profile with onboarding data
      await User.updateMyUserData({
        ...formData,
        onboarding_completed: true,
        setup_status: "provisioning"
      });

      // Trigger automated setup process
      // This would normally call backend APIs to:
      // 1. Create GHL account or connect existing CRM
      // 2. Configure SIP trunks with chosen provider
      // 3. Setup territory assignments
      // 4. Configure social media automation
      // 5. Setup AI content generation
      
      // For now, simulate the process
      setTimeout(() => {
        alert("Setup complete! Your AIRealtors247 platform is being configured. You'll receive an email when ready.");
        window.location.href = "/dashboard";
      }, 3000);
      
    } catch (error) {
      console.error("Error submitting onboarding:", error);
    }
    setIsSubmitting(false);
  };

  const addServiceArea = () => {
    const newArea = prompt("Enter city or zip code:");
    if (newArea && !formData.service_areas.includes(newArea)) {
      setFormData(prev => ({
        ...prev,
        service_areas: [...prev.service_areas, newArea]
      }));
    }
  };

  const removeServiceArea = (area) => {
    setFormData(prev => ({
      ...prev,
      service_areas: prev.service_areas.filter(a => a !== area)
    }));
  };

  const progress = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Welcome to AIRealtors247! 🎉
          </h1>
          <p className="text-xl text-slate-600 mb-6">
            Let's get your AI-powered real estate platform set up in just a few minutes
          </p>
          <div className="max-w-md mx-auto">
            <Progress value={progress} className="h-3" />
            <p className="text-sm text-slate-500 mt-2">Step {currentStep} of 4</p>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl flex items-center justify-center gap-3">
              {currentStep === 1 && <><UserIcon className="w-6 h-6 text-blue-600" /> Personal Information</>}
              {currentStep === 2 && <><Building className="w-6 h-6 text-green-600" /> Brokerage Details</>}
              {currentStep === 3 && <><MapPin className="w-6 h-6 text-purple-600" /> Service Territory</>}
              {currentStep === 4 && <><Settings className="w-6 h-6 text-orange-600" /> System Configuration</>}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name *
                    </label>
                    <Input
                      value={formData.first_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name *
                    </label>
                    <Input
                      value={formData.last_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      placeholder="Smith"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john.smith@email.com"
                    disabled
                    className="bg-slate-50"
                  />
                  <p className="text-xs text-slate-500 mt-1">This will be your login email</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Mobile Phone *
                  </label>
                  <Input
                    type="tel"
                    value={formData.mobile_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile_phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1">For notifications and 2FA</p>
                </div>
              </div>
            )}

            {/* Step 2: Brokerage Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Brokerage Name *
                  </label>
                  <Input
                    value={formData.brokerage_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, brokerage_name: e.target.value }))}
                    placeholder="Smith Real Estate Group"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Brokerage Address *
                  </label>
                  <Input
                    value={formData.brokerage_address}
                    onChange={(e) => setFormData(prev => ({ ...prev, brokerage_address: e.target.value }))}
                    placeholder="123 Main Street, Suite 100"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      City *
                    </label>
                    <Input
                      value={formData.brokerage_city}
                      onChange={(e) => setFormData(prev => ({ ...prev, brokerage_city: e.target.value }))}
                      placeholder="Beverly Hills"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      State/Province *
                    </label>
                    <Input
                      value={formData.brokerage_state}
                      onChange={(e) => setFormData(prev => ({ ...prev, brokerage_state: e.target.value }))}
                      placeholder="CA"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Zip/Postal Code *
                    </label>
                    <Input
                      value={formData.brokerage_zip}
                      onChange={(e) => setFormData(prev => ({ ...prev, brokerage_zip: e.target.value }))}
                      placeholder="90210"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Office Phone *
                  </label>
                  <Input
                    type="tel"
                    value={formData.office_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, office_phone: e.target.value }))}
                    placeholder="+1 (555) 987-6543"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3: Service Territory */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Alert>
                  <MapPin className="h-4 w-4" />
                  <AlertDescription>
                    Define your primary service area. This will be used for lead generation and territory management.
                  </AlertDescription>
                </Alert>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Primary City *
                    </label>
                    <Input
                      value={formData.primary_city}
                      onChange={(e) => setFormData(prev => ({ ...prev, primary_city: e.target.value }))}
                      placeholder="Beverly Hills"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Primary Zip Code *
                    </label>
                    <Input
                      value={formData.primary_zip_code}
                      onChange={(e) => setFormData(prev => ({ ...prev, primary_zip_code: e.target.value }))}
                      placeholder="90210"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Additional Service Areas (Optional)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.service_areas.map((area, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {area}
                        <button
                          onClick={() => removeServiceArea(area)}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" onClick={addServiceArea}>
                    <MapPin className="w-4 h-4 mr-2" />
                    Add Service Area
                  </Button>
                  <p className="text-xs text-slate-500 mt-1">
                    Add cities or zip codes where you provide services
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: System Configuration */}
            {currentStep === 4 && (
              <div className="space-y-8">
                
                {/* SIP Provider Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Phone System Setup</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    Choose your SIP trunk provider for incoming and outgoing calls
                  </p>
                  
                  <Select 
                    value={formData.sip_provider} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, sip_provider: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select SIP Provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {sipProviders.map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          <div>
                            <div className="font-medium">{provider.name}</div>
                            <div className="text-xs text-slate-500">{provider.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {formData.sip_provider && (
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          SIP Trunk Line 1 *
                        </label>
                        <Input
                          value={formData.sip_trunk_1}
                          onChange={(e) => setFormData(prev => ({ ...prev, sip_trunk_1: e.target.value }))}
                          placeholder="+1 (555) 100-0001"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          SIP Trunk Line 2 (Optional)
                        </label>
                        <Input
                          value={formData.sip_trunk_2}
                          onChange={(e) => setFormData(prev => ({ ...prev, sip_trunk_2: e.target.value }))}
                          placeholder="+1 (555) 100-0002"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* CRM Configuration */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">CRM Setup</h3>
                  <div className="space-y-4">
                    {crmOptions.map((option) => (
                      <div key={option.id} className="border rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="crm_option"
                            value={option.id}
                            checked={formData.crm_option === option.id}
                            onChange={(e) => setFormData(prev => ({ ...prev, crm_option: e.target.value }))}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium text-slate-900">{option.name}</div>
                            <div className="text-sm text-slate-600">{option.description}</div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                  
                  {formData.crm_option === "existing_crm" && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Select Your CRM Type
                      </label>
                      <Select 
                        value={formData.existing_crm_type} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, existing_crm_type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your CRM" />
                        </SelectTrigger>
                        <SelectContent>
                          {existingCrmTypes.map((crm) => (
                            <SelectItem key={crm.id} value={crm.id}>
                              {crm.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-slate-500 mt-2">
                        We'll guide you through connecting your existing CRM after setup
                      </p>
                    </div>
                  )}
                </div>

                {/* What Happens Next */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    What Happens Next
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">We'll automatically set up your GoHighLevel CRM account</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Configure your SIP trunks for AI voice calling</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Setup social media automation accounts</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Generate AI content for your territory</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm">Start lead generation campaigns automatically</span>
                    </div>
                  </div>
                  <Alert className="mt-4 bg-white border-blue-200">
                    <Crown className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Setup takes 24-48 hours.</strong> You'll receive email updates and can track progress in your dashboard.
                    </AlertDescription>
                  </Alert>
                </div>

              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-slate-500">
                  Step {currentStep} of 4
                </p>
              </div>
              
              {currentStep < 4 ? (
                <Button onClick={handleNext}>
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Setting Up Platform...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Complete Setup
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Benefits Footer */}
        <div className="text-center">
          <p className="text-slate-600 mb-4">
            🚀 <strong>Everything is automated!</strong> No technical setup required.
          </p>
          <div className="flex justify-center gap-8 text-sm text-slate-500">
            <span>✓ AI Lead Generation</span>
            <span>✓ Social Media Automation</span>
            <span>✓ Voice AI Calling</span>
            <span>✓ CRM Integration</span>
            <span>✓ Territory Management</span>
          </div>
        </div>

      </div>
    </div>
  );
}