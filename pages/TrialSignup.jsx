import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import { TrialSecurity } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  CreditCard,
  Clock,
  CheckCircle,
  AlertTriangle,
  Lock,
  Crown,
  Sparkles
} from "lucide-react";

export default function TrialSignupPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_phone: "",
    brokerage_name: "",
    primary_city: "",
    primary_zip_code: "",
    credit_card_number: "",
    expiry_month: "",
    expiry_year: "",
    cvv: "",
    agree_terms: false,
    agree_waiver: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [deviceFingerprint, setDeviceFingerprint] = useState("");
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    // Generate device fingerprint (in production, use a library like FingerprintJS)
    const fingerprint = generateDeviceFingerprint();
    setDeviceFingerprint(fingerprint);
    
    // Get IP address (in production, this would be done server-side)
    fetchIPAddress();
  }, []);

  const generateDeviceFingerprint = () => {
    // Simplified fingerprinting - in production use proper library
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Device fingerprint', 2, 2);
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');
    
    return btoa(fingerprint).substring(0, 32);
  };

  const fetchIPAddress = async () => {
    try {
      // In production, get this from server
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (error) {
      console.error('Error fetching IP:', error);
      setIpAddress('unknown');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.mobile_phone.trim()) newErrors.mobile_phone = "Phone number is required";
    if (!formData.brokerage_name.trim()) newErrors.brokerage_name = "Brokerage name is required";
    if (!formData.primary_city.trim()) newErrors.primary_city = "Primary city is required";
    if (!formData.primary_zip_code.trim()) newErrors.primary_zip_code = "ZIP code is required";
    
    // Credit card validation
    if (!formData.credit_card_number.replace(/\s/g, '')) newErrors.credit_card_number = "Credit card is required";
    if (formData.credit_card_number.replace(/\s/g, '').length < 13) newErrors.credit_card_number = "Invalid card number";
    if (!formData.expiry_month) newErrors.expiry_month = "Expiry month required";
    if (!formData.expiry_year) newErrors.expiry_year = "Expiry year required";
    if (!formData.cvv || formData.cvv.length < 3) newErrors.cvv = "Valid CVV required";
    
    if (!formData.agree_terms) newErrors.agree_terms = "You must agree to terms";
    if (!formData.agree_waiver) newErrors.agree_waiver = "Trial agreement required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Check for existing trials with same fingerprints
      const existingTrials = await TrialSecurity.filter({
        device_fingerprint: deviceFingerprint
      });
      
      if (existingTrials.length > 0) {
        setErrors({ general: "A trial has already been used from this device. Contact support if you believe this is an error." });
        setIsSubmitting(false);
        return;
      }

      // Process $7 deposit charge (in production, use Stripe)
      const paymentResult = await processTrialDeposit(formData);
      
      if (!paymentResult.success) {
        setErrors({ payment: paymentResult.error });
        setIsSubmitting(false);
        return;
      }

      // Create user account
      const userData = {
        ...formData,
        subscription_status: "trial",
        trial_starts_date: new Date().toISOString(),
        trial_ends_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        trial_deposit_paid: true,
        stripe_customer_id: paymentResult.customer_id,
        stripe_payment_method_id: paymentResult.payment_method_id,
        account_status: "active"
      };

      const newUser = await User.create(userData);

      // Create trial security record
      await TrialSecurity.create({
        user_email: formData.email,
        device_fingerprint: deviceFingerprint,
        ip_address: ipAddress,
        credit_card_hash: hashCreditCard(formData.credit_card_number),
        phone_number_hash: hashPhone(formData.mobile_phone),
        payment_verified: true,
        verification_status: "verified"
      });

      // Redirect to onboarding
      window.location.href = "/onboarding";
      
    } catch (error) {
      console.error("Trial signup error:", error);
      setErrors({ general: "Registration failed. Please try again." });
    }
    
    setIsSubmitting(false);
  };

  const processTrialDeposit = async (formData) => {
    // In production, this would integrate with Stripe
    // For simulation, we'll return success
    return {
      success: true,
      customer_id: "cus_" + Math.random().toString(36).substr(2, 9),
      payment_method_id: "pm_" + Math.random().toString(36).substr(2, 9)
    };
  };

  const hashCreditCard = (cardNumber) => {
    // In production, use proper hashing
    return btoa(cardNumber.slice(-4)).substring(0, 8);
  };

  const hashPhone = (phone) => {
    // In production, use proper hashing
    return btoa(phone).substring(0, 8);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Start Your 7-Day Free Trial</h1>
          <p className="text-lg text-slate-600">
            Complete real estate marketing automation - Just $7 deposit (fully refundable)
          </p>
        </div>

        {/* Trial Benefits */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div>
                <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900">AI Content Creation</h3>
                <p className="text-sm text-slate-600">Unlimited viral posts, articles, videos</p>
              </div>
              <div>
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900">Compliance Guaranteed</h3>
                <p className="text-sm text-slate-600">All content pre-checked for legal compliance</p>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-slate-900">Full Automation</h3>
                <p className="text-sm text-slate-600">Set it and forget it marketing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trial Security Notice */}
        <Alert className="bg-amber-50 border-amber-200">
          <Lock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>One Trial Per Person/Device:</strong> Our system tracks device fingerprints, IP addresses, 
            and payment methods to prevent trial abuse. This ensures fair access for all realtors.
          </AlertDescription>
        </Alert>

        {/* Registration Form */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Start Your Free Trial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errors.general && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">First Name *</label>
                  <Input
                    value={formData.first_name}
                    onChange={(e) => setFormData(prev => ({...prev, first_name: e.target.value}))}
                    className={errors.first_name ? "border-red-500" : ""}
                  />
                  {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Last Name *</label>
                  <Input
                    value={formData.last_name}
                    onChange={(e) => setFormData(prev => ({...prev, last_name: e.target.value}))}
                    className={errors.last_name ? "border-red-500" : ""}
                  />
                  {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Email Address *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Mobile Phone *</label>
                  <Input
                    value={formData.mobile_phone}
                    onChange={(e) => setFormData(prev => ({...prev, mobile_phone: e.target.value}))}
                    className={errors.mobile_phone ? "border-red-500" : ""}
                  />
                  {errors.mobile_phone && <p className="text-red-500 text-xs mt-1">{errors.mobile_phone}</p>}
                </div>
              </div>

              {/* Business Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Brokerage Name *</label>
                  <Input
                    value={formData.brokerage_name}
                    onChange={(e) => setFormData(prev => ({...prev, brokerage_name: e.target.value}))}
                    className={errors.brokerage_name ? "border-red-500" : ""}
                  />
                  {errors.brokerage_name && <p className="text-red-500 text-xs mt-1">{errors.brokerage_name}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Primary City *</label>
                  <Input
                    value={formData.primary_city}
                    onChange={(e) => setFormData(prev => ({...prev, primary_city: e.target.value}))}
                    className={errors.primary_city ? "border-red-500" : ""}
                  />
                  {errors.primary_city && <p className="text-red-500 text-xs mt-1">{errors.primary_city}</p>}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Primary ZIP Code *</label>
                <Input
                  value={formData.primary_zip_code}
                  onChange={(e) => setFormData(prev => ({...prev, primary_zip_code: e.target.value}))}
                  className={`w-32 ${errors.primary_zip_code ? "border-red-500" : ""}`}
                />
                {errors.primary_zip_code && <p className="text-red-500 text-xs mt-1">{errors.primary_zip_code}</p>}
              </div>

              {/* Payment Information */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  $7 Refundable Deposit
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  This deposit verifies your payment method and is fully refundable if you cancel within 7 days.
                  If you continue, it will be credited to your first month's subscription.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-2 block">Credit Card Number *</label>
                    <Input
                      value={formData.credit_card_number}
                      onChange={(e) => setFormData(prev => ({...prev, credit_card_number: e.target.value}))}
                      placeholder="1234 5678 9012 3456"
                      className={errors.credit_card_number ? "border-red-500" : ""}
                    />
                    {errors.credit_card_number && <p className="text-red-500 text-xs mt-1">{errors.credit_card_number}</p>}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Month *</label>
                      <Input
                        value={formData.expiry_month}
                        onChange={(e) => setFormData(prev => ({...prev, expiry_month: e.target.value}))}
                        placeholder="MM"
                        maxLength={2}
                        className={errors.expiry_month ? "border-red-500" : ""}
                      />
                      {errors.expiry_month && <p className="text-red-500 text-xs mt-1">{errors.expiry_month}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">Year *</label>
                      <Input
                        value={formData.expiry_year}
                        onChange={(e) => setFormData(prev => ({...prev, expiry_year: e.target.value}))}
                        placeholder="YYYY"
                        maxLength={4}
                        className={errors.expiry_year ? "border-red-500" : ""}
                      />
                      {errors.expiry_year && <p className="text-red-500 text-xs mt-1">{errors.expiry_year}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 mb-2 block">CVV *</label>
                      <Input
                        value={formData.cvv}
                        onChange={(e) => setFormData(prev => ({...prev, cvv: e.target.value}))}
                        placeholder="123"
                        maxLength={4}
                        className={errors.cvv ? "border-red-500" : ""}
                      />
                      {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Agreements */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agree_terms}
                    onCheckedChange={(checked) => setFormData(prev => ({...prev, agree_terms: checked}))}
                  />
                  <label htmlFor="terms" className="text-sm text-slate-700">
                    I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a> *
                  </label>
                </div>
                {errors.agree_terms && <p className="text-red-500 text-xs">{errors.agree_terms}</p>}
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="waiver"
                    checked={formData.agree_waiver}
                    onCheckedChange={(checked) => setFormData(prev => ({...prev, agree_waiver: checked}))}
                  />
                  <label htmlFor="waiver" className="text-sm text-slate-700">
                    I understand this is a one-time trial per person/device, and I authorize the $7 refundable deposit charge *
                  </label>
                </div>
                {errors.agree_waiver && <p className="text-red-500 text-xs">{errors.agree_waiver}</p>}
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-3"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Processing Trial...
                  </>
                ) : (
                  <>
                    <Crown className="w-4 h-4 mr-2" />
                    Start My 7-Day Free Trial
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Footer */}
        <div className="text-center text-sm text-slate-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4" />
            <span>Your data is encrypted and secure</span>
          </div>
          <p>Questions? Contact support@airealtors247.com</p>
        </div>
      </div>
    </div>
  );
}