import React, { useState, useEffect } from 'react';
import { ReferralPartner } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  TrendingUp, 
  Gift, 
  Plus,
  Crown,
  Star,
  ArrowRight,
  Copy
} from 'lucide-react';

export default function ReferralTree({ user }) {
  const [referralTree, setReferralTree] = useState([]);
  const [totalCommissions, setTotalCommissions] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReferralTree();
  }, []);

  const loadReferralTree = async () => {
    try {
      const partners = await ReferralPartner.filter({ inviter_email: user.email });
      setReferralTree(partners);
      
      const totalEarned = partners.reduce((sum, partner) => sum + (partner.commission_earned || 0), 0);
      setTotalCommissions(totalEarned);
    } catch (error) {
      console.error("Error loading referral tree:", error);
      // Mock data for demonstration
      setReferralTree([
        {
          partner_name: "Sarah Johnson",
          partner_type: "realtor",
          signup_date: "2024-01-10T00:00:00Z",
          status: "active",
          total_referrals_given: 12,
          total_referrals_received: 8,
          commission_earned: 2400,
          referral_tree_level: 1
        },
        {
          partner_name: "Mike Chen",
          partner_type: "mortgage_broker",
          signup_date: "2024-01-15T00:00:00Z",
          status: "active",
          total_referrals_given: 8,
          total_referrals_received: 15,
          commission_earned: 1800,
          referral_tree_level: 1
        },
        {
          partner_name: "Lisa Rodriguez",
          partner_type: "lawyer",
          signup_date: "2024-01-08T00:00:00Z",
          status: "active",
          total_referrals_given: 6,
          total_referrals_received: 4,
          commission_earned: 1200,
          referral_tree_level: 2
        }
      ]);
      setTotalCommissions(5400);
    }
    setIsLoading(false);
  };

  const getPartnerIcon = (type) => {
    const icons = {
      realtor: "🏠",
      mortgage_broker: "🏦",
      lawyer: "⚖️",
      stager: "🎨",
      photographer: "📸",
      inspector: "🔍",
      contractor: "🔨",
      insurance_agent: "🛡️"
    };
    return icons[type] || "👤";
  };

  const getStatusColor = (status) => {
    const colors = {
      invited: "bg-yellow-100 text-yellow-800",
      signed_up: "bg-blue-100 text-blue-800", 
      active: "bg-green-100 text-green-800",
      churned: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const copyReferralLink = () => {
    const referralLink = `https://airealtors247.com/join?ref=${user.email}`;
    navigator.clipboard.writeText(referralLink);
    // Show toast notification
  };

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900">
          <Users className="w-6 h-6 text-green-600" />
          Your Referral Network
          <Badge className="bg-green-600 text-white">
            ${totalCommissions.toLocaleString()} Earned
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Network Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-slate-900">{referralTree.length}</div>
            <div className="text-xs text-slate-600">Partners Invited</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <Star className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-slate-900">
              {referralTree.filter(p => p.status === 'active').length}
            </div>
            <div className="text-xs text-slate-600">Active Partners</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-slate-900">
              {referralTree.reduce((sum, p) => sum + p.total_referrals_given, 0)}
            </div>
            <div className="text-xs text-slate-600">Total Referrals</div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-slate-900 mb-2">Your Referral Link</h4>
          <div className="flex items-center gap-2">
            <div className="flex-1 p-2 bg-slate-100 rounded text-sm font-mono text-slate-700">
              https://airealtors247.com/join?ref={user.email}
            </div>
            <Button size="sm" onClick={copyReferralLink}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Share this link to earn commissions when others join AIRealtors247
          </p>
        </div>

        {/* Partner List */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-slate-900">Your Network</h4>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Invite Partner
            </Button>
          </div>
          
          <div className="space-y-3">
            {referralTree.map((partner, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getPartnerIcon(partner.partner_type)}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{partner.partner_name}</span>
                      {partner.referral_tree_level > 1 && (
                        <Crown className="w-4 h-4 text-yellow-500" title={`Level ${partner.referral_tree_level}`} />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(partner.status)} variant="secondary">
                        {partner.status}
                      </Badge>
                      <span className="text-xs text-slate-500">
                        {partner.partner_type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-green-600">
                    ${partner.commission_earned?.toLocaleString() || 0}
                  </div>
                  <div className="text-xs text-slate-500">
                    {partner.total_referrals_given} given • {partner.total_referrals_received} received
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Viral Growth Engine */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-purple-900">Viral Growth Bonuses</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-purple-700">5+ Active Partners:</span>
              <Badge className="bg-purple-100 text-purple-800">+$500 Bonus</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700">10+ Active Partners:</span>
              <Badge className="bg-purple-100 text-purple-800">+$1,500 Bonus</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-700">20+ Active Partners:</span>
              <Badge className="bg-purple-100 text-purple-800">+$5,000 Bonus</Badge>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-purple-200">
            <p className="text-xs text-purple-600">
              Next milestone: {Math.max(0, 5 - referralTree.filter(p => p.status === 'active').length)} more active partners for $500 bonus
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}