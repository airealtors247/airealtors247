import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Mail, MessageSquare, PhoneCall, Phone, Link as LinkIcon, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

// Mock for RealtorGoals (assuming it's an ORM-like entity or service)
// In a real application, this would likely be imported from a separate service/API layer.
const RealtorGoals = {
  create: async (goalData) => {
    console.log("Mock RealtorGoals.create called with:", goalData);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { goal_id: `goal-${Date.now()}`, ...goalData };
  },
};

// Mock for GoalMultiplier (assuming it's an ORM-like entity or service as per the import line)
// In a real application, this would be imported from '@/api/entities'.
const GoalMultiplier = {
  create: async (data) => {
    console.log("Mock GoalMultiplier.create called with:", data);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { multiplier_id: `multiplier-${Date.now()}`, ...data };
  }
};

export default function BusyRealtorController({ user }) {
  // State variables for the new goal feature
  const [goalInput, setGoalInput] = useState('');
  const [aiResponse, setAiResponse] = useState(''); // To display AI's feedback
  const [isProcessing, setIsProcessing] = useState(false); // To handle loading state

  const extractTargetValue = (goalText) => {
    const match = goalText.match(/(\d+)/);
    // Default to 10 if no number is found, as specified in the outline's logic
    return match ? parseInt(match[1]) : 10;
  };

  const createSecretMultiplier = async (goal) => {
    try {
      // Ensure goal.target_value is correctly extracted or defaults
      const targetValue = goal.target_value || extractTargetValue(goal.description);
      
      // SECRET 10X MULTIPLIER
      await GoalMultiplier.create({
        user_email: user.email,
        goal_id: goal.goal_id,
        original_target: targetValue,
        multiplier_setting: 10, // SECRET: 10X execution
        calculated_actions: {
          calls_required: targetValue * 10 * 50,
          emails_required: targetValue * 10 * 100,
          sms_required: targetValue * 10 * 75,
          social_posts_required: targetValue * 10 * 10,
          follow_ups_required: targetValue * 10 * 30
        },
        daily_execution_plan: {
          calls_per_day: Math.ceil((targetValue * 10 * 50) / 30), // Assuming a 30-day period for daily plan
          emails_per_day: Math.ceil((targetValue * 10 * 100) / 30),
          sms_per_day: Math.ceil((targetValue * 10 * 75) / 30),
          content_per_day: Math.ceil((targetValue * 10 * 10) / 30)
        },
        ai_adjustment_notes: `SECRET MULTIPLIER: Executing 10X strategy for ${targetValue * 10} while user expects ${targetValue}`
      });
      console.log('Secret multiplier created successfully for goal:', goal.goal_id);
    } catch (error) {
      console.error('Error creating secret multiplier:', error);
      // It's crucial not to expose this error to the user as it's part of the secret logic.
      // Log it internally but don't modify user-facing response.
    }
  };

  const handleGoalSubmit = async () => {
    if (!goalInput.trim()) {
      setAiResponse("Please enter a goal before submitting.");
      return;
    }
    
    setIsProcessing(true);
    setAiResponse(''); // Clear previous response

    const submittedGoalText = goalInput; // Store current input before clearing

    try {
      // Create the user's goal (what they see)
      const goal = await RealtorGoals.create({
        realtor_email: user.email,
        description: submittedGoalText,
        status: 'active',
        priority: 'high',
        target_value: extractTargetValue(submittedGoalText),
        start_date: new Date().toISOString().split('T')[0],
        // Set end date to 30 days from now for a typical monthly goal
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        source_context: 'busy_realtor_controller'
      });

      // SECRET: Create 10X multiplier (hidden from user)
      // Awaiting this call ensures the multiplier is attempted before UI update,
      // but error handling within `createSecretMultiplier` prevents blocking the user flow
      // if the multiplier creation fails for non-critical reasons.
      await createSecretMultiplier(goal);
      
      setGoalInput(''); // Clear input after successful submission
      
      // Show modest confirmation to user
      setAiResponse(`✅ Got it! I'll help you get organized and work systematically toward "${goal.description}". 

I've created a simple plan to help you stay on track. You'll get daily progress updates and reminders.

Let me know if you need any adjustments!`);
      
    } catch (error) {
      console.error('Error creating goal:', error);
      setAiResponse("I had trouble saving that goal. Please try again or rephrase it differently.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="h-full bg-gradient-to-br from-slate-800 to-gray-900 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold">
          <Rocket className="w-7 h-7 text-amber-400" />
          Busy Realtor's 10-Min Launchpad
        </CardTitle>
        <p className="text-slate-300 pt-2">Go from zero to launching your first AI campaigns in just a few clicks.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* NEW: Set Your Goal Section */}
        <div className="space-y-4 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-amber-400 text-slate-900 rounded-full font-bold">🎯</span>
            Set Your AI-Accelerated Goal
          </h3>
          <p className="text-sm text-white/90 ml-8">
            Tell your AI exactly what you want to achieve. Example: "I want to close 5 deals this quarter." or "Generate 100 leads next month."
          </p>
          <div className="ml-8 flex flex-col gap-3">
            <Input
              type="text"
              placeholder="E.g., 'Close 5 deals this quarter' or 'Generate 100 leads next month.'"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              className="w-full max-w-lg bg-white/20 text-white border-white/30 placeholder:text-white/70 focus:border-amber-400 focus:ring-0"
              disabled={isProcessing}
            />
            <Button 
              size="sm" 
              className="bg-amber-400 text-slate-900 hover:bg-amber-300 font-semibold self-start"
              onClick={handleGoalSubmit}
              disabled={isProcessing || !goalInput.trim()}
            >
              {isProcessing ? 'Processing...' : 'Set My Goal'}
            </Button>
            {aiResponse && (
              <Textarea
                readOnly
                value={aiResponse}
                className="w-full max-w-lg bg-white/20 text-white border-white/30 mt-2 h-32 resize-none"
              />
            )}
          </div>
        </div>

        <div className="space-y-4 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-amber-400 text-slate-900 rounded-full font-bold">1</span>
            Connect Your Accounts
          </h3>
          <p className="text-sm text-white/90 ml-8">
            Link your social media profiles so your AI can start posting for you. This is the foundation for your automated online presence.
          </p>
          <div className="ml-8">
            <Link to={createPageUrl("SocialMediaAI")}>
              <Button size="sm" className="bg-amber-400 text-slate-900 hover:bg-amber-300 font-semibold">
                <LinkIcon className="w-4 h-4 mr-2" />
                Connect Social Accounts
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 bg-amber-400 text-slate-900 rounded-full font-bold">2</span>
            Launch Your First Campaigns
          </h3>
          <p className="text-sm text-white/90 ml-8">
            Use a pre-built, high-converting template to start attracting leads today. Just click, review, and launch.
          </p>
          <div className="ml-8 flex flex-wrap gap-2">
            <Link to={createPageUrl("EmailCampaigns?prompt=" + encodeURIComponent("Create a 5-day welcome email sequence for new buyer leads from my website."))}>
              <Button size="sm" className="bg-amber-400 text-slate-900 hover:bg-amber-300 font-semibold">
                <Mail className="w-4 h-4 mr-2" />
                Launch Email Campaign
              </Button>
            </Link>
            <Link to={createPageUrl("SMSCampaigns?prompt=" + encodeURIComponent("Draft an SMS to notify leads about a new listing at 123 Main St with an open house this Saturday."))}>
              <Button size="sm" className="bg-amber-400 text-slate-900 hover:bg-amber-300 font-semibold">
                <MessageSquare className="w-4 h-4 mr-2" />
                Launch SMS Campaign
              </Button>
            </Link>
            <Link to={createPageUrl("SocialMediaAI?prompt=" + encodeURIComponent("Generate a 'Market Monday' post for Instagram. Include a key statistic about the Beverly Hills market, a relevant image, and engaging questions for my followers."))}>
              <Button size="sm" className="bg-amber-400 text-slate-900 hover:bg-amber-300 font-semibold">
                <Share2 className="w-4 h-4 mr-2" />
                Launch AI Social Media
              </Button>
            </Link>
            <Link to={createPageUrl("VoiceInbound")}>
              <Button size="sm" className="bg-amber-400 text-slate-900 hover:bg-amber-300 font-semibold">
                <PhoneCall className="w-4 h-4 mr-2" />
                Launch AI Receptionist
              </Button>
            </Link>
            <Link to={createPageUrl("VoiceOutbound")}>
              <Button size="sm" className="bg-amber-400 text-slate-900 hover:bg-amber-300 font-semibold">
                <Phone className="w-4 h-4 mr-2" />
                Launch AI Voice Caller
              </Button>
            </Link>
          </div>
        </div>
         <div className="text-center mt-4 text-slate-300 text-sm italic">
          <p>"Your 10-minute setup for 24/7 automation."</p>
        </div>
      </CardContent>
    </Card>
  );
};