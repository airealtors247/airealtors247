import React, { useState, useEffect } from 'react';
import { ReferralRequest } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  Gift, 
  Handshake,
  ArrowRight,
  Star,
  Plus
} from 'lucide-react';

export default function ReferralEngine({ user }) {
  const [referralStats, setReferralStats] = useState({
    given: 0,
    received: 0,
    pending: 0,
    totalValue: 0
  });

  const [recentReferrals, setRecentReferrals] = useState([]);

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    try {
      // In a real app, this would query actual referral data
      setReferralStats({
        given: 12,
        received: 8,
        pending: 3,
        totalValue: 45000
      });

      setRecentReferrals([
        {
          name: "Sarah Johnson",
          type: "Mortgage Broker",
          status: "pending",
          date: "2024-01-15",
          value: 5000
        },
        {
          name: "Mike Chen",
          type: "Insurance Agent",
          status: "completed",
          date: "2024-01-12",
          value: 3500
        },
        {
          name: "Lisa Rodriguez",
          type: "Real Estate Agent",
          status: "completed",
          date: "2024-01-10",
          value: 8000
        }
      ]);
    } catch (error) {
      console.error("Error loading referral data:", error);
    }
  };

  const referralPartners = [
    { type: "Mortgage Brokers", count: 5, icon: "🏦" },
    { type: "Insurance Agents", count: 3, icon: "🛡️" },
    { type: "Real Estate Lawyers", count: 2, icon: "⚖️" },
    { type: "Other Realtors", count: 8, icon: "🏠" },
    { type: "Home Inspectors", count: 4, icon: "🔍" },
    { type: "Contractors", count: 6, icon: "🔨" }
  ];

  return (
    <Card className="shadow-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-900">
          <Handshake className="w-6 h-6 text-green-600" />
          AI Referral Engine & Partner Network
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Referral Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <Gift className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">{referralStats.given}</p>
            <p className="text-xs text-slate-600">Referrals Given</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <Star className="w-6 h-6 text-blue-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">{referralStats.received}</p>
            <p className="text-xs text-slate-600">Referrals Received</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <TrendingUp className="w-6 h-6 text-yellow-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">{referralStats.pending}</p>
            <p className="text-xs text-slate-600">Pending</p>
          </div>
          <div className="text-center p-3 bg-white rounded-lg shadow-sm">
            <Users className="w-6 h-6 text-purple-600 mx-auto mb-1" />
            <p className="text-lg font-bold text-slate-900">${referralStats.totalValue.toLocaleString()}</p>
            <p className="text-xs text-slate-600">Total Value</p>
          </div>
        </div>

        {/* Partner Network */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h4 className="font-semibold text-slate-900 mb-3">Your Partner Network</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {referralPartners.map((partner, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{partner.icon}</span>
                  <span className="text-sm font-medium text-slate-700">{partner.type}</span>
                </div>
                <Badge variant="secondary" className="text-xs">{partner.count}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Referral Activity */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold text-slate-900">Recent Referral Activity</h4>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Send Referral
            </Button>
          </div>
          <div className="space-y-3">
            {recentReferrals.map((referral, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    referral.status === 'completed' ? 'bg-green-500' : 
                    referral.status === 'pending' ? 'bg-yellow-500' : 'bg-slate-300'
                  }`}></div>
                  <div>
                    <p className="font-medium text-slate-900">{referral.name}</p>
                    <p className="text-xs text-slate-500">{referral.type} • ${referral.value.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={
                    referral.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    referral.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-800'
                  }>
                    {referral.status}
                  </Badge>
                  <p className="text-xs text-slate-500 mt-1">{referral.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Referral Opportunities */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Handshake className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900">AI-Discovered Opportunities</h4>
          </div>
          <p className="text-sm text-blue-800 mb-3">
            Based on your recent transactions, here are 3 potential referral opportunities:
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">🏦 Recommend mortgage broker to Sarah Johnson</span>
              <Button size="sm" variant="outline" className="text-xs">
                Send <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">🔍 Connect home inspector with Mike Chen</span>
              <Button size="sm" variant="outline" className="text-xs">
                Send <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700">⚖️ Refer real estate lawyer to Lisa Rodriguez</span>
              <Button size="sm" variant="outline" className="text-xs">
                Send <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}