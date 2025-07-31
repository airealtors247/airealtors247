import React, { useState, useEffect } from "react";
import { PlatformFeedback } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
    Users, 
    MessageSquare, 
    Star, 
    Activity, 
    TrendingUp,
    Twitter // Using Twitter icon for X
} from "lucide-react";

export default function FeedbackDashboard() {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const data = await PlatformFeedback.list("-created_date");
      setFeedback(data);
    } catch (error) {
      console.error("Error loading feedback:", error);
    }
    setIsLoading(false);
  };

  const handleUpdateStatus = async (item, status) => {
    // In a real app, this would update the backend
    console.log(`Updating ${item.id} to ${status}`);
    setFeedback(feedback.map(f => f.id === item.id ? { ...f, status } : f));
  };
  
  const getBadgeColor = (type) => {
    switch(type) {
      case "bug_report": return "bg-red-100 text-red-800";
      case "feature_request": return "bg-blue-100 text-blue-800";
      case "praise": return "bg-green-100 text-green-800";
      default: return "bg-slate-100 text-slate-800";
    }
  }

  if (isLoading) {
    return <div>Loading feedback...</div>;
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <MessageSquare className="w-8 h-8" />
          User Feedback Dashboard (Admin)
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                {feedback.map(item => (
                    <Card key={item.id} className="shadow-md">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{item.page_or_feature}</CardTitle>
                                    <p className="text-sm text-slate-500">{item.user_email}</p>
                                </div>
                                <Badge className={getBadgeColor(item.feedback_type)}>
                                    {item.feedback_type.replace('_', ' ')}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-700 mb-4">{item.feedback_text}</p>
                            {item.star_rating && (
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < item.star_rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`} />
                                    ))}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-between items-center bg-slate-50 p-4">
                            <div className="text-xs text-slate-500">
                                {new Date(item.created_date).toLocaleString()}
                            </div>
                            <div className="flex gap-2">
                                <Button size="sm" variant={item.status === 'under_review' ? 'default' : 'outline'} onClick={() => handleUpdateStatus(item, 'under_review')}>Review</Button>
                                <Button size="sm" variant={item.status === 'completed' ? 'default' : 'outline'} onClick={() => handleUpdateStatus(item, 'completed')}>Complete</Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <div className="space-y-6">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                           <TrendingUp className="w-5 h-5 text-green-600"/>
                           Feedback Stats
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between"><span>Total Feedback:</span><span className="font-bold">{feedback.length}</span></div>
                        <div className="flex justify-between"><span>Praise:</span><span className="font-bold">{feedback.filter(f=>f.feedback_type==='praise').length}</span></div>
                        <div className="flex justify-between"><span>Bugs:</span><span className="font-bold">{feedback.filter(f=>f.feedback_type==='bug_report').length}</span></div>
                        <div className="flex justify-between"><span>Features:</span><span className="font-bold">{feedback.filter(f=>f.feedback_type==='feature_request').length}</span></div>
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                           <Twitter className="w-5 h-5 text-sky-500"/>
                           Track Viral Moments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-slate-600 mb-4">Paste links to positive user posts on X or other platforms. The AI can use this to refine its motivational messaging.</p>
                        <Textarea placeholder="Paste tweet URL here..."/>
                        <Button className="w-full mt-2">Add Viral Post</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}