import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Video, Bot, Loader2, Wand2, CheckCircle, ArrowLeft } from 'lucide-react';
import { AIVideo } from '@/api/entities';
import { User as UserModel } from '@/api/entities';
import { createPageUrl } from '@/utils';

const avatars = [
    { id: 'avatar1', name: 'David (Professional)', img: 'https://i.pravatar.cc/150?u=david' },
    { id: 'avatar2', name: 'Sarah (Friendly)', img: 'https://i.pravatar.cc/150?u=sarah' },
    { id: 'avatar3', name: 'Michael (Energetic)', img: 'https://i.pravatar.cc/150?u=michael' },
    { id: 'digital_twin', name: 'Your Digital Twin', img: null },
];

export default function AIVideoGenerator() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [script, setScript] = useState('');
    const [title, setTitle] = useState('My New Video');
    const [selectedAvatar, setSelectedAvatar] = useState('avatar1');
    const [status, setStatus] = useState('idle'); // idle, generating, completed
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const currentUser = await UserModel.me();
            setUser(currentUser);
        };
        fetchUser();

        if (location.state?.viralMoment) {
            const { expected, delivered } = location.state.viralMoment;
            setTitle(`My Success Story!`);
            setScript(`You won't believe this. I set a goal to get ${expected} new leads. I just checked my report, and my AI assistant has already generated ${delivered}! I didn't have to do a thing. This is a game-changer for my business.`);
        }
    }, [location.state]);

    const handleGenerateVideo = async () => {
        if (!script || !user) return;
        setStatus('generating');
        try {
            await AIVideo.create({
                realtor_email: user.email,
                title,
                script,
                video_type: location.state?.viralMoment ? 'success_story' : 'market_update',
                avatar_id: selectedAvatar,
                status: 'generating',
                credit_cost: 15, // Example cost
            });
            // Simulate video generation
            setTimeout(() => {
                setGeneratedVideoUrl('https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4');
                setStatus('completed');
            }, 5000);
        } catch (error) {
            console.error('Failed to generate video:', error);
            setStatus('idle');
        }
    };

    return (
        <div className="min-h-full bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link to={createPageUrl('Dashboard')} className="flex items-center text-sm text-slate-600 hover:text-slate-900">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Dashboard
                    </Link>
                </div>

                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
                        <Video className="w-10 h-10 text-purple-600" />
                        AI Video Generator
                    </h1>
                    <p className="text-lg text-slate-600 mt-2">
                        Create professional videos in minutes, without any equipment.
                    </p>
                </header>

                <Card className="shadow-2xl border-0">
                    <CardContent className="p-6">
                        {status === 'completed' ? (
                            <div className="text-center py-12">
                                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Video is Ready!</h2>
                                <video src={generatedVideoUrl} controls className="w-full rounded-lg shadow-lg mb-6"></video>
                                <Button onClick={() => setStatus('idle')}>Create Another Video</Button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="font-semibold text-slate-700">Video Title</label>
                                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded mt-1" />
                                    </div>
                                    <div>
                                        <label className="font-semibold text-slate-700">Video Script</label>
                                        <Textarea
                                            value={script}
                                            onChange={(e) => setScript(e.target.value)}
                                            placeholder="Enter your video script here, or have one generated for you."
                                            rows={10}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="font-semibold text-slate-700">Choose Your AI Presenter</label>
                                        <div className="grid grid-cols-2 gap-4 mt-2">
                                            {avatars.map(avatar => (
                                                <div
                                                    key={avatar.id}
                                                    className={`p-2 border-2 rounded-lg cursor-pointer text-center ${selectedAvatar === avatar.id ? 'border-purple-600' : 'border-transparent'}`}
                                                    onClick={() => setSelectedAvatar(avatar.id)}
                                                >
                                                    <img
                                                        src={avatar.img || user?.profile_image_url || 'https://i.pravatar.cc/150?u=default'}
                                                        alt={avatar.name}
                                                        className="w-24 h-24 rounded-full mx-auto mb-2"
                                                    />
                                                    <p className="font-medium text-sm">{avatar.name}</p>
                                                    {avatar.id === 'digital_twin' && <Badge variant="secondary">Premium</Badge>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleGenerateVideo}
                                        disabled={status === 'generating'}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
                                    >
                                        {status === 'generating' ? (
                                            <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating Your Video...</>
                                        ) : (
                                            <><Wand2 className="w-5 h-5 mr-2" /> Generate Video (15 Credits)</>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
}