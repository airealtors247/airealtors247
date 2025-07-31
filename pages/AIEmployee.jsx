
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { User } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  Zap, 
  Clock,
  CheckCircle,
  Calendar,
  Mail,
  Phone,
  FileText,
  Users,
  Settings,
  Play,
  Pause
} from "lucide-react";

export default function AIEmployeePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [taskInput, setTaskInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const prompt = params.get('prompt');
    if (prompt) {
      setTaskInput(decodeURIComponent(prompt));
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

  const handleTaskSubmit = async () => {
    if (!taskInput.trim()) return;
    
    setIsProcessing(true);
    try {
      const response = await InvokeLLM({
        prompt: `As an AI assistant for real estate agent ${user?.full_name}, help with this task: "${taskInput}". Provide a detailed, actionable response that a real estate professional would find valuable.`
      });
      setAiResponse(response);
    } catch (error) {
      console.error("Error processing task:", error);
      setAiResponse("Sorry, I encountered an error processing your request. Please try again.");
    }
    setIsProcessing(false);
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
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                AI Employee - Universal Assistant
              </h1>
              <p className="text-slate-600 text-lg">
                Your 24/7 AI assistant that can handle any real estate task
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                <Zap className="w-3 h-3 mr-1" />
                Always Available
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <Bot className="w-3 h-3 mr-1" />
                AI Powered
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
                  <p className="text-sm text-slate-600">Tasks Completed</p>
                  <p className="text-2xl font-bold text-indigo-600">247</p>
                </div>
                <CheckCircle className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Time Saved</p>
                  <p className="text-2xl font-bold text-green-600">43h</p>
                </div>
                <Clock className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active Tasks</p>
                  <p className="text-2xl font-bold text-purple-600">12</p>
                </div>
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Success Rate</p>
                  <p className="text-2xl font-bold text-amber-600">98%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task Input */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">What can I help you with today?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Type any task here... Examples:
• Write a listing description for a 3BR home in Beverly Hills
• Create a follow-up email sequence for new leads  
• Draft a market analysis report for my clients
• Schedule social media posts for next week
• Research comparable properties in ZIP 90210
• Write a blog post about home staging tips"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                rows={4}
                className="w-full"
              />
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleTaskSubmit}
                  disabled={isProcessing || !taskInput.trim()}
                  className="bg-indigo-600 hover:bg-indigo-700 flex-1"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Execute Task
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
            
            {aiResponse && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">AI Response:</h3>
                <div className="text-blue-800 whitespace-pre-wrap">{aiResponse}</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: FileText, title: "Generate Content", description: "Create listings, emails, posts", color: "text-blue-600" },
                { icon: Mail, title: "Email Tasks", description: "Draft, schedule, follow up", color: "text-green-600" },
                { icon: Calendar, title: "Schedule Management", description: "Book appointments, reminders", color: "text-purple-600" },
                { icon: Users, title: "Lead Management", description: "Follow up, nurture, convert", color: "text-amber-600" }
              ].map((action, index) => (
                <Card key={index} className="border hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <action.icon className={`w-8 h-8 ${action.color} mx-auto mb-3`} />
                    <h3 className="font-semibold text-slate-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-slate-600">{action.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tasks */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  task: "Create listing description for 123 Main St",
                  status: "completed",
                  time: "2 hours ago",
                  category: "content"
                },
                {
                  task: "Send follow-up emails to 15 leads",
                  status: "completed", 
                  time: "4 hours ago",
                  category: "email"
                },
                {
                  task: "Research market data for Beverly Hills",
                  status: "in_progress",
                  time: "6 hours ago",
                  category: "research"
                },
                {
                  task: "Schedule social media posts for next week",
                  status: "completed",
                  time: "1 day ago",
                  category: "social"
                },
                {
                  task: "Create buyer consultation presentation", 
                  status: "pending",
                  time: "1 day ago",
                  category: "content"
                }
              ].map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      task.status === 'completed' ? 'bg-green-100' :
                      task.status === 'in_progress' ? 'bg-blue-100' :
                      'bg-yellow-100'
                    }`}>
                      <Bot className={`w-5 h-5 ${
                        task.status === 'completed' ? 'text-green-600' :
                        task.status === 'in_progress' ? 'text-blue-600' :
                        'text-yellow-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{task.task}</p>
                      <p className="text-sm text-slate-600 capitalize">{task.category} • {task.time}</p>
                    </div>
                  </div>
                  
                  <Badge className={
                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {task.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Capabilities */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>What Your AI Employee Can Do</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Content Creation</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Property listings & descriptions</li>
                  <li>• Marketing emails & newsletters</li>
                  <li>• Social media posts & captions</li>
                  <li>• Blog articles & market reports</li>
                  <li>• Presentation slides & scripts</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Communication</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Follow-up sequences</li>
                  <li>• Appointment scheduling</li>
                  <li>• Lead nurturing campaigns</li>
                  <li>• Client check-ins</li>
                  <li>• Review requests</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Research & Analysis</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Market comparables (CMAs)</li>
                  <li>• Neighborhood analysis</li>
                  <li>• Investment property evaluation</li>
                  <li>• Pricing recommendations</li>
                  <li>• Trend reports & forecasts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
