
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Mic, 
  Brain, 
  Rocket, 
  TrendingUp, 
  CheckCircle,
  Zap,
  ClipboardCheck,
  ArrowRight,
  Clock,
  Target
} from "lucide-react";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HowItWorks() {

  const steps = [
    {
      step: 1,
      title: "Tell Your AI What You Need Help With",
      description: "Simply describe what you'd like to accomplish in your real estate business. Your AI assistant understands natural language and helps you get organized.",
      examples: [
        "Help me follow up with my leads from last week",
        "I need to stay more organized with my contacts",
        "Create a simple email campaign for my new listing",
        "Remind me to check in with my past clients"
      ],
      icon: Mic,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: 2,
      title: "Review the Simple Plan Your AI Creates",
      description: "Your AI suggests a straightforward approach to help you achieve your goal. You'll see exactly what it plans to do, and you can approve, modify, or ask questions before anything happens.",
      features: [
        "Clear, simple steps you can understand",
        "Full transparency - you're always in control",
        "Reasonable timelines and expectations",
        "Compliance and best practices built-in"
      ],
      icon: ClipboardCheck,
      color: "from-purple-500 to-indigo-500"
    },
    {
      step: 3,
      title: "Your AI Handles the Routine Work",
      description: "Once you approve the plan, your AI takes care of the repetitive tasks - sending follow-ups, organizing contacts, scheduling posts, and keeping you on track. You focus on the important relationship-building work.",
      features: [
        "Handles routine follow-ups automatically",
        "Keeps your contacts organized",
        "Sends you daily progress updates",
        "Saves you time for high-value activities"
      ],
      icon: Zap,
      color: "from-green-500 to-emerald-500"
    },
    {
      step: 4,
      title: "Get Better Results With Less Stress",
      description: "Your AI learns what works for your business and helps you improve over time. You'll have better organization, more consistent follow-up, and the confidence that nothing important falls through the cracks.",
      features: [
        "Better organization and follow-up consistency",
        "Daily insights on what's working well",
        "Helpful suggestions for improvement",
        "Reduced stress and increased confidence"
      ],
      icon: Brain,
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2">
            🤖 AI Assistant for Real Estate
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Get Better Organized & Stay on Track
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            AIRealtors247 is designed to help real estate professionals stay organized, 
            follow up consistently, and manage their business more efficiently. Here's how it works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("RealtorGuide")}>
              <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <Target className="w-5 h-5 mr-2" />
                Complete Guide
              </Button>
            </Link>
            <Link to={createPageUrl("Pricing")}>
              <Button size="lg" variant="outline">
                <Rocket className="w-5 h-5 mr-2" />
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.step} className="shadow-2xl border-0 overflow-hidden bg-white">
                <div className="grid md:grid-cols-12 items-center">
                  <div className={`md:col-span-4 bg-gradient-to-br ${step.color} text-white p-8 flex flex-col justify-center items-center h-full`}>
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-10 h-10" />
                    </div>
                    <p className="text-6xl font-bold mb-2">{step.step}</p>
                  </div>
                  
                  <div className="md:col-span-8 p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">{step.description}</p>
                    
                    {step.examples && (
                      <div className="space-y-2">
                        <h4 className="font-semibold text-slate-800 mb-3">Example Requests:</h4>
                        {step.examples.map((example, i) => (
                          <div key={i} className="bg-slate-50 p-3 rounded-lg border-l-4 border-blue-400">
                            <p className="text-slate-700 italic">{example}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {step.features && (
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">What This Includes:</h4>
                        <ul className="space-y-2">
                          {step.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Conservative Comparison */}
        <Card className="bg-gradient-to-r from-slate-900 to-blue-900 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl text-center">The Difference AIRealtors247 Makes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-orange-200 mb-4">😰 Common Challenges</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>Feeling disorganized and overwhelmed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>Forgetting to follow up with leads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>Inconsistent marketing and outreach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span>Spending too much time on admin tasks</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-green-200 mb-4">✅ With AI Assistant</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Better organized, less stressed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Systematic follow-up reminders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>More consistent business processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>More time for clients and deals</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modest Final CTA */}
        <div className="text-center space-y-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-3xl">
          <h2 className="text-3xl font-bold">Ready to Get Better Organized?</h2>
          <p className="text-xl text-blue-100">
            Try AIRealtors247 free for 14 days and see how it helps your business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Pricing")}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Rocket className="w-5 h-5 mr-2" />
                Start Free Trial
              </Button>
            </Link>
            <Link to={createPageUrl("RealtorGuide")}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Target className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
