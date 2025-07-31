import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function TextToVideo() {
  const location = useLocation();
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialPrompt = params.get('prompt');
    if (initialPrompt) {
      setPrompt(decodeURIComponent(initialPrompt));
    }
  }, [location.search]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Film className="text-cyan-600" /> AI Text-to-Video Posts</h1>
      <Card>
        <CardHeader><CardTitle>Turn Any Text Into an Engaging Video</CardTitle></CardHeader>
        <CardContent>
          <p className="mb-4 text-slate-600">Paste a blog post, article, or script, and the AI will create a video with stock footage, music, and captions.</p>
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Take my latest blog post about '5 Tips for Boosting Curb Appeal' and turn it into a 60-second video..."
            rows={8}
            className="mb-4"
          />
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Video
          </Button>
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
            <h3 className="font-semibold mb-2">Generated Video Output:</h3>
            <p className="text-slate-500 italic">Your generated video file will appear here for preview and download...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}