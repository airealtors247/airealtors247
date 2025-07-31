import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Crown, 
  Users, 
  Clock, 
  Zap, 
  Gift, 
  Star,
  TrendingUp,
  DollarSign,
  Lock,
  CheckCircle,
  Flame,
  Timer
} from 'lucide-react';
import { User } from '@/api/entities';

export default function FounderCampaign() {
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 23,
    minutes: 47,
    seconds: 12
  });
  const [selectedTier, setSelectedTier] = useState('trailblazer');

  // Simulated data - in production, this would come from your database
  const [campaignStats, setCampaignStats] = useState({
    pioneerSold: 73,
    trailblazerSold: 127,
    innovatorSold: 89,
    totalRaised: 127340
  });

  useEffect(() => {
    loadUser();
    
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const founderTiers = [
    {
      id: 'pioneer',
      name: 'Pioneer Founder',
      originalPrice: '$588',
      founderPrice: '$197',
      savings: '$391',
      spotsTotal: 100,
      spotsTaken: campaignStats.pioneerSold,
      credits: 15000,
      validity: 'Lifetime',
      features: [
        'Lifetime access to Professional plan',
        '15,000 credits to start',
        'Founder badge & recognition',
        'Private founder community access',
        'Early access to new features',
        'Direct founder support channel',
        '50% referral commission (lifetime)'
      ],
      highlight: false,
      urgency: campaignStats.pioneerSold >= 85,
      almostSoldOut: campaignStats.pioneerSold >= 90
    },
    {
      id: 'trailblazer',
      name: 'Trailblazer Founder',
      originalPrice: '$1,176',
      founderPrice: '$397',
      savings: '$779',
      spotsTotal: 200,
      spotsTaken: campaignStats.trailblazerSold,
      credits: 35000,
      validity: 'Lifetime',
      features: [
        'Lifetime access to Premium plan',
        '35,000 credits to start',
        'Gold founder badge',
        'VIP founder community',
        'Beta feature testing access',
        'Monthly founder Q&A calls',
        '60% referral commission (lifetime)',
        'White-label licensing option'
      ],
      highlight: true,
      urgency: campaignStats.trailblazerSold >= 170,
      almostSoldOut: campaignStats.trailblazerSold >= 185
    },
    {
      id: 'innovator',
      name: 'Innovator Founder',
      originalPrice: '$2,388',
      founderPrice: '$797',
      savings: '$1,591',
      spotsTotal: 100,
      spotsTaken: campaignStats.innovatorSold,
      credits: 75000,
      validity: 'Lifetime',
      features: [
        'Lifetime Enterprise access',
        '75,000 credits to start',
        'Platinum founder status',
        'Executive founder advisory board',
        'Co-create features with our team',
        'Revenue sharing opportunity',
        '75% referral commission (lifetime)',
        'White-label + custom branding',
        'API access & integrations'
      ],
      highlight: false,
      urgency: campaignStats.innovatorSold >= 80,
      almostSoldOut: campaignStats.innovatorSold >= 90
    }
  ];

  const selectedTierData = founderTiers.find(t => t.id === selectedTier);

  const handleJoinFounder = (tierId) => {
    // In production, this would integrate with Stripe/payment processor
    alert(`Redirecting to secure payment for ${founderTiers.find(t => t.id === tierId).name}...`);
  };

  const calculateProgress = (taken, total) => (taken / total) * 100;
  const totalSpotsTaken = campaignStats.pioneerSold + campaignStats.trailblazerSold + campaignStats.innovatorSold;
  const totalSpots = 400;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white">
      {/* Urgency Header */}
      <div className="bg-red-600 text-center py-3">
        <div className="flex items-center justify-center gap-4 text-sm font-bold">
          <Flame className="w-4 h-4" />
          <span>🔥 FOUNDING MEMBER SALE ENDS IN:</span>
          <div className="flex gap-2">
            <span className="bg-white text-red-600 px-2 py-1 rounded">
              {timeLeft.days}d
            </span>
            <span className="bg-white text-red-600 px-2 py-1 rounded">
              {timeLeft.hours}h
            </span>
            <span className="bg-white text-red-600 px-2 py-1 rounded">
              {timeLeft.minutes}m
            </span>
            <span className="bg-white text-red-600 px-2 py-1 rounded">
              {timeLeft.seconds}s
            </span>
          </div>
          <Flame className="w-4 h-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <Badge className="bg-yellow-500 text-yellow-900 text-lg px-4 py-2">
            EXCLUSIVE FOUNDING MEMBER OPPORTUNITY
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Join the AI Revolution
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
            Be among the first 400 realtors to lock in <span className="text-yellow-400 font-bold">lifetime access</span> to 
            AIRealtors247 at <span className="text-yellow-400 font-bold">up to 67% OFF</span> regular pricing.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400">{totalSpotsTaken}</div>
                <div className="text-sm text-blue-200">Founders Joined</div>
              </div>
              <div className="text-4xl text-white/50">|</div>
              <div>
                <div className="text-3xl font-bold text-green-400">${campaignStats.totalRaised.toLocaleString()}</div>
                <div className="text-sm text-blue-200">Raised So Far</div>
              </div>
              <div className="text-4xl text-white/50">|</div>
              <div>
                <div className="text-3xl font-bold text-red-400">{400 - totalSpotsTaken}</div>
                <div className="text-sm text-blue-200">Spots Left</div>
              </div>
            </div>
            <Progress value={(totalSpotsTaken / totalSpots) * 100} className="mt-4 h-3" />
          </div>
        </div>

        {/* Why Now Section */}
        <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">
              Why This Opportunity Won't Come Again
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Founding Member Status</h3>
                <p className="text-blue-100">Forever recognized as a platform founder with exclusive badges and perks.</p>
              </div>
              <div className="text-center">
                <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Massive Savings</h3>
                <p className="text-blue-100">Save up to $1,591 compared to regular pricing. This discount disappears forever after launch.</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Higher Referral Rates</h3>
                <p className="text-blue-100">Founders get 50-75% referral commissions vs. 25% for regular members.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Founder Tiers */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center text-white">Choose Your Founder Level</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {founderTiers.map((tier) => (
              <Card 
                key={tier.id}
                className={`relative ${
                  tier.highlight 
                    ? 'border-2 border-yellow-500 shadow-2xl scale-105 bg-gradient-to-b from-yellow-500/20 to-orange-500/20' 
                    : 'border border-blue-500/50 bg-white/5 backdrop-blur-sm'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-yellow-500 text-yellow-900 px-4 py-2">
                      🔥 MOST POPULAR
                    </Badge>
                  </div>
                )}

                {tier.almostSoldOut && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-red-500 text-white animate-pulse">
                      ALMOST SOLD OUT
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl font-bold text-white">{tier.name}</CardTitle>
                  
                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl line-through text-red-400">{tier.originalPrice}</span>
                      <span className="text-4xl font-bold text-yellow-400">{tier.founderPrice}</span>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      Save {tier.savings}
                    </Badge>
                  </div>

                  {/* Spots Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{tier.spotsTaken} taken</span>
                      <span>{tier.spotsTotal - tier.spotsTaken} left</span>
                    </div>
                    <Progress 
                      value={calculateProgress(tier.spotsTaken, tier.spotsTotal)} 
                      className={`h-2 ${tier.urgency ? 'bg-red-200' : 'bg-blue-200'}`}
                    />
                    {tier.urgency && (
                      <p className="text-red-400 text-xs font-bold animate-pulse">
                        ⚠️ FILLING FAST
                      </p>
                    )}
                  </div>

                  {/* Credits */}
                  <div className="bg-blue-900/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-300">
                      {tier.credits.toLocaleString()} Credits
                    </div>
                    <div className="text-sm text-blue-200">
                      {tier.validity} • Worth ${Math.round(tier.credits * 0.05).toLocaleString()}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2 text-sm text-blue-100">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleJoinFounder(tier.id)}
                    className={`w-full text-lg py-6 ${
                      tier.highlight
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold'
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                    disabled={tier.spotsTaken >= tier.spotsTotal}
                  >
                    {tier.spotsTaken >= tier.spotsTotal ? (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        SOLD OUT
                      </>
                    ) : (
                      <>
                        <Crown className="w-5 h-5 mr-2" />
                        Secure My Founder Spot
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-6">What Early Founders Are Saying</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-blue-100 mb-3">
                  "Just generated $50K in new leads using the AI tools. This platform pays for itself!"
                </p>
                <div className="text-yellow-400 font-bold">Sarah K., Trailblazer Founder</div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-blue-100 mb-3">
                  "My social media engagement increased 400%. The AI knows real estate better than I do!"
                </p>
                <div className="text-yellow-400 font-bold">Mike R., Pioneer Founder</div>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-blue-100 mb-3">
                  "Already earned back my investment through referrals alone. The founder commission rates are incredible!"
                </p>
                <div className="text-yellow-400 font-bold">Jennifer L., Innovator Founder</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Urgency Footer */}
        <Card className="bg-red-600 border-red-500">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              ⚠️ This Offer Disappears in {timeLeft.days} Days, {timeLeft.hours} Hours
            </h3>
            <p className="text-red-100 mb-6">
              After the founding member campaign ends, these prices are GONE FOREVER. 
              Regular pricing will be 3x higher, and founder perks are exclusive to this group only.
            </p>
            <Button 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-xl px-8 py-4"
            >
              Claim My Founder Spot Now
            </Button>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Founder FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-yellow-400 mb-2">Is this really lifetime access?</h4>
                <p className="text-blue-100 text-sm">
                  Yes! One payment, lifetime access. No monthly fees, no surprises. 
                  As long as AIRealtors247 exists, you have access.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-yellow-400 mb-2">What if you add new features?</h4>
                <p className="text-blue-100 text-sm">
                  Founders get ALL new features for free, forever. Regular users will pay extra for premium features.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-yellow-400 mb-2">Can I upgrade my founder tier?</h4>
                <p className="text-blue-100 text-sm">
                  Yes, but only during this campaign. Pay the difference to upgrade to a higher tier.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-yellow-400 mb-2">What's the referral commission structure?</h4>
                <p className="text-blue-100 text-sm">
                  Founders earn 50-75% on all referrals (vs 25% for regular users) for LIFE. 
                  This alone can make your investment back quickly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}