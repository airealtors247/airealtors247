import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ModuleCard({ module }) {
    // Dummy progress for visual representation
    const progress = Math.floor(Math.random() * 80) + 10; 

    return (
        <Card className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{module.title}</CardTitle>
                <p className="text-sm text-slate-500 pt-1">{module.description}</p>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center text-sm text-slate-600 mb-2">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>
                <Progress value={progress} />
                 <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5 Lessons</span>
                    <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> 2 Quizzes</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Continue Learning</Button>
            </CardFooter>
        </Card>
    );
}