import React, { useState } from 'react';
import { Mic, Zap, Loader2, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { InvokeLLM } from "@/api/integrations";

export default function VoiceCommandBar() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleListen = () => {
    setIsListening(prev => !prev);
    if (!isListening) {
      setTranscript('');
      setAiResponse('');
      // In a real app, this would use Web Speech API
      setTimeout(() => {
        setTranscript("Create a new social media post for my listing at 123 Main Street and schedule it for tomorrow at 9 AM.");
        setIsListening(false);
      }, 3000);
    }
  };

  const handleExecuteCommand = async () => {
    setIsProcessing(true);
    setAiResponse('');
    try {
      // Simulate LLM processing the command
      const response = await InvokeLLM({
        prompt: `Parse this command and explain the steps you would take: "${transcript}"`
      });
      setAiResponse(`OK. I've drafted a post for 123 Main Street and scheduled it for tomorrow at 9 AM. You can review it in the Content Library.`);
    } catch (error) {
      setAiResponse("Sorry, I couldn't process that command.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            className={`rounded-full w-14 h-14 ${isListening ? 'bg-red-600 hover:bg-red-700 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'}`}
            onClick={handleListen}
          >
            <Mic className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <div className="w-full bg-slate-100 rounded-lg p-3 text-sm text-slate-800 min-h-[56px] flex items-center">
              {isListening && <span className="text-slate-500 italic">Listening...</span>}
              {transcript && !isListening && <span>{transcript}</span>}
              {!transcript && !isListening && <span className="text-slate-400">Press the mic and speak your command...</span>}
            </div>
            {aiResponse && (
              <div className="mt-2 text-xs text-green-700 font-medium flex items-center gap-2">
                <Zap className="w-3 h-3" /> {aiResponse}
              </div>
            )}
          </div>
          <Button
            size="lg"
            disabled={!transcript || isProcessing}
            onClick={handleExecuteCommand}
          >
            {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
            Execute
          </Button>
        </div>
      </div>
    </div>
  );
}