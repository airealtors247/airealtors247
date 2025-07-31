
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bot, Brain, Rocket, Target, Users, Phone, Mail, MessageSquare, 
  Calendar, CheckCircle, Clock, DollarSign, TrendingUp, Zap, 
  Crown, Shield, Globe, Camera, Star, Lightbulb, Award,
  PlayCircle, Settings, ArrowRight, ChevronDown, Twitter,
  Mic, Eye, Edit, Share2, BarChart3, Timer, Trophy, Gift,
  Building2, MapPin, FileText, Video, Headphones, Volume2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { createMainAppUrl } from '../components/utils/AppLinks'; // NEW IMPORT

export default function RealtorGuide() {
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedDemo, setSelectedDemo] = useState('voice_command');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Enhanced Viral Benefit Tiles (with mini-testimonials)
  const viralBenefits = [
    { icon: Clock, title: "Unlock 3-5+ Client Hours/Week", description: "AI handles the grunt work, so you're free for what lights you up.", testimonial: "“This freed my weekends!” – Sarah K., Solo Agent" },
    { icon: CheckCircle, title: "Nail Every Follow-Up", description: "Timely, pro responses that build trust automatically.", testimonial: "“Leads stopped slipping away overnight.” – Mike T." },
    { icon: Building2, title: "Stay 100% Organized", description: "One hub for everything—leads, tasks, docs.", testimonial: "“Total game-changer for my sanity.” – Lisa R." },
    { icon: Share2, title: "Effortless Brand Building", description: "Consistent posts and emails that keep you top-of-mind.", testimonial: "“My social game leveled up without effort.” – John D." },
    { icon: Target, title: "Catch Every Opportunity", description: "Systematic nurturing means fewer misses.", testimonial: "“Surprised by how many extra deals closed.” – Emma S." },
    { icon: Rocket, title: "Pro-Level Efficiency", description: "Run like a big-team operation, solo.", testimonial: "“Feels like I hired a team.” – Alex P." }
  ];

  // MODEST effort levels with more intriguing benefits
  const effortLevels = [
    {
      title: "Light Usage (5-10 min/day)",
      description: "Basics like organization and reminders.",
      capabilities: [
        "AI helps organize your leads and contacts",
        "Reminder system for important follow-ups",
        "Basic email and SMS templates",
        "Simple appointment scheduling assistance"
      ],
      results: "Peace of mind and steady wins."
    },
    {
      title: "Regular Usage (15-20 min/day)",
      description: "+ Marketing automation and insights.",
      capabilities: [
        "Everything in Light + AI content suggestions",
        "Automated email sequences with your approval",
        "Social media post ideas and scheduling",
        "Lead scoring and prioritization"
      ],
      results: "Time back, smarter moves—agents say it's addictive."
    },
    {
      title: "Power Usage (20-30 min/day)",
      description: "+ Full workflows and analytics.",
      capabilities: [
        "Everything above + Advanced automation workflows",
        "AI-driven market analysis and insights",
        "Comprehensive campaign management",
        "Performance analytics and optimization"
      ],
      results: "Scale like never before—unlock your edge."
    }
  ];
  
  // REALISTIC scenarios - still conservative
  const realWorldScenarios = [
    {
      title: "The Busy Solo Agent",
      problem: "Sarah feels disorganized and worried about missing follow-ups with her growing client base.",
      solution: "AIRealtors247 helps Sarah organize her contacts and automate basic follow-up reminders.",
      result: "Sarah turned overwhelm into wins with auto-follow-ups.",
      effort: "10 minutes daily to review suggestions and approve actions"
    },
    {
      title: "The Growing Professional",
      problem: "Mike wants to grow his business but struggles with consistent marketing and lead nurturing.",
      solution: "AI assists Mike with content creation, scheduling, and systematic lead management.",
      result: "Mike scaled marketing effortlessly, landing more listings.",
      effort: "20 minutes daily for strategy and content approval"
    },
    {
      title: "The Ambitious Entrepreneur",
      problem: "Lisa wants to scale her business and compete with established players in her market.",
      solution: "AI provides comprehensive business intelligence and automates complex workflows.",
      result: "Lisa built a powerhouse operation with AI insights.",
      effort: "30 minutes daily for strategic oversight and optimization"
    }
  ];

  // MODEST demo scenarios with more "magic"
  const demoScenarios = {
    voice_command: {
      title: "Simple Voice Commands",
      description: "Tell your AI assistant what you need help with",
      example: "'Follow up on last week's leads.' → AI builds a smart plan, reminds you, and tracks progress. (Users love sharing: 'Voice commands changed everything!')"
    },
    lead_automation: {
      title: "Lead Mastery", 
      description: "AI helps you stay organized and never miss important follow-ups",
      example: "AI sorts, prioritizes, and nurtures—keeping your pipeline humming."
    },
    social_mastery: {
      title: "Content Boost",
      description: "AI suggests content ideas and helps maintain your social media presence",
      example: "Fresh ideas and auto-scheduling for social/email. 'Generated a month's posts in minutes—mind-blown!'"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Top Banner / Hero Section */}
        <div className="text-center space-y-6 py-12">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent leading-tight">
            Ditch the Chaos. Dominate Your Day.
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            AIRealtors247: Your smart sidekick that organizes leads, automates follow-ups, and keeps your marketing humming—so you can crush deals and reclaim your life.
          </p>
          <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
            <a href={createMainAppUrl('signup')} className="inline-block">
              <Button size="lg" className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
                Claim Your Edge: Start Your 14-Day Free Trial Now <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Button variant="ghost" className="text-slate-600">
              Tell a Colleague About This <Share2 className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <p className="text-sm text-slate-500 mt-2">No card needed. Join agents discovering their secret advantage.</p>
        </div>

        {/* Enhanced "What You Can Expect" Section */}
        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Real Results, No Hype—Just Smarter Real Estate.</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {viralBenefits.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="space-y-3 p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow">
                    <Icon className="w-8 h-8 text-blue-600" />
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-600 text-sm">{item.description}</p>
                    <p className="font-semibold text-purple-700 pt-3 border-t border-slate-200 italic"> {item.testimonial} </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Interactive Demo Section */}
        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-slate-900">See the Magic in Action—Your AI at Work.</CardTitle>
            <p className="text-center text-slate-600">Simple examples of how AI can assist your daily work</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {Object.entries(demoScenarios).map(([key, demo]) => (
                <Button
                  key={key}
                  variant={selectedDemo === key ? "default" : "outline"}
                  className="h-auto p-4 flex flex-col items-start"
                  onClick={() => setSelectedDemo(key)}
                >
                  <div className="font-semibold mb-2">{demo.title}</div>
                  <div className="text-sm text-left">{demo.description}</div>
                </Button>
              ))}
            </div>
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
              <CardContent className="p-6">
                <div className="text-lg font-semibold text-green-900 mb-3">
                  Example Scenario:
                </div>
                <div className="text-slate-700 text-lg leading-relaxed">
                  {demoScenarios[selectedDemo].example}
                </div>
              </CardContent>
            </Card>
            <p className="text-center text-sm text-slate-500 mt-4">
              Try it and tag us on <Twitter className="w-3 h-3 inline-block" /> with your first 'aha' moment!
            </p>
          </CardContent>
        </Card>

        {/* Enhanced Effort Levels Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Your Path to Peak Performance—Start Where You Are.</h2>
            <p className="text-xl text-slate-600">Start simple, grow as you get comfortable</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {effortLevels.map((level, index) => (
              <Card key={index} className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
                <CardHeader className={`text-white bg-gradient-to-r ${
                  index === 0 ? 'from-green-500 to-emerald-500' :
                  index === 1 ? 'from-blue-500 to-indigo-500' :
                  'from-purple-500 to-pink-500'
                }`}>
                  <CardTitle className="text-xl">{level.title}</CardTitle>
                  <p className="text-sm opacity-90">{level.description}</p>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">What AI Helps With:</h4>
                    <ul className="space-y-1">
                      {level.capabilities.map((capability, capIndex) => (
                        <li key={capIndex} className="text-sm text-slate-600 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-slate-900 mb-2">Benefits:</h4>
                    <p className="text-slate-700 text-sm font-bold">{level.results}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Enhanced Success Stories */}
        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="text-3xl text-center text-slate-900">Agents Like You, Winning Big—Their Stories.</CardTitle>
            <p className="text-center text-slate-600">Real scenarios from working professionals</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {realWorldScenarios.map((scenario, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all duration-200"
                  onClick={() => toggleSection(`scenario-${index}`)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{scenario.title}</h3>
                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedSection === `scenario-${index}` ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {expandedSection === `scenario-${index}` && (
                    <div className="space-y-4 pt-4 border-t">
                      <p className="italic text-slate-600">Challenge: "{scenario.problem}"</p>
                      <p className="text-slate-600"><span className="font-semibold text-blue-700">How AI Helps:</span> {scenario.solution}</p>
                      <p className="text-slate-600"><span className="font-semibold text-green-700">The Outcome:</span> {scenario.result}</p>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                        <p className="text-purple-800"><span className="font-semibold text-purple-900">⏱️ Time Investment:</span> {scenario.effort}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center mt-6">
              <Button variant="link">Share Your Story: Post your success on X and inspire others!</Button>
            </p>
          </CardContent>
        </Card>

        {/* ... (Capabilities section can remain similar) ... */}
        
        {/* Enhanced "Reasonable Expectations" Section */}
        <Card className="shadow-2xl border-0 bg-gradient-to-r from-green-900 to-emerald-900 text-white">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Your Roadmap to Real Transformation.</CardTitle>
            <p className="text-center text-green-100">Our commitment to your growth, step-by-step.</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center space-y-2">
                <div className="text-lg text-green-200">Week 1</div>
                <div className="text-3xl font-bold">Instant Organization</div>
                <div className="text-sm text-green-100">Many spot quick wins.</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg text-green-200">Month 1</div>
                <div className="text-3xl font-bold">Seamless Follow-ups</div>
                <div className="text-sm text-green-100">Building momentum.</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg text-green-200">Month 3</div>
                <div className="text-3xl font-bold">Clear Time Savings</div>
                <div className="text-sm text-green-100">Sharper focus emerges.</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-lg text-green-200">Month 6+</div>
                <div className="text-3xl font-bold">Compounded Growth</div>
                <div className="text-sm text-green-100">Prepare for exciting surprises.</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-blue-800 via-purple-800 to-indigo-800 rounded-2xl shadow-2xl p-12 text-center text-white space-y-6">
          <h2 className="text-4xl font-bold">Ready to Dominate Your Day?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Stop juggling, start closing. Your AI sidekick is ready to go to work for you.
            Experience the "Aha!" moment for yourself.
          </p>
          <a href={createMainAppUrl('signup')} className="inline-block">
            <Button size="lg" className="text-lg bg-white text-blue-700 font-bold shadow-lg hover:bg-slate-100 transition-colors">
              Claim Your Edge: Start Free Trial Now <Rocket className="w-5 h-5 ml-2" />
            </Button>
          </a>
          <p className="text-sm text-blue-200">It takes 2 minutes. No credit card required.</p>
        </div>

      </div>
    </div>
  );
}
