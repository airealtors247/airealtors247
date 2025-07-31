import React, { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { PlatformFeedback } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, MessageSquare, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const StarRating = ({ rating, setRating }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-6 h-6 cursor-pointer transition-all ${
          rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'
        }`}
        onClick={() => setRating(star)}
      />
    ))}
  </div>
);

export default function FeedbackPage() {
  const [user, setUser] = useState(null);
  const [feedbackType, setFeedbackType] = useState('improvement_suggestion');
  const [starRating, setStarRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [pageOrFeature, setPageOrFeature] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await User.me();
      setUser(currentUser);
    };
    fetchUser();
    
    // Try to get page name from URL state or path
    const pageNameFromState = location.state?.fromPage;
    const pageNameFromPath = location.pathname.split('/').pop();
    setPageOrFeature(pageNameFromState || (pageNameFromPath.toLowerCase() !== 'feedback' ? pageNameFromPath : 'General'));

  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText || !user) return;

    setIsSubmitting(true);
    try {
      await PlatformFeedback.create({
        realtor_email: user.email,
        page_or_feature: pageOrFeature,
        feedback_type: feedbackType,
        star_rating: starRating,
        feedback_text: feedbackText,
        urgency: urgency,
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFeedbackText('');
        setStarRating(0);
      }, 3000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-slate-50 to-blue-50 min-h-full">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900">Platform Feedback</h1>
          <p className="text-lg text-slate-600 mt-2">
            Your ideas fuel our evolution. Help us build the ultimate real estate platform.
          </p>
        </header>

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              Submit Your Feedback
            </CardTitle>
            <CardDescription>
              Whether it's a bug, a new idea, or praise, we want to hear it. Every submission is reviewed by our team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-slate-800">Thank You!</h3>
                <p className="text-slate-600">Your feedback has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Feedback Type</label>
                    <Select value={feedbackType} onValueChange={setFeedbackType}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="improvement_suggestion">Improvement Suggestion</SelectItem>
                        <SelectItem value="feature_request">Feature Request</SelectItem>
                        <SelectItem value="bug_report">Bug Report</SelectItem>
                        <SelectItem value="praise">Praise / What I Love</SelectItem>
                        <SelectItem value="general_feedback">General Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Feature/Page</label>
                    <Input 
                      value={pageOrFeature}
                      onChange={(e) => setPageOrFeature(e.target.value)}
                      placeholder="e.g., Dashboard, AI Tools"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">How would you rate this feature?</label>
                  <StarRating rating={starRating} setRating={setStarRating} />
                </div>

                <div className="space-y-2">
                  <label htmlFor="feedback-text" className="block text-sm font-medium text-slate-700">
                    Your Feedback
                  </label>
                  <Textarea
                    id="feedback-text"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Please be as detailed as possible. What's working? What isn't? What could be better?"
                    rows={6}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Urgency</label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Just an idea</SelectItem>
                      <SelectItem value="medium">Medium - Would be nice to have</SelectItem>
                      <SelectItem value="high">High - Important for my workflow</SelectItem>
                      <SelectItem value="critical">Critical - This is blocking me</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-right">
                  <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}