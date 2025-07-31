import React, { useState, useEffect, useRef } from 'react';
import { SupportTicket } from '@/api/entities';
import { InvokeLLM } from '@/api/integrations';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Send, Loader2, LifeBuoy, X, BookOpen } from "lucide-react";

export default function SupportHub({ user, onClose, currentPageName }) {
    const [messages, setMessages] = useState([
        { from: 'ai', text: `Hi ${user.full_name?.split(' ')[0] || 'there'}! Ask me anything about AIRealtors247, or click the guide button below.` }
    ]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const scrollAreaRef = useRef(null);

    useEffect(() => {
        // Auto-scroll to bottom on new message
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { from: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsProcessing(true);

        try {
            const prompt = `You are a support agent for AIRealtors247. A user is asking for help.
            User's question: "${input}"
            
            Your capabilities: You can answer questions about lead generation, social media posting, campaigns, website builder, and account settings. The user is currently on the "${currentPageName}" page.
            
            If you can answer, provide a clear, concise response.
            If the question is about a bug, billing issue, or something you can't resolve, respond with a JSON object:
            {"escalate": true, "summary": "A brief summary of the user's issue for the support team."}
            Otherwise, respond with the answer as a simple string.`;
            
            const response = await InvokeLLM({ prompt });

            let aiResponseText;
            if (typeof response === 'object' && response.escalate) {
                await SupportTicket.create({
                    user_email: user.email,
                    query_text: input,
                    ai_response_summary: response.summary
                });
                aiResponseText = `I'm not able to resolve that directly, but I've created a support ticket for you. Our team will get back to you shortly. Your ticket summary is: "${response.summary}"`;
            } else {
                aiResponseText = response;
            }
            
            setMessages(prev => [...prev, { from: 'ai', text: aiResponseText }]);
        } catch (error) {
            console.error("Error in support hub:", error);
            setMessages(prev => [...prev, { from: 'ai', text: "Sorry, I encountered an error. Please try asking again." }]);
        }

        setIsProcessing(false);
    };

    const handleGuideRequest = async () => {
        setIsProcessing(true);
        setMessages(prev => [...prev, { from: 'user', text: `Guide me on how to use the ${currentPageName} page.` }]);

        try {
            const prompt = `
                You are 'Aira', the friendly and motivational AI Coach for the AIRealtors247 platform.
                A user is on the "${currentPageName}" page and has asked for a guide.
                Your goal is to provide a clear, simple, and inspiring guide on how to use this page to its full potential.

                Your response MUST follow this structure:
                1.  **Why this page is a Game-Changer:** Start with 1-2 powerful sentences explaining how this page helps realtors dominate their market and achieve their goals. Be motivational!
                2.  **Your Step-by-Step Guide:** Provide a numbered list of 3-5 clear, actionable steps on how to use the primary features of this page. Use bolding for key terms. For example, "1. Click the **New Campaign** button to start."
                3.  **Pro Tip:** Conclude with a single, impactful "Pro Tip" that gives the user an extra edge.

                IMPORTANT: Do NOT use technical jargon. Assume the user is a busy real estate agent, not a tech expert. Focus on benefits like saving time, making more money, and impressing clients.
            `;

            const guideText = await InvokeLLM({ prompt });
            setMessages(prev => [...prev, { from: 'ai', text: guideText }]);
        } catch (error) {
            console.error("Error generating guide:", error);
            setMessages(prev => [...prev, { from: 'ai', text: "I had a bit of trouble generating that guide. Please try again in a moment." }]);
        }

        setIsProcessing(false);
    };

    return (
        <Card className="fixed bottom-20 right-5 w-96 h-[600px] shadow-2xl rounded-2xl flex flex-col z-50 border-2 border-blue-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between bg-slate-100 p-4 border-b">
                <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
                    <Bot className="w-6 h-6 text-blue-600" />
                    AI Assistant & Guide
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-5 h-5"/>
                </Button>
            </CardHeader>
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                            {msg.from === 'ai' && (
                                <Avatar className="w-8 h-8 bg-blue-600 text-white">
                                    <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`max-w-xs rounded-2xl p-3 text-sm prose ${msg.from === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-900 rounded-bl-none'}`}
                                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}
                            >
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
                            <Avatar className="w-8 h-8 bg-blue-600 text-white">
                                <AvatarFallback><Bot className="w-4 h-4" /></AvatarFallback>
                            </Avatar>
                            <div className="max-w-xs rounded-2xl p-3 text-sm bg-slate-100 text-slate-900 rounded-bl-none">
                                <Loader2 className="w-4 h-4 animate-spin" />
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
            <CardFooter className="p-4 border-t bg-slate-50 flex-col items-start gap-3">
                 <Button onClick={handleGuideRequest} disabled={isProcessing} className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Guide me on the '{currentPageName}' page
                </Button>
                <div className="flex w-full items-center gap-2">
                    <Input
                        placeholder="Or ask a specific question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isProcessing}
                        className="bg-white"
                    />
                    <Button onClick={handleSend} disabled={isProcessing || !input.trim()}>
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}