import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ExternalLink } from 'lucide-react';

export default function DailyBriefing({ newsItems }) {
  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Newspaper className="w-5 h-5 text-indigo-600" />
          Today's Market Briefing
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {newsItems && newsItems.length > 0 ? (
          newsItems.map(item => (
            <div key={item.id} className="p-3 bg-slate-50 rounded-lg border">
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-sm text-slate-900 mb-1">{item.headline}</h4>
                <Badge variant="outline">{item.source}</Badge>
              </div>
              <p className="text-xs text-slate-600 mb-2">{item.summary}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                Read More <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>No local news available at the moment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}