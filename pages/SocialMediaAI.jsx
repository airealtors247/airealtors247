
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Share2, 
  Calendar, 
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Settings,
  Play,
  Pause,
  Image,
  Video,
  Edit,
  Sparkles
} from "lucide-react";

export default function SocialMediaAIPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [autoPostEnabled, setAutoPostEnabled] = useState(true);
  const [postIdea, setPostIdea] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const prompt = params.get('prompt');
    if (prompt) {
      setPostIdea(decodeURIComponent(prompt));
    }
    loadUser();
  }, [location.search]);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                Social Media AI
              </h1>
              <p className="text-slate-600 text-lg">
                AI creates and posts engaging content automatically across all platforms
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                <Play className="w-3 h-3 mr-1" />
                Auto-Posting Active
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <Calendar className="w-3 h-3 mr-1" />
                12 posts scheduled
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Posts This Week</p>
                  <p className="text-2xl font-bold text-purple-600">28</p>
                </div>
                <Share2 className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Reach</p>
                  <p className="text-2xl font-bold text-blue-600">12.4K</p>
                </div>
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Engagement</p>
                  <p className="text-2xl font-bold text-green-600">8.7%</p>
                </div>
                <Heart className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Leads Generated</p>
                  <p className="text-2xl font-bold text-amber-600">47</p>
                </div>
                <TrendingUp className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Controls */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">AI Posting Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">Auto-Posting</h3>
                    <p className="text-sm text-slate-600">AI creates and posts content automatically</p>
                  </div>
                  <Switch 
                    checked={autoPostEnabled}
                    onCheckedChange={setAutoPostEnabled}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Posts Per Day Per Platform</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>2 posts per day (Recommended)</option>
                    <option>1 post per day</option>
                    <option>3 posts per day</option>
                    <option>Custom schedule</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Content Focus</label>
                  <div className="space-y-2">
                    {[
                      'Market insights & tips',
                      'New listings & properties',
                      'Client testimonials',
                      'Local community highlights',
                      'Educational real estate content',
                      'Personal brand building'
                    ].map((focus, index) => (
                      <label key={index} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">{focus}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Connected Platforms</h3>
                  <div className="space-y-3">
                    {[
                      { name: 'Facebook', color: 'bg-blue-600', connected: true },
                      { name: 'Instagram', color: 'bg-pink-600', connected: true },
                      { name: 'LinkedIn', color: 'bg-blue-700', connected: false },
                      { name: 'Twitter/X', color: 'bg-black', connected: false },
                      { name: 'TikTok', color: 'bg-red-600', connected: false }
                    ].map((platform, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 ${platform.color} rounded flex items-center justify-center text-white text-xs font-bold`}>
                            {platform.name.charAt(0)}
                          </div>
                          <span className="font-medium">{platform.name}</span>
                        </div>
                        {platform.connected ? (
                          <Badge className="bg-green-100 text-green-800">Connected</Badge>
                        ) : (
                          <Button size="sm" variant="outline">Connect</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Advanced Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generate Post On Demand */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-purple-600" /> Generate a Post on Demand</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 mb-4">Need a specific post right now? Type your idea below and let the AI craft it for you. It will be added to your content queue for review.</p>
            <Textarea 
              value={postIdea}
              onChange={(e) => setPostIdea(e.target.value)}
              placeholder="e.g., A post about the benefits of getting pre-approved for a mortgage."
              rows={4}
              className="mb-4"
            />
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate & Add to Queue
            </Button>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Recent AI-Generated Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  platform: 'Facebook',
                  content: '🏡 Market Monday! Did you know homes in Beverly Hills are selling 15% faster this month? Perfect time for sellers to make their move! #RealEstate #BeverlyHills',
                  engagement: { likes: 24, comments: 8, shares: 3 },
                  time: '2 hours ago',
                  type: 'text'
                },
                {
                  platform: 'Instagram',
                  content: 'Just listed! Stunning 4BR/3BA modern home with canyon views. Open house this Saturday 2-4 PM! 📍 Hollywood Hills',
                  engagement: { likes: 67, comments: 12, shares: 5 },
                  time: '4 hours ago',
                  type: 'image'
                },
                {
                  platform: 'LinkedIn',
                  content: 'First-time homebuyer tip: Get pre-approved before you start shopping! It shows sellers you\'re serious and gives you negotiating power.',
                  engagement: { likes: 31, comments: 6, shares: 8 },
                  time: '6 hours ago',
                  type: 'text'
                }
              ].map((post, index) => (
                <Card key={index} className="border hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline">{post.platform}</Badge>
                      {post.type === 'image' && <Image className="w-4 h-4 text-slate-400" />}
                      {post.type === 'video' && <Video className="w-4 h-4 text-slate-400" />}
                    </div>
                    
                    <p className="text-sm text-slate-700 mb-4 leading-relaxed">{post.content}</p>
                    
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span>{post.time}</span>
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {post.engagement.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" /> {post.engagement.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-3 h-3" /> {post.engagement.shares}
                        </span>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="w-full">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit Post
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Calendar */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>This Week's Content Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="text-center">
                  <h3 className="font-semibold text-slate-900 mb-3">{day}</h3>
                  <div className="space-y-2">
                    {index < 5 && (
                      <>
                        <div className="bg-blue-50 p-2 rounded text-xs">
                          <div className="font-medium">9:00 AM</div>
                          <div className="text-slate-600">Market tip</div>
                        </div>
                        <div className="bg-purple-50 p-2 rounded text-xs">
                          <div className="font-medium">2:00 PM</div>
                          <div className="text-slate-600">Listing post</div>
                        </div>
                      </>
                    )}
                    {index >= 5 && (
                      <div className="bg-green-50 p-2 rounded text-xs">
                        <div className="font-medium">11:00 AM</div>
                        <div className="text-slate-600">Open house</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
