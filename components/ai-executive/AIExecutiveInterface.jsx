

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, User as UserIcon, Send } from 'lucide-react';

export default function AIExecutiveInterface({ user }) {
    const [messages, setMessages] = useState([
        { sender: 'ai', text: `Hello ${user?.full_name || 'Valued Agent'}. I am your AI Executive Assistant. I'm ready to manage your platform autonomously. What is our primary objective for this week?` }
    ]);
    const [input, setInput] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSendMessage = () => {
        if (!input.trim()) return;
        
        const newMessages = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setIsSending(true);

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'ai', text: "Understood. I will prioritize that objective and begin executing the necessary tasks. I'll provide a summary report tomorrow morning." }]);
            setIsSending(false);
        }, 1500);
    };

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <CardTitle>Conversation with Your Assistant</CardTitle>
                <CardDescription>Delegate tasks, set goals, and receive updates here.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
                <ScrollArea className="flex-1 h-96 pr-4">
                    <div className="space-y-6">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'ai' && (
                                    <Avatar className="w-10 h-10 border-2 border-slate-300 overflow-hidden">
                                        <AvatarImage src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a2b2b1612_ExecutiveAssistant.png" />
                                        <AvatarFallback><Bot /></AvatarFallback>
                                    </Avatar>
                                )}
                                <div className={`max-w-md p-4 rounded-2xl ${msg.sender === 'ai' ? 'bg-slate-100' : 'bg-blue-600 text-white'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                                {msg.sender === 'user' && (
                                    <Avatar className="w-10 h-10 border-2 border-blue-300">
                                        <AvatarImage src={user?.profile_image_url} />
                                        <AvatarFallback><UserIcon /></AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        ))}
                         {isSending && (
                             <div className="flex items-start gap-3">
                                 <Avatar className="w-10 h-10 border-2 border-slate-300 overflow-hidden">
                                     <AvatarImage src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a2b2b1612_ExecutiveAssistant.png" />
                                     <AvatarFallback><Bot /></AvatarFallback>
                                 </Avatar>
                                 <div className="max-w-md p-4 rounded-2xl bg-slate-100">
                                     <div className="flex items-center gap-2">
                                         <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                                         <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></div>
                                         <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                                     </div>
                                 </div>
                             </div>
                        )}
                    </div>
                </ScrollArea>
                <div className="flex gap-2 pt-4 border-t">
                    <Textarea
                        placeholder="e.g., 'Focus on generating 10 new seller leads this week...'"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        className="flex-1 resize-none"
                    />
                    <Button onClick={handleSendMessage} disabled={!input.trim() || isSending}>
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

