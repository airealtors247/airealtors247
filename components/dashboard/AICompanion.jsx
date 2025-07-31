import React, { useState, useEffect } from 'react';
import { TrendAnalysis } from "@/api/entities";
import { MotivationalContent } from "@/api/entities";
import { UserActivity } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Sparkles,
    TrendingUp,
    Heart,
    Lightbulb,
    Target,
    Star,
    Zap,
    Award,
    Coffee,
    BookOpen,
    MessageCircle
} from "lucide-react";

export default function AICompanion({ user, recentActivities }) {
    const [dailyMotivation, setDailyMotivation] = useState(null);
    const [latestTrends, setLatestTrends] = useState([]);
    const [personalizedMessage, setPersonalizedMessage] = useState("");
    const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);

    useEffect(() => {
        loadCompanionData();
        generatePersonalizedMessage();
    }, [user, recentActivities]);

    const loadCompanionData = async () => {
        try {
            const [motivationData, trendsData] = await Promise.all([
                MotivationalContent.filter({ target_audience: "all" }, "-created_date", 1),
                TrendAnalysis.list("-discovery_date", 3)
            ]);
            
            setDailyMotivation(motivationData[0]);
            setLatestTrends(trendsData);
        } catch (error) {
            console.error("Error loading companion data:", error);
        }
    };

    const generatePersonalizedMessage = async () => {
        if (!user || !recentActivities) return;
        
        setIsGeneratingMessage(true);
        try {
            const recentAchievements = recentActivities.filter(a => 
                ['new_lead', 'listing_created', 'goal_achieved', 'review_received'].includes(a.activity_type)
            );

            const context = `
            User Profile:
            - Name: ${user.full_name}
            - Specialization: ${user.niche_specialization?.property_types?.join(', ') || 'General Real Estate'}
            - Primary Market: ${user.primary_city}, ${user.primary_zip_code}
            - Recent Achievements: ${recentAchievements.length} this week
            
            Recent Activities: ${recentActivities.slice(0,3).map(a => a.activity_type).join(', ')}
            
            Generate a personalized, encouraging message as their AI business companion. Be specific about their market and specialization. Keep it under 100 words and sound like a supportive business partner who knows their goals.
            `;

            const response = await InvokeLLM({
                prompt: context,
                response_json_schema: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                        tone: { type: "string" }
                    }
                }
            });

            setPersonalizedMessage(response.message);
        } catch (error) {
            console.error("Error generating personalized message:", error);
            setPersonalizedMessage("Great to see you back! Let's make today another step toward your real estate goals. I'm here to help you succeed! 🚀");
        }
        setIsGeneratingMessage(false);
    };

    const getTrendIcon = (category) => {
        const icons = {
            lead_generation: Target,
            social_media: MessageCircle,
            listing_strategy: Star,
            marketing: TrendingUp,
            technology: Zap,
            client_service: Heart,
            negotiation: Award
        };
        return icons[category] || Lightbulb;
    };

    return (
        <div className="space-y-6">
            {/* AI Companion Welcome */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        Your AI Success Companion
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isGeneratingMessage ? (
                        <div className="flex items-center gap-2 text-slate-600">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                            Personalizing your daily message...
                        </div>
                    ) : (
                        <p className="text-slate-700 leading-relaxed">
                            {personalizedMessage}
                        </p>
                    )}
                </CardContent>
            </Card>

            <Tabs defaultValue="motivation" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="motivation" className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Daily Boost
                    </TabsTrigger>
                    <TabsTrigger value="trends" className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Latest Trends
                    </TabsTrigger>
                    <TabsTrigger value="wellness" className="flex items-center gap-2">
                        <Coffee className="w-4 h-4" />
                        Wellness
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="motivation" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-amber-500" />
                                Today's Motivation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {dailyMotivation ? (
                                <div className="space-y-4">
                                    <blockquote className="text-lg font-medium text-slate-800 italic border-l-4 border-blue-500 pl-4">
                                        "{dailyMotivation.content_text}"
                                    </blockquote>
                                    {dailyMotivation.author && (
                                        <p className="text-sm text-slate-600">
                                            — {dailyMotivation.author}
                                        </p>
                                    )}
                                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                                        {dailyMotivation.category.replace('_', ' ').toUpperCase()}
                                    </Badge>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Heart className="w-12 h-12 text-pink-300 mx-auto mb-4" />
                                    <p className="text-slate-600">Loading your daily inspiration...</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="trends" className="mt-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                            🔥 Trending in Real Estate
                        </h3>
                        {latestTrends.map((trend) => {
                            const IconComponent = getTrendIcon(trend.trend_category);
                            return (
                                <Card key={trend.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                    <IconComponent className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg">{trend.trend_title}</CardTitle>
                                                    <p className="text-sm text-slate-500">
                                                        From {trend.source_creator} on {trend.source_platform}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge className="bg-green-100 text-green-800">
                                                {trend.effectiveness_score}/10
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-700 mb-4">{trend.trend_description}</p>
                                        {trend.implementation_steps && trend.implementation_steps.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold text-slate-900 mb-2">How to implement:</h4>
                                                <ul className="space-y-1">
                                                    {trend.implementation_steps.slice(0, 3).map((step, index) => (
                                                        <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                                                            <span className="w-4 h-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                                                                {index + 1}
                                                            </span>
                                                            {step}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            );
                        })}
                        
                        {latestTrends.length === 0 && (
                            <div className="text-center py-8">
                                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <p className="text-slate-600">AI is discovering the latest trends for you...</p>
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="wellness" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Coffee className="w-5 h-5 text-amber-500" />
                                    Take a Break
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-700 mb-4">
                                    Success isn't just about the hustle. Your mind and body need care too.
                                </p>
                                <div className="space-y-2">
                                    <Button variant="outline" size="sm" className="w-full justify-start">
                                        🚶‍♂️ 10-minute walk reminder
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full justify-start">
                                        🧘‍♀️ Quick meditation break
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-full justify-start">
                                        💧 Hydration reminder
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="w-5 h-5 text-blue-500" />
                                    Quick Wins
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-700 mb-4">
                                    Small actions that can boost your day:
                                </p>
                                <div className="space-y-2 text-sm text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        Call one past client to check in
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        Share a helpful tip on social media
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                        Update one listing description
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                                        Send a thank you message
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}