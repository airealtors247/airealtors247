import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Zap, Circle, RotateCw } from 'lucide-react';

const getStatusIcon = (status) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'in_progress':
    case 'delegated_to_ai':
      return <RotateCw className="w-5 h-5 text-blue-500 animate-spin" />;
    case 'pending':
    default:
      return <Circle className="w-5 h-5 text-slate-400" />;
  }
};

const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case 'delegated_to_ai':
        return <Badge className="bg-purple-100 text-purple-800">AI Executing</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

export default function TodaysActionPlan({ tasks, onUpdateTaskStatus }) {
  const hasTasks = tasks && tasks.length > 0;

  return (
    <Card className="shadow-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <Zap className="w-6 h-6 text-blue-600" />
          Today's Action Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasTasks ? (
           <p className="text-sm text-slate-600">Use the AI Voice Companion to set your priorities for the day!</p>
        ) : (
            <>
                <p className="text-sm text-slate-600 mb-4">Your AI is executing these high-impact actions for you today.</p>
                <div className="space-y-3">
                {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <button onClick={() => onUpdateTaskStatus(task, task.status === 'completed' ? 'pending' : 'completed')}>
                            {getStatusIcon(task.status)}
                        </button>
                        <span className={`font-medium text-slate-800 ${task.status === 'completed' ? 'line-through text-slate-500' : ''}`}>
                            {task.title}
                        </span>
                    </div>
                    {getStatusBadge(task.status)}
                    </div>
                ))}
                </div>
            </>
        )}
      </CardContent>
    </Card>
  );
}