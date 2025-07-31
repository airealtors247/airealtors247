import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, BarChart3, MessageSquare, ExternalLink } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { format, parseISO } from 'date-fns';

const COLORS = ['#8884d8', '#82ca9d'];

export default function ReviewAnalytics({ reviewRequests }) {
  const processData = () => {
    if (!reviewRequests || reviewRequests.length === 0) {
      return {
        ratingDistribution: [],
        reviewsOverTime: [],
        reviewSource: [],
        avgResponseTime: 0,
      };
    }

    // Rating Distribution
    const ratings = [1, 2, 3, 4, 5];
    const ratingDistribution = ratings.map(star => ({
      name: `${star} Star`,
      count: reviewRequests.filter(r => r.star_rating === star).length,
    }));

    // Reviews Over Time
    const reviewsByMonth = reviewRequests.reduce((acc, review) => {
      if (review.review_submitted) {
        const month = format(parseISO(review.request_sent_date), 'MMM yyyy');
        if (!acc[month]) {
          acc[month] = { count: 0, totalRating: 0 };
        }
        acc[month].count += 1;
        acc[month].totalRating += review.star_rating;
      }
      return acc;
    }, {});
    
    const reviewsOverTime = Object.keys(reviewsByMonth).map(month => ({
      name: month,
      reviews: reviewsByMonth[month].count,
      avgRating: (reviewsByMonth[month].totalRating / reviewsByMonth[month].count).toFixed(1)
    })).sort((a,b) => new Date(a.name) - new Date(b.name));

    // Review Source (Google vs Internal)
    const googleReviews = reviewRequests.filter(r => r.redirected_to_google && r.review_submitted).length;
    const internalFeedback = reviewRequests.filter(r => !r.redirected_to_google && r.review_submitted).length;
    const reviewSource = [
        { name: 'Google Reviews', value: googleReviews },
        { name: 'Internal Feedback', value: internalFeedback }
    ];

    return { ratingDistribution, reviewsOverTime, reviewSource };
  };
  
  const { ratingDistribution, reviewsOverTime, reviewSource } = processData();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Rating Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ratingDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Number of Reviews" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Reviews Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reviewsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="reviews" stroke="#82ca9d" name="Total Reviews" />
              <Line type="monotone" dataKey="avgRating" stroke="#ffc658" name="Avg Rating" yAxisId="right" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-purple-600" />
            Review Source Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
             <PieChart>
              <Pie
                data={reviewSource}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {reviewSource.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

       <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-yellow-600" />
            Recent Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reviewRequests
            .filter(r => r.review_text)
            .slice(0, 3)
            .map(review => (
              <div key={review.id} className="p-3 bg-slate-50 rounded-lg border text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex items-center">
                    {[...Array(review.star_rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                   <Badge variant="secondary">{review.client_name}</Badge>
                </div>
                <p className="text-slate-700 italic">"{review.review_text}"</p>
              </div>
            ))}
            {reviewRequests.filter(r => r.review_text).length === 0 && (
                <p className="text-center text-slate-500 pt-8">No written feedback received yet.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}