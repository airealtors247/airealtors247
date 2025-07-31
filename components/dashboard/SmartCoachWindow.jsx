import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Mic, Send } from 'lucide-react';

export default function SmartCoachWindow() {
  // This component would house the full ZeroLearningCurveAssistant logic
  // For this implementation, we'll create a static representation.
  return (
    <Card className="shadow-xl border-0 h-full flex flex-col bg-slate-800 text-white">
      <CardHeader className="bg-slate-900">
        <CardTitle className="flex items-center gap-2 text-lg">
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c5bbcd110_AIRealtors247_logo.png" alt="Coach" className="w-8 h-8 rounded-full" />
          AI Smart Coach
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4 text-sm">
            <div className="flex gap-2">
              <div className="p-2 bg-blue-600 rounded-lg h-fit">🤖</div>
              <div className="p-3 bg-slate-700 rounded-lg rounded-tl-none">
                Welcome back! What's our mission today? I'm ready to help you generate leads, create content, or manage your deals.
              </div>
            </div>
             <div className="flex gap-2 justify-end">
              <div className="p-3 bg-slate-600 rounded-lg rounded-tr-none">
                Help me generate 10 leads today.
              </div>
              <div className="p-2 bg-green-600 rounded-lg h-fit">ME</div>
            </div>
             <div className="flex gap-2">
              <div className="p-2 bg-blue-600 rounded-lg h-fit">🤖</div>
              <div className="p-3 bg-slate-700 rounded-lg rounded-tl-none">
                Excellent goal! Here's your 3-step plan to get 10 leads:
                <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Launch a 'Hot Buyer Leads' social media campaign.</li>
                    <li>Activate the AI assistant to call your new leads.</li>
                    <li>Create one 'Market Update' Lead Magnet.</li>
                </ol>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-2 border-t border-slate-700">
        <div className="flex w-full gap-2 items-center">
            <Button variant="ghost" className="hover:bg-slate-700">
                <BookOpen className="w-5 h-5" />
            </Button>
            <Input placeholder="Ask your coach..." className="bg-slate-700 border-slate-600" />
            <Button variant="ghost" className="hover:bg-slate-700">
                <Mic className="w-5 h-5" />
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-5 h-5" />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}