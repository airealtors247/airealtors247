import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Zap, 
  CheckCircle,
  Eye,
  MousePointer,
  Users,
  TrendingUp,
  Sparkles,
  Share2,
  AlertTriangle
} from 'lucide-react';
import { InvokeLLM } from "@/api/integrations";

export default function SocialMediaBlaster({ user, onComplete }) {
  const [step, setStep] = useState(1);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [aiPost, setAiPost] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [postResults, setPostResults] = useState(null);
  const [autoBlastEnabled, setAutoBlastEnabled] = useState(false);

  const socialPlatforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600',
      description: 'Share with your personal network',
      connected: false,
      followers: 0
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700',
      description: 'Professional network reach',
      connected: false,
      followers: 0
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-600',
      description: 'Visual storytelling platform',
      connected: false,
      followers: 0
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: Twitter,
      color: 'bg-black',
      description: 'Real-time updates & networking',
      connected: false,
      followers: 0
    }
  ];

  useEffect(() => {
    // Load user's connected social accounts
    loadConnectedAccounts();
  }, []);

  const loadConnectedAccounts = async () => {
    // In real implementation, fetch from SocialAccountConnection entity
    // For now, simulate some connections
    setConnectedAccounts([
      { platform: 'facebook', connected: true, followers: 847 },
      { platform: 'linkedin', connected: true, followers: 1203 }
    ]);
  };

  const generateAIPost = async () => {
    setIsGenerating(true);
    try {
      const prompt = `Write a compelling social media post for a real estate agent named ${user.full_name} who just joined AI Realtors 247. 

The post should:
- Promote their real estate business
- Mention they're using AI to grow faster
- Invite their network to join AI Realtors 247
- Include their referral link: https://airealtors247.com/invite/${user.email.split('@')[0]}
- Sound authentic and exciting
- Use relevant emojis
- Keep it under 200 words

Make it sound like a successful realtor sharing an exciting breakthrough, not a sales pitch.`;

      const response = await InvokeLLM({
        prompt: prompt
      });

      setAiPost(response);
    } catch (error) {
      console.error('Error generating post:', error);
      setAiPost('🚨 Just launched something HUGE for my real estate business!\n\nI\'m now using AI to get daily leads, book appointments, and grow faster than ever. 📊 All automated with AI Realtors 247!\n\nIf you\'re in real estate and want this too, join me:\n👉 https://airealtors247.com/invite/' + user.email.split('@')[0] + '\n\nLet\'s crush it together! 🔥');
    }
    setIsGenerating(false);
  };

  const connectSocialAccount = async (platform) => {
    // In real implementation, this would open OAuth flow
    alert(`Opening ${platform} connection... (OAuth flow would happen here)`);
    
    // Simulate connection
    setConnectedAccounts(prev => [
      ...prev.filter(acc => acc.platform !== platform),
      { platform, connected: true, followers: Math.floor(Math.random() * 2000) + 500 }
    ]);
  };

  const postToSocialMedia = async () => {
    setIsPosting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      const mockResults = {
        platforms_posted: connectedAccounts.filter(acc => acc.connected).map(acc => acc.platform),
        total_reach: connectedAccounts.reduce((sum, acc) => sum + acc.followers, 0),
        estimated_views: Math.floor(Math.random() * 1000) + 500,
        post_id: 'post_' + Date.now()
      };
      
      setPostResults(mockResults);
      setIsPosting(false);
      setStep(3);
    }, 2000);
  };

  if (step === 1) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-slate-900 mb-2">
            🚀 Phase 2: Auto-Blast to Social Media
          </CardTitle>
          <p className="text-lg text-slate-600">
            Connect your social accounts and let AI promote your services with zero effort
          </p>
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-4 mt-4">
            <p className="text-purple-800 font-semibold">
              💰 <strong>Earn 100 credits</strong> for every referral who upgrades to a paid plan!
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {socialPlatforms.map((platform) => {
              const isConnected = connectedAccounts.find(acc => acc.platform === platform.id)?.connected;
              const followers = connectedAccounts.find(acc => acc.platform === platform.id)?.followers || 0;
              
              return (
                <Card 
                  key={platform.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    isConnected ? 'bg-green-50 border-green-200' : 'hover:bg-slate-50'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center`}>
                          <platform.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{platform.name}</h3>
                          <p className="text-sm text-slate-600">{platform.description}</p>
                        </div>
                      </div>
                      {isConnected ? (
                        <Badge className="bg-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => connectSocialAccount(platform.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                    
                    {isConnected && (
                      <div className="bg-white rounded-lg p-3 border">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">Followers/Connections:</span>
                          <span className="font-bold text-slate-900">{followers.toLocaleString()}</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {connectedAccounts.filter(acc => acc.connected).length > 0 && (
            <div className="text-center pt-6 border-t">
              <Button 
                onClick={() => setStep(2)}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate AI Post
              </Button>
            </div>
          )}
          
          {connectedAccounts.filter(acc => acc.connected).length === 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Connect at least one social media account to continue with your viral referral campaign.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    );
  }

  if (step === 2) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-900">
            AI-Generated Referral Post
          </CardTitle>
          <p className="text-slate-600">Review and customize your viral post before sharing</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">📊 Estimated Reach</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-900">
                  {connectedAccounts.reduce((sum, acc) => sum + acc.followers, 0).toLocaleString()}
                </div>
                <p className="text-sm text-blue-700">Total Followers</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-900">
                  {Math.floor(connectedAccounts.reduce((sum, acc) => sum + acc.followers, 0) * 0.1).toLocaleString()}
                </div>
                <p className="text-sm text-green-700">Est. Views</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-900">
                  {Math.floor(connectedAccounts.reduce((sum, acc) => sum + acc.followers, 0) * 0.01).toLocaleString()}
                </div>
                <p className="text-sm text-purple-700">Potential Clicks</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-slate-900">Your AI-Generated Post:</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={generateAIPost}
                disabled={isGenerating}
              >
                {isGenerating ? 'Regenerating...' : 'Regenerate'}
              </Button>
            </div>
            
            <Textarea
              value={aiPost}
              onChange={(e) => setAiPost(e.target.value)}
              rows={8}
              className="font-mono text-sm"
              placeholder="AI post will appear here..."
            />
            
            {!aiPost && (
              <div className="text-center py-4">
                <Button 
                  onClick={generateAIPost}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating AI Post...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate AI Post
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-green-900">Enable Auto-Blast</h3>
              <Switch 
                checked={autoBlastEnabled}
                onCheckedChange={setAutoBlastEnabled}
              />
            </div>
            <p className="text-sm text-green-800">
              Automatically post similar referral content weekly to maintain viral growth
            </p>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-slate-600">
              Will post to: {connectedAccounts.filter(acc => acc.connected).map(acc => acc.platform).join(', ')}
            </p>
            
            <Button 
              onClick={postToSocialMedia}
              disabled={!aiPost || isPosting}
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              {isPosting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Posting to Social Media...
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5 mr-2" />
                  Post & Start Earning Credits
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 3 && postResults) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-900">
            🎉 Post Shared Successfully!
          </CardTitle>
          <p className="text-lg text-slate-600">
            Your viral referral campaign is now live across social media
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{postResults.total_reach.toLocaleString()}</div>
              <p className="text-sm text-blue-700">Total Reach</p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <MousePointer className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">{postResults.estimated_views.toLocaleString()}</div>
              <p className="text-sm text-green-700">Est. Views</p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">{postResults.platforms_posted.length}</div>
              <p className="text-sm text-purple-700">Platforms</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-900 mb-3">💰 Credit Tracking Active</h3>
            <p className="text-yellow-800 mb-3">
              We're now tracking all clicks and signups from your social posts. You'll earn:
            </p>
            <ul className="text-sm space-y-1 text-yellow-800">
              <li>✓ <strong>100 credits</strong> for each referral who upgrades to a paid plan</li>
              <li>✓ <strong>+250 bonus credits</strong> if your post generates 10+ paid signups</li>
              <li>✓ Real-time notifications when you earn credits</li>
            </ul>
          </div>

          {autoBlastEnabled && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-2">🔄 Auto-Blast Enabled</h3>
              <p className="text-purple-800">
                AI will automatically create and post similar content weekly to maximize your referral earnings.
              </p>
            </div>
          )}

          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">What's Next?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 rounded-lg p-4">
                <TrendingUp className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="font-medium">Monitor Performance</p>
                <p className="text-slate-600">Track clicks, signups & credits earned</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <Zap className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="font-medium">Use Your Credits</p>
                <p className="text-slate-600">Start using AI tools with your credits</p>
              </div>
            </div>

            <Button 
              onClick={onComplete}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              View Referral Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}