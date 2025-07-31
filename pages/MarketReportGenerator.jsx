import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export default function MarketReportGenerator() {
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
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-8"><TrendingUp className="text-indigo-600" /> AI Market Report Generator</h1>
      <Card>
        <CardHeader><CardTitle>Create Data-Rich Market Reports in Seconds</CardTitle></CardHeader>
        <CardContent>
          <p className="mb-4 text-slate-600">Provide a location and let AI pull the latest data to create a professional, client-ready market report.</p>
          <Textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Generate a market report for Beverly Hills, 90210. Include average sale price, days on market, and inventory levels."
            rows={5}
            className="mb-4"
          />
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border">
            <h3 className="font-semibold mb-2">Generated Report Output:</h3>
            <p className="text-slate-500 italic">Your beautifully formatted market report PDF will be available for download here...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}