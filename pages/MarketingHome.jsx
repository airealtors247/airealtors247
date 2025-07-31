import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bot, Brain, Rocket, Target, Users, Phone, Mail, MessageSquare, 
  Calendar, CheckCircle, Clock, DollarSign, TrendingUp, Zap, 
  Crown, Shield, Globe, Camera, Star, Lightbulb, Award,
  PlayCircle, Settings, ArrowRight, Share2, Timer, Trophy
} from 'lucide-react';
import { createMainAppUrl } from '../components/utils/AppLinks';

export default function MarketingHome() {
  const viralBenefits = [
    { 
      icon: Clock, 
      title: "Unlock 3-5+ Client Hours/Week", 
      description: "AI handles the grunt work, so you're free for what lights you up.", 
      testimonial: "This freed my weekends! – Sarah K., Solo Agent" 
    },
    { 
      icon: CheckCircle, 
      title: "Nail Every Follow-Up", 
      description: "Timely, pro responses that build trust automatically.", 
      testimonial: "Leads stopped slipping away overnight. – Mike T." 
    },
    { 
      icon: Target, 
      title: "Stay 100% Organized", 
      description: "One hub for everything—leads, tasks, docs.", 
      testimonial: "Total game-changer for my sanity. – Lisa R." 
    },
    { 
      icon: Share2, 
      title: "Effortless Brand Building", 
      description: "Consistent posts and emails that keep you top-of-mind.", 
      testimonial: "My social game leveled up without effort. – John D." 
    },
    { 
      icon: Trophy, 
      title: "Catch Every Opportunity", 
      description: "Systematic nurturing means fewer misses.", 
      testimonial: "Surprised by how many extra deals closed. – Emma S." 
    },
    { 
      icon: Rocket, 
      title: "Pro-Level Efficiency", 
      description: "Run like a big-team operation, solo.", 
      testimonial: "Feels like I hired a team. – Alex P." 
    }
  ];

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AIRealtors247 - Your Smart Real Estate Assistant',
        text: 'Check out this AI tool that helps realtors stay organized and save time',
        url: 'https://www.airealtors247.io'
      });
    } else {
      // Fallback for desktop
      navigator.clipboard.writeText('https://www.airealtors247.io');
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"> {/* Warm cream gradient background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 py-12">
          <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 text-lg font-semibold"> {/* Warm gold badge */}
            🤖 Your AI Real Estate Assistant
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-900 via-gray-800 to-slate-800 bg-clip-text text-transparent leading-tight"> {/* Deep charcoal gradient */}
            Ditch the Chaos. Dominate Your Day.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed"> {/* Darker text for better contrast */}
            AIRealtors247: Your smart sidekick that organizes leads, automates follow-ups, 
            and keeps your marketing humming—so you can crush deals and reclaim your life.
          </p>
          
          <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
            <a href={createMainAppUrl('signup')} className="inline-block">
              <Button size="lg" className="text-lg bg-gradient-to-r from-slate-800 to-gray-900 hover:from-slate-900 hover:to-black text-white shadow-lg hover:shadow-xl transition-all"> {/* Dark navy button */}
                Join 500+ Agents Unlocking Effortless Wins <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Button variant="ghost" className="text-slate-600 hover:text-slate-800 hover:bg-amber-100" onClick={handleShareClick}> {/* Warm hover state */}
              Tell a Colleague About This <Share2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <p className="text-sm text-slate-600 mt-2">
            14-day free trial. No card needed. Join agents discovering their secret advantage.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Real Results, No Hype—Just Smarter Real Estate
            </h2>
            <p className="text-xl text-slate-700">
              See what agents are saying about their experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {viralBenefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90"> {/* Glass-like cards */}
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl group-hover:from-amber-200 group-hover:to-orange-200 transition-colors"> {/* Warm accent background */}
                      <benefit.icon className="w-6 h-6 text-slate-800" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">
                      {benefit.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    {benefit.description}
                  </p>
                  <blockquote className="text-sm italic text-amber-700 bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400"> {/* Warm testimonial styling */}
                    "{benefit.testimonial}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Simple Examples Section */}
        <div className="space-y-8 bg-gradient-to-r from-slate-50 to-gray-50 rounded-3xl p-8 md:p-12"> {/* Subtle contrast section */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              See the Magic in Action—Your AI at Work
            </h2>
            <p className="text-xl text-slate-700">
              Simple voice commands that deliver powerful results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white border-0 shadow-lg"> {/* Clean white cards */}
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <Bot className="w-6 h-6 text-amber-600" />
                  Voice Commands
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-800 font-semibold">"Follow up on last week's leads."</p>
                  <p className="text-slate-600 text-sm mt-1">→ AI builds personalized follow-up emails, schedules them, and tracks responses automatically.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-800 font-semibold">"Post about my new listing on social."</p>
                  <p className="text-slate-600 text-sm mt-1">→ AI creates engaging posts with photos, captions, and hashtags across all your platforms.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-900">
                  <Rocket className="w-6 h-6 text-amber-600" />
                  Smart Automation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-800 font-semibold">New Lead Arrives</p>
                  <p className="text-slate-600 text-sm mt-1">→ AI instantly sends welcome email, schedules follow-up sequence, and adds to your CRM with smart tags.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-800 font-semibold">Client Milestone Reached</p>
                  <p className="text-slate-600 text-sm mt-1">→ AI celebrates with personalized message, requests review, and suggests referral opportunities.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="text-center space-y-8 bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-8 md:p-12"> {/* Warm accent section */}
          <h2 className="text-4xl font-bold text-slate-900">
            Join Agents Who've Found Their Edge
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">500+</div>
              <div className="text-slate-700">Active Agents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">15K+</div>
              <div className="text-slate-700">Tasks Automated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">3.5hrs</div>
              <div className="text-slate-700">Avg. Time Saved Daily</div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center space-y-6 py-12">
          <h2 className="text-4xl font-bold text-slate-900">
            Ready to Transform Your Real Estate Game?
          </h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            Start your 14-day free trial and discover what organized, automated success feels like.
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <a href={createMainAppUrl('signup')} className="inline-block">
              <Button size="lg" className="text-lg bg-gradient-to-r from-slate-800 to-gray-900 hover:from-slate-900 hover:to-black text-white shadow-lg hover:shadow-xl transition-all">
                Start Your Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Button variant="outline" className="text-lg border-slate-300 text-slate-700 hover:bg-amber-50 hover:border-amber-300" onClick={handleShareClick}>
              Share with Your Team <Share2 className="w-5 h-5 ml-2" />
            </Button>
          </div>
          
          <p className="text-sm text-slate-600 mt-4">
            No credit card required • 14-day trial • Cancel anytime
          </p>
        </div>
      </div>
    </div>
  );
}