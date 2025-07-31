import React, { useState, useEffect } from 'react';
import { VoiceCommandExample } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, Bot, Lightbulb } from 'lucide-react';

export default function VoiceCommandExamples() {
  const [examples, setExamples] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    loadExamples();
  }, []);

  const loadExamples = async () => {
    try {
      const examplesData = await VoiceCommandExample.list();
      setExamples(examplesData);
    } catch (error) {
      console.error("Error loading voice command examples:", error);
    }
  };

  const categories = [
    "all",
    "Greeting & Planning",
    "Task Management", 
    "Execution & Automation",
    "Performance & Status Check",
    "Training & Development",
    "Data Quality",
    "Content & Strategy",
    "Cultural Training",
    "Motivation",
    "Goal Setting",
    "Reporting",
    "Relationship",
    "System Command"
  ];

  const filteredExamples = selectedCategory === "all" 
    ? examples 
    : examples.filter(ex => ex.category === selectedCategory);

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          Voice Command Examples
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Greeting & Planning">Planning</TabsTrigger>
            <TabsTrigger value="Training & Development">Training</TabsTrigger>
            <TabsTrigger value="Execution & Automation">Automation</TabsTrigger>
          </TabsList>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredExamples.map((example, index) => (
              <div key={index} className="border rounded-lg p-4 bg-slate-50">
                <div className="flex items-start gap-3 mb-2">
                  <Mic className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 text-sm">
                      "{example.command_text}"
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {example.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-start gap-3 ml-7">
                  <Bot className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-slate-700 text-sm italic">
                    {example.ai_response_text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}