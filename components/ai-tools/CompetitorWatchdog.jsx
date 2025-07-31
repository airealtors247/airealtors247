import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, Loader2 } from 'lucide-react';
import { CompetitorReport } from "@/api/entities";

export default function CompetitorWatchdog({ user }) {
  const [zipCode, setZipCode] = useState('');
  const [report, setReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    if (!zipCode) {
      alert("Please enter a zip code.");
      return;
    }
    setIsGenerating(true);
    try {
      // In a real app, this would trigger a complex backend process
      // involving web scraping and analysis. We'll simulate it.
      await new Promise(resolve => setTimeout(resolve, 2500));
      const newReport = {
        realtor_email: user.email,
        target_zip_code: zipCode,
        report_date: new Date().toISOString().split('T')[0],
        top_performing_listings: [
          { address: '456 Oak Ave', price: 1250000, url: '#' },
          { address: '789 Pine St', price: 980000, url: '#' },
        ],
        top_social_posts: [
          { platform: 'Instagram', content: 'Just sold this beauty in record time!', url: '#' },
          { platform: 'Facebook', content: 'Thinking of selling? The market is hot!', url: '#' },
        ],
        market_trends_summary: 'The market in ' + zipCode + ' is currently favoring sellers, with average days on market decreasing by 15% over the last quarter. Luxury properties above $1M are seeing the most activity.'
      };
      const createdReport = await CompetitorReport.create(newReport);
      setReport(createdReport);
    } catch (error) {
      console.error("Error generating report:", error);
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">AI Competitor Watchdog</h2>
      <p className="text-slate-600">
        Get a monthly AI-powered briefing on what other realtors are doing in your target area.
      </p>

      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Input 
              placeholder="Enter target zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <Button onClick={handleGenerateReport} disabled={isGenerating}>
              {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
              Generate Report (20 Credits)
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {report && (
        <Card>
          <CardHeader>
            <CardTitle>Competitor Report for {report.target_zip_code}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Market Trends Summary</h3>
              <p className="text-sm bg-blue-50 p-3 rounded-lg">{report.market_trends_summary}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Top Performing Listings</h3>
              <ul className="space-y-2">
                {report.top_performing_listings.map((listing, i) => (
                  <li key={i} className="text-sm"><strong>{listing.address}</strong> - ${listing.price.toLocaleString()}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Top Social Posts</h3>
              <ul className="space-y-2">
                {report.top_social_posts.map((post, i) => (
                  <li key={i} className="text-sm"><strong>{post.platform}:</strong> "{post.content}"</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}