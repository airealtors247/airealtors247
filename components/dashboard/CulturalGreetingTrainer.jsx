
import React, { useState, useEffect } from 'react';
import { CulturalGreeting } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, 
  Volume2, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Book,
  Users,
  Loader2 // Added Loader2 import
} from 'lucide-react';

export default function CulturalGreetingTrainer({ user }) {
  const [greetings, setGreetings] = useState([]);
  const [currentGreeting, setCurrentGreeting] = useState(null);
  const [learnedCount, setLearnedCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    loadGreetings();
  }, []);

  const loadGreetings = async () => {
    try {
      const allGreetings = await CulturalGreeting.list('-language', 10);
      setGreetings(allGreetings);
      if (allGreetings.length > 0) {
        setCurrentGreeting(allGreetings[0]);
      }
    } catch (error) {
      console.error("Error loading greetings:", error);
      // Mock data for demonstration
      const mockGreetings = [
        {
          language: "Korean",
          culture: "Korean",
          greeting_text: "안녕하세요",
          phonetic_spelling: "Annyeonghaseyo",
          cultural_context: "Formal greeting suitable for first meetings with clients",
          difficulty_level: "beginner",
          usage_scenarios: ["First meeting with Korean clients", "Showing homes in Korean neighborhoods", "Building rapport with Korean sellers"]
        },
        {
          language: "Spanish",
          culture: "Mexican",
          greeting_text: "Buenos días, ¿cómo está usted?",
          phonetic_spelling: "BWAY-nohs DEE-ahs, KOH-moh ehs-TAH oos-TEHD",
          cultural_context: "Formal morning greeting showing respect",
          difficulty_level: "beginner",
          usage_scenarios: ["Morning appointments", "Meeting elderly clients", "Professional settings"]
        },
        {
          language: "Mandarin",
          culture: "Chinese",
          greeting_text: "您好",
          phonetic_spelling: "Nín hǎo",
          cultural_context: "Respectful greeting for business contexts",
          difficulty_level: "intermediate",
          usage_scenarios: ["Business meetings", "High-value property showings", "Formal introductions"]
        }
      ];
      setGreetings(mockGreetings);
      setCurrentGreeting(mockGreetings[0]);
    }
  };

  const playPronunciation = () => {
    setIsPlaying(true);
    // In a real implementation, this would play the audio
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const markAsLearned = () => {
    setLearnedCount(prev => prev + 1);
    // Move to next greeting
    const currentIndex = greetings.findIndex(g => g === currentGreeting);
    if (currentIndex < greetings.length - 1) {
      setCurrentGreeting(greetings[currentIndex + 1]);
    }
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  if (!currentGreeting) {
    return (
      <Card className="shadow-lg border-0">
        <CardContent className="p-6 text-center">
          <Globe className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Loading cultural greetings...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-900">
            <Globe className="w-6 h-6" />
            Cultural Connection Trainer
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600">Progress</div>
            <div className="font-bold text-emerald-600">{learnedCount}/{greetings.length}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Greetings Mastered</span>
            <span className="text-slate-600">{Math.round((learnedCount / greetings.length) * 100)}%</span>
          </div>
          <Progress value={Math.round((learnedCount / greetings.length) * 100)} className="h-2" />
        </div>

        {/* Current Greeting */}
        <div className="bg-white p-6 rounded-lg border border-slate-200 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h3 className="text-xl font-bold text-slate-900">{currentGreeting.culture}</h3>
            <Badge className={getDifficultyColor(currentGreeting.difficulty_level)}>
              {currentGreeting.difficulty_level}
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div className="text-4xl font-bold text-emerald-600 mb-2">
              {currentGreeting.greeting_text}
            </div>
            
            <div className="bg-slate-100 p-3 rounded-lg">
              <p className="text-lg font-mono text-slate-800">
                {currentGreeting.phonetic_spelling}
              </p>
            </div>
            
            <Button 
              onClick={playPronunciation}
              disabled={isPlaying}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isPlaying ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Volume2 className="w-4 h-4 mr-2" />
              )}
              {isPlaying ? 'Playing...' : 'Hear Pronunciation'}
            </Button>
          </div>
        </div>

        {/* Cultural Context */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Book className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Cultural Context</h4>
              <p className="text-blue-800 text-sm">{currentGreeting.cultural_context}</p>
            </div>
          </div>
        </div>

        {/* Usage Scenarios */}
        <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Users className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">When to Use This:</h4>
              <ul className="space-y-1">
                {currentGreeting.usage_scenarios?.map((scenario, index) => (
                  <li key={index} className="text-purple-800 text-sm flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    {scenario}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={markAsLearned}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <Star className="w-4 h-4 mr-2" />
            I've Got This!
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              const currentIndex = greetings.findIndex(g => g === currentGreeting);
              if (currentIndex < greetings.length - 1) {
                setCurrentGreeting(greetings[currentIndex + 1]);
              }
            }}
            className="flex items-center gap-2"
          >
            Skip <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Achievement Message */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-200 p-3 rounded-lg text-center">
          <p className="text-yellow-800 text-sm">
            <strong>Result:</strong> You'll feel smarter, more prepared, and more human when connecting with diverse clients! 🌟
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
