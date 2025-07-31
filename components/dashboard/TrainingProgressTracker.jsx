import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function TrainingProgressTracker({ completed, total }) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          Training Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-3">
          <div className="text-3xl font-bold text-blue-700">{percentage}%</div>
          <p className="text-slate-600 text-sm">{completed} of {total} modules completed</p>
        </div>
        <Progress value={percentage} className="h-2" />
        <Button className="w-full mt-4" variant="outline" asChild>
           <Link to={createPageUrl('University')}>
              <BookOpen className="w-4 h-4 mr-2" />
              Go to University
           </Link>
        </Button>
      </CardContent>
    </Card>
  );
}