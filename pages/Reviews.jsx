import React, { useState, useEffect } from "react";
import { ReviewRequest } from "@/api/entities";
import { User } from "@/api/entities";
import { SendEmail } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Plus,
  Send,
  TrendingUp,
  Users,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  BarChart3
} from "lucide-react";

import ReviewRequestForm from "../components/reviews/ReviewRequestForm";
import ReviewAnalytics from "../components/reviews/ReviewAnalytics";
import ReviewFeedback from "../components/reviews/ReviewFeedback";

export default function ReviewsPage() {
  const [user, setUser] = useState(null);
  const [reviewRequests, setReviewRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadReviewData();
  }, []);

  const loadReviewData = async () => {
    try {
      const [userData, reviewsData] = await Promise.all([
        User.me(),
        ReviewRequest.list("-request_sent_date")
      ]);
      
      setUser(userData);
      setReviewRequests(reviewsData.filter(r => r.realtor_email === userData.email));
    } catch (error) {
      console.error("Error loading review data:", error);
    }
    setIsLoading(false);
  };

  const handleSendReviewRequest = async (requestData) => {
    try {
      // Create unique review link
      const uniqueId = Math.random().toString(36).substring(2, 15);
      const reviewLink = `${window.location.origin}/review/${uniqueId}`;
      
      const reviewRequest = await ReviewRequest.create({
        ...requestData,
        realtor_email: user.email,
        unique_review_link: reviewLink,
        request_sent_date: new Date().toISOString()
      });

      // Send email to client
      const emailContent = `
        Hi ${requestData.client_name},
        
        I hope you're enjoying your new home! It was such a pleasure working with you on ${requestData.property_address || 'your recent transaction'}.
        
        Your experience means the world to me, and I'd be incredibly grateful if you could take just 2 minutes to share your feedback:
        
        ${reviewLink}
        
        Thank you so much for your time!
        
        Best regards,
        ${user.first_name} ${user.last_name}
        ${user.brokerage_name}
        ${user.mobile_phone}
      `;

      await SendEmail({
        to: requestData.client_email,
        subject: `Thank you for choosing ${user.first_name} ${user.last_name} - Quick Feedback Request`,
        body: emailContent,
        from_name: `${user.first_name} ${user.last_name}`
      });

      setShowForm(false);
      loadReviewData();
      alert("Review request sent successfully!");
    } catch (error) {
      console.error("Error sending review request:", error);
      alert("Failed to send review request. Please try again.");
    }
  };

  const calculateStats = () => {
    const total = reviewRequests.length;
    const completed = reviewRequests.filter(r => r.review_submitted).length;
    const fiveStars = reviewRequests.filter(r => r.star_rating === 5).length;
    const googleReviews = reviewRequests.filter(r => r.google_review_posted).length;
    const avgRating = reviewRequests.filter(r => r.star_rating).reduce((sum, r) => sum + r.star_rating, 0) / reviewRequests.filter(r => r.star_rating).length || 0;
    
    return {
      total,
      completed,
      fiveStars,
      googleReviews,
      avgRating: avgRating.toFixed(1),
      responseRate: total > 0 ? ((completed / total) * 100).toFixed(1) : 0
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                Review Management
              </h1>
              <p className="text-slate-600 text-lg">
                Build your online reputation with smart review collection and feedback management
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-500 flex items-center gap-1">
                  <Star className="w-6 h-6 fill-current" />
                  {stats.avgRating}
                </div>
                <div className="text-sm text-slate-500">Average Rating</div>
              </div>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Request Review
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Requests</CardTitle>
              <Send className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
              <p className="text-xs text-slate-500">Review requests sent</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">5-Star Reviews</CardTitle>
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.fiveStars}</div>
              <p className="text-xs text-slate-500">Perfect ratings</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Google Reviews</CardTitle>
              <ExternalLink className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.googleReviews}</div>
              <p className="text-xs text-slate-500">Public reviews</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.responseRate}%</div>
              <p className="text-xs text-slate-500">Client responses</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.avgRating}</div>
              <p className="text-xs text-slate-500">Overall score</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center">
            <TabsList className="grid w-96 grid-cols-3 bg-slate-100">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Requests
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Feedback
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-8">
            <ReviewAnalytics reviewRequests={reviewRequests} />
          </TabsContent>

          <TabsContent value="requests" className="mt-8">
            {showForm ? (
              <ReviewRequestForm
                onSubmit={handleSendReviewRequest}
                onCancel={() => setShowForm(false)}
                user={user}
              />
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-slate-900">Review Requests</h2>
                  <Button onClick={() => setShowForm(true)} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    New Request
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {reviewRequests.map((request) => (
                    <Card key={request.id} className="shadow-md border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900">{request.client_name}</h3>
                              <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                                <div className="flex items-center gap-1">
                                  <Mail className="w-4 h-4" />
                                  {request.client_email}
                                </div>
                                {request.property_address && (
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {request.property_address}
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(request.request_sent_date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {request.star_rating && (
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < request.star_rating
                                        ? 'text-yellow-500 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                                <span className="text-sm font-medium ml-2">{request.star_rating}/5</span>
                              </div>
                            )}
                            
                            {request.review_submitted ? (
                              <Badge className={
                                request.star_rating === 5 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-yellow-100 text-yellow-800"
                              }>
                                {request.redirected_to_google ? 'Sent to Google' : 'Internal Feedback'}
                              </Badge>
                            ) : (
                              <Badge variant="secondary">
                                Pending Response
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {request.review_text && (
                          <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                            <p className="text-sm text-slate-700">"{request.review_text}"</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  
                  {reviewRequests.length === 0 && (
                    <div className="text-center py-12">
                      <Star className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 mb-2">No review requests yet</h3>
                      <p className="text-slate-600 mb-4">Start building your online reputation by requesting client reviews</p>
                      <Button onClick={() => setShowForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Send First Review Request
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="feedback" className="mt-8">
            <ReviewFeedback 
              reviewRequests={reviewRequests.filter(r => r.star_rating < 5 && r.star_rating > 0)} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}