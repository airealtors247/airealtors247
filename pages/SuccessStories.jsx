
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, TrendingUp, Target, Calendar, PhoneCall, Rocket } from "lucide-react";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";

export default function SuccessStories() {
  const stories = [
    {
      quote: "I just wanted help booking a few appointments. I ended up with 23 in my first month. I'm still in shock.",
      name: "Monica V.",
      location: "REALTOR® – Tampa, FL",
      metric: "23 appointments booked",
      duration: "First Month",
      color: "from-purple-600 to-indigo-600"
    },
    {
      quote: "My goal was just to post consistently on Instagram. The AI did that, and also brought me 2 listings from the content it created.",
      name: "Jason T.",
      location: "Broker – Denver, CO",
      metric: "2 listings from social",
      duration: "First 6 Weeks",
      color: "from-pink-500 to-rose-500"
    },
    {
      quote: "It's supposed to help organize leads, but it literally runs my business now. It answers calls, follows up with FSBOs, and nurtures leads 24/7.",
      name: "Alicia R.",
      location: "Agent – Charlotte, NC",
      metric: "24/7 lead management",
      duration: "Ongoing",
      color: "from-blue-500 to-cyan-500"
    },
    {
      quote: "My team wanted to improve lead routing. The AI doubled our lead volume in 90 days by qualifying and assigning them for us.",
      name: "Marcus L.",
      location: "Team Leader – Phoenix, AZ",
      metric: "200% lead increase",
      duration: "90 Days",
      color: "from-green-500 to-emerald-500"
    },
    {
      quote: "As a new agent, I just wanted to look professional. The AI made my social media look like I've been a top producer for years.",
      name: "Sarah K.",
      location: "New Agent – Miami, FL",
      metric: "Instant credibility",
      duration: "First Week",
      color: "from-amber-500 to-orange-500"
    },
    {
      quote: "I have high-end leads that need a delicate touch. I was skeptical, but the AI handles them perfectly. It knows exactly when to step in.",
      name: "David R.",
      location: "Luxury Agent – Los Angeles, CA",
      metric: "Premium lead handling",
      duration: "Daily",
      color: "from-slate-700 to-gray-800"
    }
  ];

  const averageResults = [
    { value: "15+", label: "New appointments monthly", icon: Calendar },
    { value: "95%", label: "Call answer rate", icon: PhoneCall },
    { value: "300%", label: "Social media growth", icon: TrendingUp },
    { value: "7 days", label: "To see first results", icon: Rocket }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 pt-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            What Happens When You Expect a Little and Get a Lot
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            These agents started with simple goals. Here’s what their AI assistant delivered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <Card key={index} className={`bg-gradient-to-br ${story.color} border-0 shadow-2xl rounded-2xl transform hover:scale-105 transition-transform duration-300`}>
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex-grow">
                  <p className="text-2xl font-semibold italic mb-6">"{story.quote}"</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-white/20 text-white font-bold">{story.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{story.name}</p>
                      <p className="text-sm text-white/80">{story.location}</p>
                    </div>
                  </div>
                </div>
                 <div className="mt-6 bg-white/10 p-3 rounded-lg text-center">
                    <p className="text-sm text-white/80">({story.duration})</p>
                    <p className="font-bold text-lg flex items-center justify-center gap-2"><Target className="w-5 h-5"/> {story.metric}</p>
                 </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-center mb-8">Average Agent Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {averageResults.map(result => {
              const Icon = result.icon;
              return (
                <div key={result.label}>
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-4xl font-bold text-white">{result.value}</p>
                  <p className="text-slate-300">{result.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center pt-8">
            <Link to={createPageUrl("Pricing")}>
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xl px-12 py-8">
                    Join the Top Agents Scaling with AI
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
