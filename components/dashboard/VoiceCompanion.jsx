
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  MessageSquare,
  Brain,
  Headphones,
  AudioLines, // Changed from Waveform to AudioLines
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { VoiceCommand } from '@/api/entities';
import { RealtorGoals } from '@/api/entities';
import { RealtorTasks } from '@/api/entities';

const VoiceCompanion = ({ user }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceMode, setVoiceMode] = useState('talk_to_check'); // talk_to_train, talk_to_do, talk_to_check
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [recentCommands, setRecentCommands] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    loadRecentCommands();
    initializeSpeechRecognition();
    initializeSpeechSynthesis();
  }, [user]);

  const loadRecentCommands = async () => {
    try {
      const commands = await VoiceCommand.filter({
        user_email: user.email
      }, '-timestamp', 5);
      setRecentCommands(commands);
    } catch (error) {
      console.error('Error loading recent commands:', error);
    }
  };

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
        
        if (finalTranscript) {
          processVoiceCommand(finalTranscript);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  };

  const initializeSpeechSynthesis = () => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  };

  const processVoiceCommand = async (command) => {
    setIsProcessing(true);
    
    try {
      // Determine command category based on content
      const category = categorizeCommand(command);
      
      // Generate AI response based on voice mode and command
      const response = await generateAIResponse(command, category, voiceMode);
      
      // Save the command and response
      await VoiceCommand.create({
        user_email: user.email,
        command_text: command,
        command_category: category,
        ai_response: response,
        action_taken: response.includes('executed') ? 'action_executed' : 'information_provided',
        timestamp: new Date().toISOString(),
        voice_mode: voiceMode,
        execution_successful: true
      });
      
      setAiResponse(response);
      speakResponse(response);
      loadRecentCommands();
      
    } catch (error) {
      console.error('Error processing voice command:', error);
      const errorResponse = "I apologize, but I encountered an error processing your request. Please try again.";
      setAiResponse(errorResponse);
      speakResponse(errorResponse);
    }
    
    setIsProcessing(false);
  };

  const categorizeCommand = (command) => {
    const cmd = command.toLowerCase();
    
    if (cmd.includes('goal') || cmd.includes('target') || cmd.includes('achieve')) {
      return 'goal_check';
    } else if (cmd.includes('send') || cmd.includes('call') || cmd.includes('post') || cmd.includes('create')) {
      return 'task_execution';
    } else if (cmd.includes('how') || cmd.includes('learn') || cmd.includes('training')) {
      return 'training_request';
    } else if (cmd.includes('status') || cmd.includes('progress') || cmd.includes('report')) {
      return 'status_update';
    } else if (cmd.includes('lead') || cmd.includes('client') || cmd.includes('prospect')) {
      return 'lead_action';
    } else if (cmd.includes('content') || cmd.includes('write') || cmd.includes('generate')) {
      return 'content_creation';
    } else {
      return 'status_update';
    }
  };

  const generateAIResponse = async (command, category, mode) => {
    // This would integrate with your LLM service
    // For now, we'll return contextual responses based on the mode and category
    
    const responses = {
      talk_to_check: {
        goal_check: `Based on your goals, you're currently at 67% completion for this month. Your listing goal is progressing well with 4 out of 6 completed.`,
        status_update: `Your AI has been busy! Today I've sent 23 emails, made 8 follow-up calls, and generated 3 new leads. Your pipeline is strong.`,
        lead_action: `You have 12 hot leads requiring follow-up. The top 3 are: Sarah Johnson (ready to list), Mike Chen (pre-approved buyer), and Lisa Martinez (investor looking for rentals).`,
        training_request: `I can help you learn about any AIRealtors247 feature. What specifically would you like to know more about?`,
        content_creation: `I've generated 5 social media posts for this week and scheduled them. Your content calendar is fully automated.`,
        task_execution: `Task noted. I'll execute this shortly and provide you with a detailed report of the results.`
      },
      talk_to_do: {
        goal_check: `I understand you want to work on your goals. Let me create an action plan to accelerate your progress.`,
        status_update: `Let me pull up your latest performance metrics and create a comprehensive status report.`,
        lead_action: `I'll immediately begin processing your lead-related request and provide real-time updates.`,
        training_request: `I'll walk you through this step-by-step. Let's start with the basics and build your confidence.`,
        content_creation: `I'm creating that content for you right now. I'll have it ready for your review in just a moment.`,
        task_execution: `Executing your request now. I'll monitor the process and alert you when complete.`
      },
      talk_to_train: {
        goal_check: `Great question! Let me explain how goal tracking works and show you the most effective strategies.`,
        status_update: `I'll teach you how to read your analytics and identify the key performance indicators that matter most.`,
        lead_action: `Let me guide you through our lead management system and show you proven techniques for conversion.`,
        training_request: `Perfect! This is exactly what I'm here for. Let's dive deep into this topic together.`,
        content_creation: `I'll teach you the art and science of content creation that converts prospects into clients.`,
        task_execution: `Let me show you how to effectively use our automation tools to maximize your productivity.`
      }
    };
    
    return responses[mode]?.[category] || `I understand you said: "${command}". I'm processing this request and will provide you with a detailed response.`;
  };

  const speakResponse = (text) => {
    if (synthRef.current) {
      synthRef.current.cancel(); // Stop any ongoing speech
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setAiResponse('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const getModeConfig = (mode) => {
    const configs = {
      talk_to_check: {
        name: 'Talk to Check',
        color: 'bg-blue-100 text-blue-800',
        icon: MessageSquare,
        description: 'Ask about your progress, goals, and status'
      },
      talk_to_do: {
        name: 'Talk to Do',
        color: 'bg-green-100 text-green-800',
        icon: Play,
        description: 'Give commands for immediate execution'
      },
      talk_to_train: {
        name: 'Talk to Train',
        color: 'bg-purple-100 text-purple-800',
        icon: Brain,
        description: 'Learn how to use features and get training'
      }
    };
    return configs[mode];
  };

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-indigo-50 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Headphones className="w-6 h-6 text-indigo-600" />
          Voice Companion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Voice Mode Selection */}
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900">Voice Mode</h4>
          <div className="grid grid-cols-1 gap-2">
            {['talk_to_check', 'talk_to_do', 'talk_to_train'].map((mode) => {
              const config = getModeConfig(mode);
              return (
                <Button
                  key={mode}
                  variant={voiceMode === mode ? 'default' : 'outline'}
                  onClick={() => setVoiceMode(mode)}
                  className="justify-start p-3 h-auto"
                >
                  <config.icon className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-medium">{config.name}</div>
                    <div className="text-xs opacity-70">{config.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Voice Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={toggleListening}
              size="lg"
              className={`w-16 h-16 rounded-full ${isListening ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </Button>
            
            <Button
              onClick={isSpeaking ? stopSpeaking : () => {}}
              size="lg"
              variant="outline"
              className="w-16 h-16 rounded-full"
              disabled={!isSpeaking}
            >
              {isSpeaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </Button>
          </div>
          
          <div className="text-center">
            <Badge className={getModeConfig(voiceMode).color}>
              {getModeConfig(voiceMode).name} Mode
            </Badge>
          </div>
        </div>

        {/* Live Transcript */}
        {(transcript || isProcessing) && (
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">You said:</h4>
            <div className="p-3 bg-white rounded-lg border">
              {isProcessing ? (
                <div className="flex items-center gap-2 text-blue-600">
                  <AudioLines className="w-4 h-4 animate-pulse" /> {/* Changed from Waveform to AudioLines */}
                  <span>Processing...</span>
                </div>
              ) : (
                <p className="text-slate-700">{transcript}</p>
              )}
            </div>
          </div>
        )}

        {/* AI Response */}
        {aiResponse && (
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">AI Response:</h4>
            <div className="p-3 bg-indigo-100 rounded-lg border border-indigo-200">
              <p className="text-indigo-800">{aiResponse}</p>
              {isSpeaking && (
                <div className="flex items-center gap-2 mt-2 text-indigo-600">
                  <Volume2 className="w-4 h-4 animate-pulse" />
                  <span className="text-sm">Speaking...</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Commands */}
        {recentCommands.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-900">Recent Commands</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {recentCommands.map((cmd, index) => (
                <div key={index} className="text-xs p-2 bg-white rounded border">
                  <div className="font-medium text-slate-700">{cmd.command_text}</div>
                  <div className="text-slate-500">{new Date(cmd.timestamp).toLocaleTimeString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Commands */}
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-900">Quick Commands</h4>
          <div className="grid grid-cols-1 gap-1">
            {[
              "What's my progress today?",
              "How many leads do I have?",
              "Send follow-up emails",
              "Create social media post",
              "Check my calendar"
            ].map((cmd, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => processVoiceCommand(cmd)}
                className="justify-start text-xs p-2"
              >
                {cmd}
              </Button>
            ))}
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default VoiceCompanion;
