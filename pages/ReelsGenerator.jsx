import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function ReelsGenerator() {
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
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Video className="text-pink-600" /> AI Reels Script Generator</h1>
      <Card>
        <CardHeader><CardTitle>Generate Your Next Viral Reel</CardTitle></CardHeader>
        <CardContent>
          <p className="mb-4 text-slate-600">Your AI will generate a complete script, including scene suggestions, captions, and trending audio recommendations based on your prompt.</p>
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Create a 30-second script for a 'Top 3 Mistakes First-Time Homebuyers Make' reel."
            rows={5}
            className="mb-4"
          />
          <Button className="w-full bg-pink-600 hover:bg-pink-700">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Script
          </Button>
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
            <h3 className="font-semibold mb-2">Generated Script Output:</h3>
            <p className="text-slate-500 italic">Your generated script will appear here...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}