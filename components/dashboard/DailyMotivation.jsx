import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function DailyMotivation() {
  const quotes = [
    { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "Act as if what you do makes a difference. It does.", author: "William James" }
  ];

  // Pick a "random" quote for the day based on the date
  const dailyQuote = quotes[new Date().getDate() % quotes.length];

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-amber-500 to-orange-600 text-white h-full"> {/* Updated to new accent color */}
      <CardContent className="p-6 flex flex-col justify-center items-center text-center h-full">
        <Lightbulb className="w-12 h-12 mb-4 opacity-80" />
        <h3 className="text-lg font-semibold mb-2">Today's Focus</h3>
        <p className="text-2xl font-bold leading-tight">"{dailyQuote.quote}"</p>
        <p className="text-sm mt-4 opacity-70">- {dailyQuote.author} -</p>
      </CardContent>
    </Card>
  );
}