import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function BuyerGuideCreator() {
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
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Home className="text-green-600" /> AI First-Time Buyer Guide Creator</h1>
      <Card>
        <CardHeader><CardTitle>Generate Custom Buyer Guides Instantly</CardTitle></CardHeader>
        <CardContent>
          <p className="mb-4 text-slate-600">Create valuable, branded content for your leads. The AI will generate a complete guide based on your instructions.</p>
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Create a buyer's guide for the Los Angeles area. Include sections on getting pre-approved, making an offer, and the closing process."
            rows={5}
            className="mb-4"
          />
          <Button className="w-full bg-green-600 hover:bg-green-700">
            <Sparkles className="w-4 h-4 mr-2" />
            Create Guide
          </Button>
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
            <h3 className="font-semibold mb-2">Generated Guide Output:</h3>
            <p className="text-slate-500 italic">Your branded, multi-page buyer guide PDF will be available for download here...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}