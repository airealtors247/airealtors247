import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Users, 
  Mail, 
  Copy, 
  Gift, 
  TrendingUp, 
  CheckCircle,
  Clock,
  X,
  Plus,
  Zap,
  Crown,
  AlertTriangle
} from 'lucide-react';
import { User } from '@/api/entities';
import { Referral } from '@/api/entities';
import { CreditTransaction } from '@/api/entities';

export default function ReferralEngine({ user, onUpdateUser }) {
  const [referrals, setReferrals] = useState([]);
  const [emailList, setEmailList] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [stats, setStats] = useState({
    totalSent: 0,
    trialStarted: 0,
    converted: 0,
    totalCreditsEarned: 0
  });

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    try {
      const userReferrals = await Referral.filter({ referrer_email: user.email }, '-created_date');
      setReferrals(userReferrals);
      
      // Calculate stats
      const stats = userReferrals.reduce((acc, ref) => {
        acc.totalSent++;
        if (ref.status === 'trial_started' || ref.status === 'converted_paid') acc.trialStarted++;
        if (ref.status === 'converted_paid') acc.converted++;
        acc.totalCreditsEarned += ref.reward_credits_granted || 0;
        return acc;
      }, { totalSent: 0, trialStarted: 0, converted: 0, totalCreditsEarned: 0 });
      
      setStats(stats);
    } catch (error) {
      console.error('Error loading referral data:', error);
    }
  };

  const generateReferralCode = () => {
    if (!user.referral_code) {
      const code = `${user.first_name?.toUpperCase() || 'USER'}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      return code;
    }
    return user.referral_code;
  };

  const referralLink = `https://airealtors247.com/signup?ref=${generateReferralCode()}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // TODO: Add toast notification
  };

  const parseEmails = (emailString) => {
    return emailString
      .split(/[\n,;]/)
      .map(email => email.trim())
      .filter(email => email.length > 0 && email.includes('@'));
  };

  const sendReferrals = async () => {
    const emails = parseEmails(emailList);
    if (emails.length === 0) return;

    setIsSending(true);
    
    try {
      // Create referral records
      const referralPromises = emails.map(email => 
        Referral.create({
          referrer_email: user.email,
          referee_email: email,
          referral_code_used: generateReferralCode(),
          status: 'sent'
        })
      );
      
      await Promise.all(referralPromises);
      
      // TODO: In real implementation, send actual emails here
      // For now, we'll just simulate the email sending
      
      setEmailList('');
      setCustomMessage('');
      loadReferralData();
      
    } catch (error) {
      console.error('Error sending referrals:', error);
    }
    
    setIsSending(false);
  };

  const defaultMessage = `Hey! I've been using AIRealtors247 and it's incredible - AI generates all my social content, lead magnets, and handles my follow-ups automatically. 

You get 50 free credits to try it out (no credit card needed). Perfect for busy realtors like us!

Check it out: ${referralLink}

Let me know what you think!`;

  const getStatusColor = (status) => {
    switch(status) {
      case 'sent': return 'bg-gray-100 text-gray-800';
      case 'trial_started': return 'bg-blue-100 text-blue-800';
      case 'converted_paid': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'sent': return <Clock className="w-4 h-4" />;
      case 'trial_started': return <Users className="w-4 h-4" />;
      case 'converted_paid': return <CheckCircle className="w-4 h-4" />;
      case 'expired': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // Check if user is low on credits
  const isLowOnCredits = user.credits_remaining <= 10;
  const isOutOfCredits = user.credits_remaining <= 0;

  return (
    <div className="space-y-6">
      
      {/* Credit Status Alert */}
      {(isLowOnCredits || isOutOfCredits) && (
        <Alert className={`${isOutOfCredits ? 'border-red-500 bg-red-50' : 'border-amber-500 bg-amber-50'}`}>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="flex justify-between items-center">
              <span className={isOutOfCredits ? 'text-red-800' : 'text-amber-800'}>
                {isOutOfCredits 
                  ? '⚠️ You\'re out of credits! Refer friends to get more, or upgrade to a paid plan.'
                  : `⚡ Only ${user.credits_remaining} credits left! Refer friends or upgrade to keep using AI tools.`
                }
              </span>
              <Button size="sm" variant="outline">
                View Plans
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Mail className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{stats.totalSent}</div>
                <div className="text-sm text-gray-500">Invites Sent</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{stats.trialStarted}</div>
                <div className="text-sm text-gray-500">Started Trials</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{stats.converted}</div>
                <div className="text-sm text-gray-500">Became Paid</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{stats.totalCreditsEarned}</div>
                <div className="text-sm text-gray-500">Credits Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit Earning Structure */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-green-600" />
            How You Earn Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">100 Credits</div>
              <div className="text-sm">When someone starts their free trial</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-green-600">500 Credits</div>
              <div className="text-sm">When they upgrade to Starter ($29)</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-purple-600">1000+ Credits</div>
              <div className="text-sm">Higher plans = more credits!</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-yellow-100 rounded-lg text-center">
            <strong>💡 Pro Tip:</strong> No limits on referrals! The more you refer, the more credits you earn.
          </div>
        </CardContent>
      </Card>

      {/* Send Referrals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Invite Fellow Realtors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          
          {/* Quick Share Options */}
          <div>
            <label className="block text-sm font-medium mb-2">Your Referral Link</label>
            <div className="flex gap-2">
              <Input 
                value={referralLink} 
                readOnly 
                className="flex-1"
              />
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(referralLink)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Bulk Email Invite */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Addresses (one per line, or comma-separated)
            </label>
            <Textarea
              placeholder="john@example.com&#10;sarah@realty.com&#10;mike@properties.net"
              value={emailList}
              onChange={(e) => setEmailList(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Personal Message (Optional)</label>
            <Textarea
              placeholder={defaultMessage}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={6}
            />
          </div>

          <Button 
            onClick={sendReferrals}
            disabled={isSending || parseEmails(emailList).length === 0}
            className="w-full"
          >
            {isSending ? 'Sending...' : `Send ${parseEmails(emailList).length} Invitations`}
          </Button>
        </CardContent>
      </Card>

      {/* Referral History */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          {referrals.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No referrals sent yet. Start inviting colleagues!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {referrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(referral.status)}
                    <div>
                      <div className="font-medium">{referral.referee_email}</div>
                      <div className="text-sm text-gray-500">
                        Sent {new Date(referral.created_date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {referral.reward_credits_granted > 0 && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        +{referral.reward_credits_granted} credits
                      </Badge>
                    )}
                    <Badge className={getStatusColor(referral.status)}>
                      {referral.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}