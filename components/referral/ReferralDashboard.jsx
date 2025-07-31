
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Crown, 
  Medal, 
  Zap, 
  Users, 
  TrendingUp,
  Gift,
  Star,
  Flame, // Changed from Fire to Flame
  Target,
  Award,
  Coins
} from 'lucide-react';
import { Referral } from "@/api/entities";
import { User } from "@/api/entities";

export default function ReferralDashboard({ user }) {
  const [stats, setStats] = useState({
    totalReferrals: 0,
    paidConversions: 0,
    totalCreditsEarned: 0,
    thisWeekReferrals: 0,
    rank: 0,
    nextMilestone: 10
  });
  const [leaderboard, setLeaderboard] = useState([]);
  const [userBadges, setUserBadges] = useState([]);

  useEffect(() => {
    loadReferralStats();
    loadLeaderboard();
  }, []);

  const loadReferralStats = async () => {
    // Load user's referral performance
    const referrals = await Referral.filter({ referrer_email: user.email });
    const paidReferrals = referrals.filter(r => r.status === 'converted_paid');
    
    setStats({
      totalReferrals: referrals.length,
      paidConversions: paidReferrals.length,
      totalCreditsEarned: user.total_referral_earnings_credits || 0,
      thisWeekReferrals: referrals.filter(r => 
        new Date(r.created_date) > new Date(Date.now() - 7*24*60*60*1000)
      ).length,
      rank: 1, // Calculate based on leaderboard
      nextMilestone: getNextMilestone(paidReferrals.length)
    });

    setUserBadges(calculateBadges(paidReferrals.length, referrals.length));
  };

  const loadLeaderboard = async () => {
    // This would need backend aggregation in a real implementation
    const mockLeaderboard = [
      { name: "Sarah J.", referrals: 47, credits: 4700, badge: "Gold Partner" },
      { name: "Mike R.", referrals: 31, credits: 3100, badge: "Silver Pro" },
      { name: "Lisa K.", referrals: 28, credits: 2800, badge: "Silver Pro" },
      { name: "You", referrals: stats.paidConversions, credits: stats.totalCreditsEarned, badge: getBadgeLevel(stats.paidConversions) },
      { name: "Tom H.", referrals: 19, credits: 1900, badge: "Bronze Star" }
    ];
    setLeaderboard(mockLeaderboard);
  };

  const getNextMilestone = (current) => {
    const milestones = [5, 10, 25, 50, 100];
    return milestones.find(m => m > current) || current + 50;
  };

  const getBadgeLevel = (referrals) => {
    if (referrals >= 50) return "Gold Partner";
    if (referrals >= 25) return "Silver Pro";
    if (referrals >= 10) return "Bronze Star";
    if (referrals >= 5) return "Rising Referrer";
    return "New Referrer";
  };

  const calculateBadges = (paidReferrals, totalReferrals) => {
    const badges = [];
    if (paidReferrals >= 50) badges.push({ name: "Gold Partner", icon: Crown, color: "text-yellow-600" });
    else if (paidReferrals >= 25) badges.push({ name: "Silver Pro", icon: Medal, color: "text-gray-500" });
    else if (paidReferrals >= 10) badges.push({ name: "Bronze Star", icon: Star, color: "text-amber-600" });
    else if (paidReferrals >= 5) badges.push({ name: "Rising Referrer", icon: TrendingUp, color: "text-green-600" });
    
    if (totalReferrals >= 100) badges.push({ name: "Viral Champion", icon: Flame, color: "text-red-500" }); // Changed Fire to Flame
    if (paidReferrals >= 10) badges.push({ name: "Revenue Driver", icon: Target, color: "text-blue-600" });
    
    return badges;
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">{stats.totalReferrals}</p>
                <p className="text-sm text-blue-600">Total Referrals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Coins className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-900">{stats.paidConversions}</p>
                <p className="text-sm text-green-600">Paid Conversions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-900">{stats.totalCreditsEarned.toLocaleString()}</p>
                <p className="text-sm text-purple-600">Credits Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Flame className="w-5 h-5 text-orange-600" /> {/* Changed Fire to Flame */}
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-900">{stats.thisWeekReferrals}</p>
                <p className="text-sm text-orange-600">This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges & Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            Your Referrer Status & Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {userBadges.map((badge, index) => (
                <Badge key={index} className="flex items-center gap-2 p-2 bg-white border">
                  <badge.icon className={`w-4 h-4 ${badge.color}`} />
                  {badge.name}
                </Badge>
              ))}
              {userBadges.length === 0 && (
                <Badge variant="outline" className="flex items-center gap-2 p-2">
                  <Star className="w-4 h-4 text-gray-400" />
                  New Referrer
                </Badge>
              )}
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Progress to {getBadgeLevel(stats.nextMilestone)}</span>
                <span className="text-sm text-gray-600">{stats.paidConversions}/{stats.nextMilestone}</span>
              </div>
              <Progress 
                value={(stats.paidConversions / stats.nextMilestone) * 100} 
                className="h-2 mb-2"
              />
              <p className="text-sm text-gray-600">
                {stats.nextMilestone - stats.paidConversions} more paid referrals to unlock the next level!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-gold-600" />
            🔥 Top Referrers This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((user, index) => (
              <div key={index} className={`flex items-center gap-4 p-3 rounded-lg ${
                user.name === 'You' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{user.name}</span>
                    {user.name === 'You' && <Badge variant="outline">You</Badge>}
                    <Badge className="text-xs">{user.badge}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {user.referrals} paid referrals • {user.credits.toLocaleString()} credits earned
                  </p>
                </div>
                {index === 0 && <Crown className="w-6 h-6 text-yellow-500" />}
                {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
                {index === 2 && <Award className="w-6 h-6 text-amber-600" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button className="h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-lg">
          <Users className="w-6 h-6 mr-2" />
          Import More Contacts
        </Button>
        <Button className="h-16 bg-gradient-to-r from-purple-600 to-pink-600 text-lg">
          <Flame className="w-6 h-6 mr-2" /> {/* Changed Fire to Flame */}
          Blast Social Media Again
        </Button>
      </div>
    </div>
  );
}
