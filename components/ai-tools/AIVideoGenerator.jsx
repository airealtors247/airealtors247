import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AIVideo } from "@/api/entities";
import { Video, Sparkles, Loader2, Wand2, User, Mic } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const avatars = [
  { id: 'avatar1', name: 'Michael', img: 'https://i.pravatar.cc/150?u=avatar1' },
  { id: 'avatar2', name: 'Sarah', img: 'https://i.pravatar.cc/150?u=avatar2' },
  { id: 'avatar3', name: 'David', img: 'https://i.pravatar.cc/150?u=avatar3' },
];

const voices = [
  { id: 'voice1', name: 'Professional Male' },
  { id: 'voice2', name: 'Friendly Female' },
  { id: 'voice3', name: 'Authoritative Male' },
];

export default function AIVideoGenerator({ user }) {
  const [script, setScript] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].id);
  const [selectedVoice, setSelectedVoice] = useState(voices[0].id);
  const [generatedVideo, setGeneratedVideo] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateVideo = async () => {
    if (!script) {
      alert("Please enter a script to generate a video.");
      return;
    }
    setIsGenerating(true);
    try {
      // In a real app, this would call an integration like Synthesia or D-ID
      // For now, we simulate the process
      await new Promise(resolve => setTimeout(resolve, 3000));
      const newVideo = {
        realtor_email: user.email,
        title: script.substring(0, 30) + '...',
        video_type: 'faq',
        script,
        avatar_id: selectedAvatar,
        voice_id: selectedVoice,
        video_url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', // Placeholder URL
        status: 'completed',
        credit_cost: 50
      };
      const createdVideo = await AIVideo.create(newVideo);
      setGeneratedVideo(createdVideo);
    } catch (error) {
      console.error("Error generating video:", error);
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">AI Video Generator</h2>
      <p className="text-slate-600">
        Create professional videos with AI avatars and voices. Perfect for market updates, listing tours, and FAQs.
      </p>

      <Card>
        <CardContent className="p-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="font-medium">Video Script</label>
              <Textarea
                placeholder="Enter your video script here..."
                className="h-48"
                value={script}
                onChange={(e) => setScript(e.target.value)}
              />
            </div>
            <Button className="w-full">
              <Wand2 className="w-4 h-4 mr-2" />
              Generate Script with AI
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="font-medium mb-2 block">Choose Your AI Avatar</label>
              <div className="flex gap-4">
                {avatars.map(avatar => (
                  <div key={avatar.id} onClick={() => setSelectedAvatar(avatar.id)} className={`cursor-pointer rounded-full ring-2 ${selectedAvatar === avatar.id ? 'ring-blue-500' : 'ring-transparent'}`}>
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={avatar.img} />
                      <AvatarFallback>{avatar.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-center text-xs mt-1">{avatar.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="font-medium">Choose AI Voice</label>
              <Select onValueChange={setSelectedVoice} defaultValue={selectedVoice}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map(voice => (
                    <SelectItem key={voice.id} value={voice.id}>{voice.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleGenerateVideo} disabled={isGenerating} className="w-full">
              {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Video className="w-4 h-4 mr-2" />}
              Generate Video (50 Credits)
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {generatedVideo && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Video</CardTitle>
          </CardHeader>
          <CardContent>
            <video controls src={generatedVideo.video_url} className="w-full rounded-lg"></video>
          </CardContent>
        </Card>
      )}
    </div>
  );
}