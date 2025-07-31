import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function CMAGenerator() {
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
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><Calculator className="text-fuchsia-600" /> AI CMA Generator</h1>
      <Card>
        <CardHeader><CardTitle>Generate Accurate CMAs in Minutes</CardTitle></CardHeader>
        <CardContent>
          <p className="mb-4 text-slate-600">Enter a property address and let the AI pull comps, analyze data, and generate a comprehensive Comparative Market Analysis.</p>
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Generate a CMA for 456 Oak Avenue, Beverly Hills, CA 90210. Use 5 comparable active listings and 5 comparable solds."
            rows={5}
            className="mb-4"
          />
          <Button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate CMA
          </Button>
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
            <h3 className="font-semibold mb-2">Generated CMA Output:</h3>
            <p className="text-slate-500 italic">Your comprehensive CMA report will be available for download here...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}