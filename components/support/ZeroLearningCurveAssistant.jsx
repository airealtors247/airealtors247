
import React, { useState, useEffect, useRef } from 'react';
import { QuickStartGuide } from '@/api/entities';
import { PreMadeAnswer } from '@/api/entities';
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
  X, 
  Sparkles, 
  CheckCircle,
  ArrowRight,
  Mic,
  MicOff,
  Play,
  Lightbulb,
  Target,
  Clock,
  Star,
  Zap,
  Gift,
  MessageSquare
} from "lucide-react";

export default function ZeroLearningCurveAssistant({ user, onClose, currentPageName }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [preMadeAnswers, setPreMadeAnswers] = useState([]);
    const [isFirstTime, setIsFirstTime] = useState(false);
    const scrollAreaRef = useRef(null);

    useEffect(() => {
        initializeAssistant();
        loadPreMadeContent();
    }, []);

    useEffect(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }
    }, [messages]);

    const initializeAssistant = () => {
        const hasUsedBefore = localStorage.getItem(`assistant_used_${user.email}`);
        if (!hasUsedBefore) {
            setIsFirstTime(true);
            setMessages([
                { 
                    from: 'ai', 
                    type: 'welcome',
                    text: `🎉 **Welcome to your Personal Real Estate AI Executive Assistant, ${user.full_name?.split(' ')[0] || 'there'}!**

**Why AIRealtors247 vs. Generic AI?**
❌ **ChatGPT:** General knowledge, no real estate focus, you train it every time
✅ **AIRealtors247:** Pre-trained on real estate, knows your business, ready to work

**I'm not just AI - I'm your:**
🎯 **Industry-Focused Coach** - Trained specifically on real estate success strategies
🤝 **Implementation Partner** - I don't just give advice, I do the work FOR you
📞 **Executive Assistant** - Handle calls, book appointments, manage your pipeline
🏆 **Success Accelerator** - Turn you into a top 1% producer using proven systems

**Ready to see the difference?** Ask me anything real estate specific, or click a goal below!`
                }
            ]);
        } else {
            setMessages([
                { 
                    from: 'ai', 
                    type: 'returning',
                    text: `👋 **Your Real Estate AI Executive Assistant is ready, ${user.full_name?.split(' ')[0]}!**

**Unlike generic AI tools, I'm specifically built for YOUR success as a realtor.** I know your industry, your challenges, and exactly how to help you dominate your market.

**What would you like to accomplish today?** 🚀`
                }
            ]);
        }
    };

    const loadPreMadeContent = async () => {
        try {
            const answersData = await PreMadeAnswer.list();
            setPreMadeAnswers(answersData);
        } catch (error) {
            console.error("Error loading pre-made answers:", error);
        }
    };

    const findPreMadeAnswer = (userInput) => {
        const lowerInput = userInput.toLowerCase();
        const keywords = {
            'sms': 'pre_call_sms',
            'text message': 'pre_call_sms',
            'edit assistant': 'edit_assistant_script',
            'edit script': 'edit_assistant_script',
            'see appointments': 'view_appointments',
            'my calendar': 'view_appointments',
            'zip code': 'zip_code_assignment',
            'territory': 'zip_code_assignment',
            'understand reports': 'understand_reports',
            'my stats': 'understand_reports',
            'no setup': 'launch_no_setup',
            'launch now': 'launch_no_setup',
            'get leads': 'lead_generation',
            'first leads': 'lead_generation',
            'social media': 'content_creation',
            'create content': 'content_creation',
            'agreements': 'agreements',
            'contracts': 'agreements',
            'getting started': 'getting_started'
        };

        for (const [keyword, category] of Object.entries(keywords)) {
            if (lowerInput.includes(keyword)) {
                return preMadeAnswers.find(answer => answer.category === category);
            }
        }
        return null;
    };

    const formatChecklist = (answer) => {
        let response = `**${answer.simple_answer}**\n\nHere’s the step-by-step shortcut to get it done:\n\n`;
        if (answer.step_by_step && answer.step_by_step.length > 0) {
            answer.step_by_step.forEach(step => {
                response += `✅ **Step ${step.step}:** ${step.action}\n`;
                if (step.click_where) {
                    response += `*↳ Where to click: ${step.click_where}*\n\n`;
                }
            });
        }
        if (answer.suggested_follow_ups && answer.suggested_follow_ups.length > 0) {
           response += `💬 **Want to improve?**\n👉 Just say: *"${answer.suggested_follow_ups[0]}"*`;
        }
        return response;
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { from: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const userInput = input;
        setInput('');
        setIsProcessing(true);

        try {
            const preMadeAnswer = findPreMadeAnswer(userInput);
            
            if (preMadeAnswer) {
                const response = formatChecklist(preMadeAnswer);
                setMessages(prev => [...prev, { from: 'ai', text: response, type: 'checklist' }]);
            } else {
                const prompt = `You are the "AI Smart Coach" for AIRealtors247. A user on page "${currentPageName}" asked: "${userInput}". Give a simple, step-by-step checklist to help them. Use friendly, non-technical language. If you can't help, explain why and suggest they ask differently.`;
                const response = await InvokeLLM({ prompt });
                setMessages(prev => [...prev, { from: 'ai', text: response, type: 'guide' }]);
            }
        } catch (error) {
            console.error("Error processing request:", error);
            setMessages(prev => [...prev, { from: 'ai', text: "I'm having a small hiccup. Could you try asking in a different way?" }]);
        }

        setIsProcessing(false);
        localStorage.setItem(`assistant_used_${user.email}`, 'true');
    };

    const handleVoiceInput = () => {
        setIsListening(!isListening);
        // In a real app, integrate Web Speech API here.
        if (!isListening) {
          setTimeout(() => {
            setInput("How do I see my appointments?");
            setIsListening(false);
          }, 2000);
        }
    };

    const handleQuickAction = (action) => {
        setInput(action);
        // Automatically send the message for a smoother experience
        setTimeout(handleSend, 100);
    };

    const quickActions = [
        "Guide me through this page",
        "How do I get my first leads?",
        "Set up my social media",
        "How do I edit my AI assistant?",
        "Where do I see my reports?"
    ];

    return (
        <Card className="fixed bottom-20 right-5 w-96 h-[700px] shadow-2xl rounded-2xl flex flex-col z-50 border-2 border-emerald-200 bg-gradient-to-br from-white to-emerald-50">
            <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-emerald-600 to-green-600 text-white p-4 border-b rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="font-bold">AI Smart Coach</div>
                        <div className="text-xs opacity-90">Zero Learning Curve Assistant</div>
                    </div>
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
                    <X className="w-5 h-5"/>
                </Button>
            </CardHeader>
            
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-2 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                            {msg.from === 'ai' && (
                                <Avatar className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-green-600 text-white flex-shrink-0">
                                    <AvatarFallback><Sparkles className="w-4 h-4" /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`max-w-sm rounded-2xl p-3 text-sm ${
                                msg.from === 'user' 
                                    ? 'bg-emerald-600 text-white rounded-br-none' 
                                    : 'bg-white text-slate-900 rounded-bl-none shadow-sm border'
                            }`}>
                                <div dangerouslySetInnerHTML={{ 
                                    __html: msg.text
                                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                        .replace(/\n/g, '<br />') 
                                }} />
                            </div>
                        </div>
                    ))}
                    {isProcessing && (
                         <div className="flex items-start gap-2">
                            <Avatar className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-green-600 text-white flex-shrink-0">
                                <AvatarFallback><Sparkles className="w-4 h-4" /></AvatarFallback>
                            </Avatar>
                            <div className="max-w-sm rounded-2xl p-3 text-sm bg-white text-slate-900 rounded-bl-none shadow-sm border">
                                <div className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                                    <span>Building your guide...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            
            <CardFooter className="p-4 border-t bg-slate-50 flex-col items-start gap-3 rounded-b-2xl">
                <div className="w-full">
                    <div className="text-xs text-slate-500 mb-2 flex items-center gap-1 font-medium">
                        <Lightbulb className="w-3 h-3 text-yellow-500" />
                        Quick Start:
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {quickActions.map((action, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-auto py-1 px-2 bg-emerald-50 border-emerald-200 hover:bg-emerald-100"
                                onClick={() => handleQuickAction(action)}
                                disabled={isProcessing}
                            >
                                {action}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="flex w-full items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={handleVoiceInput}
                        disabled={isProcessing}
                        className={`transition-colors ${isListening ? 'bg-red-100 border-red-300' : 'bg-white'}`}
                    >
                        {isListening ? <MicOff className="w-4 h-4 text-red-600 animate-pulse" /> : <Mic className="w-4 h-4" />}
                    </Button>
                    <Input
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isProcessing}
                        className="bg-white"
                    />
                    <Button 
                        onClick={handleSend} 
                        disabled={isProcessing || !input.trim()}
                        className="bg-emerald-600 hover:bg-emerald-700"
                        size="icon"
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
