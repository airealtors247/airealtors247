import React, { useState, useEffect } from 'react';
import { PlatformFeedback } from '@/api/entities';
import { User } from '@/api/entities';
import { SendEmail } from '@/api/integrations';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Star,
  MessageSquare,
  Lightbulb,
  Bug,
  ThumbsUp,
  Send,
  Heart,
  Sparkles
} from "lucide-react";

export default function FeedbackSystem({ user }) {
  const [feedbackForm, setFeedbackForm] = useState({
    feedback_type: '',
    star_rating: 0,
    feedback_text: '',
    feature_mentioned: '',
    would_recommend: true,
    contact_for_clarification: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  const handleStarClick = (rating) => {
    setFeedbackForm(prev => ({ ...prev, star_rating: rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const uniqueId = Math.random().toString(36).substring(2, 15);
      const feedbackData = {
        ...feedbackForm,
        realtor_email: user.email,
        unique_feedback_link: `${window.location.origin}/feedback/${uniqueId}`
      };

      // If 5 stars, redirect to Google Reviews
      if (feedbackForm.star_rating === 5) {
        await PlatformFeedback.create({
          ...feedbackData,
          redirected_to_google: true
        });
        
        // Redirect to Google Reviews (replace with actual Google Reviews link)
        window.open('https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review', '_blank');
        
        setShowThanks(true);
      } else if (feedbackForm.star_rating < 5 && feedbackForm.star_rating > 0) {
        // For 4 stars and below, collect improvement feedback
        await PlatformFeedback.create(feedbackData);
        
        // Send internal notification to development team
        await SendEmail({
          to: 'feedback@airealtors247.com',
          subject: `${feedbackForm.star_rating}-Star Feedback from ${user.full_name}`,
          body: `
            Feedback Type: ${feedbackForm.feedback_type}
            Feature: ${feedbackForm.feature_mentioned}
            Rating: ${feedbackForm.star_rating}/5
            
            Feedback:
            ${feedbackForm.feedback_text}
            
            Contact: ${user.email}
          `,
          from_name: 'AIRealtors247 Feedback System'
        });
        
        setShowThanks(true);
      } else {
        await PlatformFeedback.create(feedbackData);
        setShowThanks(true);
      }

      // Reset form
      setFeedbackForm({
        feedback_type: '',
        star_rating: 0,
        feedback_text: '',
        feature_mentioned: '',
        would_recommend: true,
        contact_for_clarification: false
      });

    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }

    setIsSubmitting(false);
  };

  if (showThanks) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center p-8">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h2>
          <p className="text-slate-600 mb-4">
            Your feedback helps us make AIRealtors247 better for everyone.
          </p>
          {feedbackForm.star_rating === 5 ? (
            <p className="text-green-600 font-medium">
              🌟 Your 5-star review means the world to us!
            </p>
          ) : (
            <p className="text-blue-600 font-medium">
              We'll review your suggestions and work on improvements.
            </p>
          )}
          <Button 
            onClick={() => setShowThanks(false)} 
            className="mt-4"
          >
            Submit More Feedback
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Help Us Improve</h1>
        <p className="text-slate-600">
          Your feedback drives our development. Tell us what's working and what we can improve.
        </p>
      </div>

      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-blue-600" />
            Share Your Experience
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div className="text-center">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                How would you rate AIRealtors247 overall?
              </label>
              <div className="flex justify-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className="transition-all duration-200"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= feedbackForm.star_rating
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300 hover:text-yellow-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-slate-500">
                {feedbackForm.star_rating === 5 && "Excellent! You'll be redirected to leave a Google review."}
                {feedbackForm.star_rating === 4 && "Great! Help us reach 5 stars - what can we improve?"}
                {feedbackForm.star_rating < 4 && feedbackForm.star_rating > 0 && "We want to do better! Please share specific feedback."}
              </p>
            </div>

            {/* Feedback Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What type of feedback is this?
              </label>
              <Select
                value={feedbackForm.feedback_type}
                onValueChange={(value) => setFeedbackForm(prev => ({ ...prev, feedback_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature_request">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Feature Request
                    </div>
                  </SelectItem>
                  <SelectItem value="bug_report">
                    <div className="flex items-center gap-2">
                      <Bug className="w-4 h-4" />
                      Bug Report
                    </div>
                  </SelectItem>
                  <SelectItem value="improvement_suggestion">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      Improvement Suggestion
                    </div>
                  </SelectItem>
                  <SelectItem value="general_feedback">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      General Feedback
                    </div>
                  </SelectItem>
                  <SelectItem value="review">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Platform Review
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Feature Mentioned */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Which feature does this relate to? (Optional)
              </label>
              <Input
                placeholder="e.g., Lead Generation, Social Media Autopilot, etc."
                value={feedbackForm.feature_mentioned}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, feature_mentioned: e.target.value }))}
              />
            </div>

            {/* Detailed Feedback */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tell us more
              </label>
              <Textarea
                placeholder="Share your thoughts, suggestions, or describe any issues..."
                rows={5}
                value={feedbackForm.feedback_text}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, feedback_text: e.target.value }))}
                required
              />
            </div>

            {/* Contact Permission */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="contact_permission"
                checked={feedbackForm.contact_for_clarification}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, contact_for_clarification: e.target.checked }))}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="contact_permission" className="text-sm text-slate-700">
                You may contact me for clarification or updates on this feedback
              </label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !feedbackForm.feedback_text}
              className="w-full bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Feature Request Board */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">🚀 Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 mb-4">
            Based on your feedback, here are features we're actively developing:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg">
              <Badge className="bg-green-100 text-green-800 mb-2">In Development</Badge>
              <p className="text-sm font-medium">Advanced Mobile App</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <Badge className="bg-yellow-100 text-yellow-800 mb-2">Planning</Badge>
              <p className="text-sm font-medium">MLS Integration</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <Badge className="bg-blue-100 text-blue-800 mb-2">Requested</Badge>
              <p className="text-sm font-medium">Voice Command Enhancements</p>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <Badge className="bg-purple-100 text-purple-800 mb-2">Research</Badge>
              <p className="text-sm font-medium">AR Property Tours</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}