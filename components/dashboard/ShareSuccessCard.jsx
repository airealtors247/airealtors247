
import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Facebook, Copy, PartyPopper, Video } from 'lucide-react';

const ShareSuccessCard = ({ viralMoment }) => {

  const shareTemplates = [
    {
      platform: "Twitter",
      icon: Twitter,
      text: `This AI app is wild. I asked it to help me get ${viralMoment.expected} leads. I woke up to ${viralMoment.delivered}. I don't understand how, but I'm not complaining! #AIRealtors247 #RealEstateTech`,
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      platform: "LinkedIn",
      icon: Linkedin,
      text: `As a real estate professional, efficiency is everything. I've been testing a new AI assistant that promised to help with organization. The results have been genuinely shocking. My initial goal was ${viralMoment.expected} qualified leads this month. The system has already delivered ${viralMoment.delivered}. This is a paradigm shift for solo agents and small teams. Highly recommend checking out #AIRealtors247. #PropTech #AIinRealEstate`,
      color: "bg-blue-700 hover:bg-blue-800"
    },
    {
      platform: "Facebook",
      icon: Facebook,
      text: `To all my fellow realtors juggling a million things: you have to see this. I started using this simple AI assistant, AIRealtors247, just to help me stay on top of follow-ups. I set a small goal of ${viralMoment.expected} new leads. Woke up this morning and the AI has already generated ${viralMoment.delivered}! It's like having a secret marketing team working for you overnight. Feeling so relieved and excited!`,
      color: "bg-blue-800 hover:bg-blue-900"
    }
  ];

  const handleShare = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard! Ready to paste and share.');
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-red-100 border-purple-200 shadow-xl mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-purple-900">
          <PartyPopper className="w-6 h-6 animate-bounce" />
          Looks Like Something Great Happened!
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-purple-800">Your results are far better than expected. Others in the industry would be inspired by your success. Consider sharing your story!</p>
        
        {/* NEW: Viral Video Generator CTA */}
        <Link to={createPageUrl('AIVideoGenerator')} state={{ viralMoment: viralMoment }}>
          <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg py-6 mb-4 shadow-lg hover:shadow-xl transition-shadow">
            <Video className="w-6 h-6 mr-3" />
            Create a 30-Second "Success Story" Video!
          </Button>
        </Link>

        <div className="space-y-3">
          {shareTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div key={template.platform} className="p-3 bg-white/60 rounded-lg">
                <p className="text-sm text-slate-700 mb-2 italic">"{template.text}"</p>
                <Button 
                  className={`${template.color} text-white w-full`}
                  onClick={() => handleShare(template.text)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  Copy Text for {template.platform}
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareSuccessCard;
