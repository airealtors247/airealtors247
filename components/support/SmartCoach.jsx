import React, { useState, useEffect, useRef } from 'react';
import { TrainingGuide } from '@/api/entities';
import { SupportTicket } from '@/api/entities';
import { InvokeLLM } from '@/api/integrations';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  User, 
  Send, 
  Loader2, 
  LifeBuoy, 
  X, 
  BookOpen, 
  Sparkles, 
  Target,
  TrendingUp,
  Star,
  Lightbulb,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function SmartCoach({ user, onClose, currentPageName }) {
    const [messages, setMessages] = useState([
        { 
          from: 'ai', 
          text: `👋 Hi ${user.full_name?.split(' ')[0] || 'there'}! I'm your **AI Smart Coach**. I'm here to help you master every part of AIRealtors247 - no tech skills required! 

Click **"Guide Me"** for a step-by-step walkthrough of the ${currentPageName} page, or just ask me anything like "How do I..." 

🎯 **My Goal:** Make you a real estate superstar using this platform!` 
        }
    ]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [trainingGuides, setTrainingGuides] = useState([]);
    const scrollAreaRef = useRef(null);

    useEffect(() => {
        loadTrainingGuides();
    }, []);

    useEffect(() => {
        // Auto-scroll to bottom on new message
        if (scrollAreaRef.current) {
            const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollElement) {
                scrollElement.scrollTop = scrollElement.scrollHeight;
            }
        }
    }, [messages]);

    const loadTrainingGuides = async () => {
        try {
            const guides = await TrainingGuide.list();
            setTrainingGuides(guides);
        } catch (error) {
            console.error("Error loading training guides:", error);
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { from: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsProcessing(true);

        try {
            const prompt = `You are "AI Agent 247 Smart Coach", the built-in AI training guide for AIRealtors247 platform.

            Your mission: Help real estate agents master the platform with ZERO learning curve, even if they're not tech-savvy.

            User's question: "${input}"
            Current page: "${currentPageName}"

            PERSONALITY: Friendly, motivational, like a successful real estate coach who believes in their potential.

            COMMUNICATION STYLE:
            - Use simple language (8th grade level)
            - No technical jargon
            - Use analogies like "Think of this like your AI secretary"
            - Be encouraging and positive
            - Focus on RESULTS and BENEFITS, not features
            - Keep responses concise but complete

            RESPONSE STRATEGY:
            1. If they ask "how to" do something specific - give step-by-step instructions
            2. If they ask about a feature - explain the BENEFIT first, then how to use it
            3. If they seem confused about the platform - ask what they want to achieve
            4. If it's a bug/billing issue, respond with JSON: {"escalate": true, "summary": "brief issue summary"}
            5. Always end with encouragement or next step suggestion

            IMPORTANT: Focus on helping them make more money, save time, and impress clients.`;
            
            const response = await InvokeLLM({ prompt });

            let aiResponseText;
            if (typeof response === 'object' && response.escalate) {
                await SupportTicket.create({
                    user_email: user.email,
                    query_text: input,
                    ai_response_summary: response.summary
                });
                aiResponseText = `I've created a support ticket for you! Our team will reach out shortly. 

**Ticket Summary:** "${response.summary}"

While you wait, is there anything else about ${currentPageName} I can help you with? 🚀`;
            } else {
                aiResponseText = response;
            }
            
            setMessages(prev => [...prev, { from: 'ai', text: aiResponseText }]);
        } catch (error) {
            console.error("Error in smart coach:", error);
            setMessages(prev => [...prev, { 
                from: 'ai', 
                text: "Oops! I had a small hiccup. Please try asking again - I'm here to help! 😊" 
            }]);
        }

        setIsProcessing(false);
    };

    const handleGuideRequest = async () => {
        setIsProcessing(true);
        setMessages(prev => [...prev, { from: 'user', text: `Guide me through the ${currentPageName} page` }]);

        try {
            // Check if we have a pre-built guide for this section
            const existingGuide = trainingGuides.find(guide => 
                guide.section_name.toLowerCase() === currentPageName.toLowerCase()
            );

            let guideContent;
            
            if (existingGuide) {
                // Use the pre-built structured guide
                guideContent = formatStructuredGuide(existingGuide);
            } else {
                // Generate AI guide for this section
                const prompt = `You are "AI Agent 247 Smart Coach" creating a training guide for the "${currentPageName}" page.

                Create a comprehensive but easy-to-follow guide using this structure:

                **🎯 Why ${currentPageName} is Your Secret Weapon:**
                (Write 1-2 motivational sentences about how this page helps realtors dominate their market)

                **📋 Your Step-by-Step Playbook:**
                1. **[Action]** - Simple explanation with benefit
                2. **[Action]** - Simple explanation with benefit  
                3. **[Action]** - Simple explanation with benefit
                (3-5 steps maximum)

                **💡 Pro Tips from Top Performers:**
                - Quick win tip #1
                - Quick win tip #2

                **🏆 Success Signals:**
                You'll know you're crushing it when: [specific metrics/outcomes]

                **➡️ What's Next:**
                After mastering this, I recommend: [next logical step]

                TONE: Enthusiastic coach, simple language, focus on RESULTS not features.
                ANALOGIES: Use simple comparisons like "Think of this like..."`;

                guideContent = await InvokeLLM({ prompt });
            }
            
            setMessages(prev => [...prev, { from: 'ai', text: guideContent }]);
        } catch (error) {
            console.error("Error generating guide:", error);
            setMessages(prev => [...prev, { 
                from: 'ai', 
                text: `I'm having a small technical hiccup generating the ${currentPageName} guide. 

But don't worry! Just ask me specific questions like:
• "How do I start my first campaign?"
• "What does this button do?"
• "How do I get more leads?"

I'm here to help you succeed! 🚀` 
            }]);
        }

        setIsProcessing(false);
    };

    const formatStructuredGuide = (guide) => {
        let formatted = `**🎯 ${guide.guide_title}**\n\n`;
        formatted += `${guide.why_this_matters}\n\n`;
        formatted += `**📋 Your Step-by-Step Playbook:**\n`;
        
        guide.step_by_step_guide.forEach(step => {
            formatted += `${step.step_number}. **${step.action}** - ${step.explanation}\n`;
            if (step.analogy) {
                formatted += `   💭 *Think of it like: ${step.analogy}*\n`;
            }
        });

        if (guide.pro_tips && guide.pro_tips.length > 0) {
            formatted += `\n**💡 Pro Tips from Top Performers:**\n`;
            guide.pro_tips.forEach(tip => {
                formatted += `• ${tip}\n`;
            });
        }

        if (guide.success_metrics) {
            formatted += `\n**🏆 Success Signals:**\n${guide.success_metrics}\n`;
        }

        if (guide.next_recommended_action) {
            formatted += `\n**➡️ What's Next:**\n${guide.next_recommended_action}`;
        }

        return formatted;
    };

    const handleQuickAction = (action) => {
        setInput(action);
    };

    const quickActions = [
        "How do I get my first lead?",
        "Show me the easiest way to start",
        "What should I do first?",
        "How do top performers use this?",
        `Explain ${currentPageName} in simple terms`
    ];

    return (
        <Card className="fixed bottom-20 right-5 w-96 h-[650px] shadow-2xl rounded-2xl flex flex-col z-50 border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 border-b rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="font-bold">AI Smart Coach</div>
                        <div className="text-xs opacity-90">Zero Learning Curve</div>
                    </div>
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                    <X className="w-5 h-5"/>
                </Button>
            </CardHeader>
            
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                            {msg.from === 'ai' && (
                                <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                    <AvatarFallback><Sparkles className="w-4 h-4" /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`max-w-sm rounded-2xl p-3 text-sm ${
                                msg.from === 'user' 
                                    ? 'bg-blue-600 text-white rounded-br-none' 
                                    : 'bg-white text-slate-900 rounded-bl-none shadow-sm border'
                            }`}>
                                <div dangerouslySetInnerHTML={{ 
                                    __html: msg.text
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/\n/g, '<br />') 
                                }} />
                            </div>
                            {msg.from === 'user' && (
                                <Avatar className="w-8 h-8 bg-slate-300">
                                    <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                    {isProcessing && (
                         <div className="flex items-end gap-2">
                            <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                <AvatarFallback><Sparkles className="w-4 h-4" /></AvatarFallback>
                            </Avatar>
                            <div className="max-w-sm rounded-2xl p-3 text-sm bg-white text-slate-900 rounded-bl-none shadow-sm border">
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                                    <span>Crafting your perfect guide...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            
            <CardFooter className="p-4 border-t bg-slate-50 flex-col items-start gap-3 rounded-b-2xl">
                {/* Guide Me Button */}
                <Button 
                    onClick={handleGuideRequest} 
                    disabled={isProcessing} 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium"
                >
                    <Target className="w-4 h-4 mr-2" />
                    Guide Me Through '{currentPageName}'
                </Button>

                {/* Quick Actions */}
                <div className="w-full">
                    <div className="text-xs text-slate-500 mb-2">Quick Questions:</div>
                    <div className="flex flex-wrap gap-1">
                        {quickActions.slice(0, 3).map((action, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-6 px-2"
                                onClick={() => handleQuickAction(action)}
                                disabled={isProcessing}
                            >
                                {action}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Chat Input */}
                <div className="flex w-full items-center gap-2">
                    <Input
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isProcessing}
                        className="bg-white border-slate-200"
                    />
                    <Button 
                        onClick={handleSend} 
                        disabled={isProcessing || !input.trim()}
                        className="bg-blue-600 hover:bg-blue-700"
                        size="icon"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}