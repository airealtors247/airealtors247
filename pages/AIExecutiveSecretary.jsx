
import React, { useState } from 'react';
import { User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Zap, Shield, Mic, MessageSquare, Brain } from 'lucide-react';
import AIExecutiveInterface from '../components/ai-executive/AIExecutiveInterface';

export default function AIExecutiveSecretaryPage() {
    const [user, setUser] = useState({ full_name: 'Valued Agent', profile_image_url: '' }); // Mock user
    const [config, setConfig] = useState({
        fullAutonomy: true,
        communicationFrequency: 'daily',
        notificationMethod: 'email',
        approvalRequired: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    // In a real app, you'd fetch the user and their config
    // useEffect(() => { ... }, []);

    const handleConfigChange = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const handleSaveConfig = () => {
        setIsLoading(true);
        console.log("Saving config:", config);
        setTimeout(() => {
            setIsLoading(false);
            alert("Configuration saved successfully!");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                <div className="bg-gradient-to-r from-slate-800 to-gray-900 rounded-2xl shadow-xl p-8 text-white">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20 overflow-hidden">
                            <img
                                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/a2b2b1612_ExecutiveAssistant.png"
                                alt="AI Executive Assistant"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold">AI Executive Assistant</h1>
                            <p className="text-xl text-slate-300 mt-2">Your dedicated AI partner for full-service, autonomous platform management.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <AIExecutiveInterface user={user} />
                    </div>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Assistant Configuration</CardTitle>
                                <CardDescription>Set the rules of engagement for your AI assistant.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="fullAutonomy" className="font-semibold">Full Autonomy Mode</Label>
                                    <Switch
                                        id="fullAutonomy"
                                        checked={config.fullAutonomy}
                                        onCheckedChange={(checked) => handleConfigChange('fullAutonomy', checked)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Communication Frequency</Label>
                                    <div className="flex gap-2">
                                        {['daily', 'weekly', 'instant'].map(freq => (
                                            <Button
                                                key={freq}
                                                variant={config.communicationFrequency === freq ? 'default' : 'outline'}
                                                onClick={() => handleConfigChange('communicationFrequency', freq)}
                                                className="capitalize flex-1"
                                            >
                                                {freq}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Notification Method</Label>
                                    <div className="flex gap-2">
                                        {['email', 'sms', 'app'].map(method => (
                                            <Button
                                                key={method}
                                                variant={config.notificationMethod === method ? 'default' : 'outline'}
                                                onClick={() => handleConfigChange('notificationMethod', method)}
                                                className="capitalize flex-1"
                                            >
                                                {method}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                 <div className="flex items-center justify-between">
                                    <Label htmlFor="approvalRequired" className="font-semibold">Require Approval for Major Actions</Label>
                                    <Switch
                                        id="approvalRequired"
                                        checked={config.approvalRequired}
                                        onCheckedChange={(checked) => handleConfigChange('approvalRequired', checked)}
                                    />
                                </div>
                                <Button onClick={handleSaveConfig} disabled={isLoading} className="w-full">
                                    {isLoading ? 'Saving...' : 'Save Configuration'}
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Core Capabilities</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="flex items-center gap-2 text-sm"><Zap className="w-4 h-4 text-amber-500" /> Autonomous Campaign Management</p>
                                <p className="flex items-center gap-2 text-sm"><MessageSquare className="w-4 h-4 text-blue-500" /> Proactive Lead Follow-up</p>
                                <p className="flex items-center gap-2 text-sm"><Brain className="w-4 h-4 text-purple-500" /> Strategic Goal Execution</p>
                                <p className="flex items-center gap-2 text-sm"><Shield className="w-4 h-4 text-green-500" /> Compliance & Performance Monitoring</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
