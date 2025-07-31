
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User } from '@/api/entities';
import { LegalCompliance } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LegalComplianceModal({ user, onSuccess }) {
  const [acceptedPolicies, setAcceptedPolicies] = useState({
    terms_of_service: false,
    privacy_policy: false,
    cookie_policy: false,
    data_management_policy: false,
    communication_consent: false,
    ai_disclaimer: false,
    third_party_integration_disclosure: false,
    realtor_trademark_disclaimer: false,
    scraping_compliance: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrolledToBottom, setScrolledToBottom] = useState({
    terms: false,
    privacy: false,
    cookies: false,
    data: false
  });

  const handlePolicyChange = (policyName, checked) => {
    setAcceptedPolicies(prev => ({
      ...prev,
      [policyName]: checked
    }));
  };

  const handleScroll = (policyType, e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 20; // Increased tolerance
    
    if (isScrolledToBottom) {
      setScrolledToBottom(prev => ({
        ...prev,
        [policyType]: true
      }));
    }
  };

  const allPoliciesAccepted = Object.values(acceptedPolicies).every(accepted => accepted);
  const allRequiredScrolled = Object.values(scrolledToBottom).every(scrolled => scrolled);

  const handleAcceptAll = async () => {
    if (!allPoliciesAccepted || !user || !allRequiredScrolled) return;

    setIsSubmitting(true);
    try {
      await LegalCompliance.create({
        user_email: user.email,
        acceptance_timestamp: new Date().toISOString(),
        ip_address: '127.0.0.1', // In production, get real IP
        user_agent: navigator.userAgent,
        accepted_policies: acceptedPolicies,
        compliance_version: "1.0",
        device_fingerprint: navigator.userAgent + Date.now(),
        geolocation: {
          country: user.country || 'US',
          region: user.brokerage_state_province || 'Unknown'
        }
      });
      
      // Award welcome credits immediately upon agreement
      await User.updateMyUserData({
        credits_remaining: (user.credits_remaining || 0) + 50,
        setup_completed: true,
        onboarding_completed: true
      });
      
      onSuccess();
    } catch (error) {
      console.error("Error saving legal compliance:", error);
      alert("Error saving your agreement. Please try again.");
    }
    setIsSubmitting(false);
  };

  const policies = [
    {
      key: 'terms_of_service',
      title: 'Terms of Service',
      description: 'I have read and agree to the Terms of Service and understand that AIRealtors247 is a software tool that does not provide legal, financial, or real estate brokerage services.',
      scrollKey: 'terms',
      content: `By accessing AIRealtors247, you agree to these terms. AIRealtors247 is NOT a licensed real estate broker or legal advisor. You are solely responsible for compliance with all laws and must consult your broker for guidance. All AI-generated content requires your review before use. We provide software tools only and make no guarantees about results. You acknowledge this is a business tool requiring professional judgment.`
    },
    {
      key: 'privacy_policy',
      title: 'Privacy Policy',
      description: 'I have read and agree to the Privacy Policy and understand how my data is collected, used, and protected.',
      scrollKey: 'privacy',
      content: `We collect personal information (name, email, license info), usage data, and business information to provide our services. We do not sell your data. Information may be shared with service providers under strict agreements. You have rights to access, correct, and delete your data. We use industry-standard security measures to protect your information.`
    },
    {
      key: 'cookie_policy',
      title: 'Cookie Policy',
      description: 'I consent to the use of cookies and similar technologies to enhance my experience on the platform.',
      scrollKey: 'cookies',
      content: `We use essential cookies (required for functionality), functional cookies (preferences), analytics cookies (Google Analytics), and marketing cookies (ads). You can manage cookie preferences through your browser settings. Disabling essential cookies may affect functionality. We respect your privacy choices.`
    },
    {
      key: 'data_management_policy',
      title: 'Data Management Policy',
      description: 'I understand how my data is managed, stored, and can be deleted upon request.',
      scrollKey: 'data',
      content: `We follow data minimization principles, encrypt all data, and retain information only as long as necessary. Active accounts: data retained while active. Inactive accounts: deleted after 3 years. Account deletion: data removed within 30 days. You have full control over your data and can request deletion at any time.`
    }
  ];

  const additionalConsents = [
    {
      key: 'communication_consent',
      title: 'Communication Consent',
      description: 'I consent to receiving communications from AIRealtors247 including product updates, training materials, and support messages.'
    },
    {
      key: 'ai_disclaimer',
      title: 'AI Disclaimer & Responsibility',
      description: 'I understand that AI-generated content is for guidance only. I am solely responsible for reviewing all content for accuracy, compliance with local laws, and adherence to my brokerage policies before use.'
    },
    {
      key: 'third_party_integration_disclosure',
      title: 'Third-Party Integration Disclosure',
      description: 'I understand that this platform integrates with third-party services and I consent to data sharing necessary for these integrations to function.'
    },
    {
      key: 'realtor_trademark_disclaimer',
      title: 'REALTOR® Trademark Disclaimer',
      description: 'I understand that REALTOR® is a registered trademark. I will only use this term if I am a member of the National Association of REALTORS® or applicable local association.'
    },
    {
      key: 'scraping_compliance',
      title: 'Data Collection Compliance',
      description: 'I understand that any data collection or web scraping performed by this platform complies with website terms of service and applicable laws. I am responsible for ensuring my use of such data is compliant.'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-4xl shadow-2xl animate-in fade-in-0 zoom-in-95 my-8">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl">Legal & Compliance Agreement</CardTitle>
          <p className="text-slate-500">
            Please review and accept the following policies to continue using AIRealtors247.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>AIRealtors247 is a powerful tool, not a licensed professional.</strong> You are responsible for all legal and compliance aspects of your business. Consult your broker for guidance.
            </AlertDescription>
          </Alert>
          
          {/* Scrollable Policy Sections */}
          <div className="space-y-6">
            {policies.map(policy => (
              <div key={policy.key} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{policy.title}</h3>
                  <Link 
                    to={createPageUrl(policy.title.replace(/\s+/g, ''))} 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
                  >
                    View Full Document <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                
                <ScrollArea 
                  className="h-24 w-full rounded border p-3 bg-slate-50"
                  onScrollCapture={(e) => handleScroll(policy.scrollKey, e)}
                >
                  <p className="text-sm leading-relaxed">{policy.content}</p>
                  <div className="mt-3 text-xs text-slate-500 italic">
                    {scrolledToBottom[policy.scrollKey] ? '✓ Scrolled to bottom' : 'Scroll to bottom to enable checkbox...'}
                  </div>
                </ScrollArea>
                
                <div className="flex items-start space-x-3 mt-3">
                  <Checkbox
                    id={policy.key}
                    checked={acceptedPolicies[policy.key]}
                    onCheckedChange={(checked) => handlePolicyChange(policy.key, checked)}
                    disabled={!scrolledToBottom[policy.scrollKey]}
                  />
                  <label
                    htmlFor={policy.key}
                    className={`text-sm leading-none cursor-pointer ${!scrolledToBottom[policy.scrollKey] ? 'text-slate-400' : 'text-slate-900'}`}
                  >
                    {policy.description}
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Consents */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Additional Consents & Acknowledgments</h3>
            {additionalConsents.map(consent => (
              <div key={consent.key} className="flex items-start space-x-3">
                <Checkbox
                  id={consent.key}
                  checked={acceptedPolicies[consent.key]}
                  onCheckedChange={(checked) => handlePolicyChange(consent.key, checked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor={consent.key}
                    className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {consent.title}
                  </label>
                  <p className="text-sm text-muted-foreground">
                    {consent.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            onClick={handleAcceptAll}
            disabled={!allPoliciesAccepted || isSubmitting || !allRequiredScrolled}
            className="w-full text-lg py-6"
          >
            {isSubmitting ? 'Submitting...' : 'I Agree to All Terms & Continue to Platform'}
          </Button>
          
          {!allRequiredScrolled && (
            <p className="text-sm text-amber-600 text-center">
              Please scroll to the bottom of each policy document above to enable signing.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
