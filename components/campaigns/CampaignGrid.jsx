import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  Edit, 
  BarChart3, 
  Users, 
  DollarSign,
  Calendar,
  Target
} from "lucide-react";

export default function CampaignGrid({ 
  campaigns, 
  statusConfig, 
  campaignTypes, 
  onEdit, 
  onStatusChange 
}) {
  if (campaigns.length === 0) {
    return (
      <Card className="shadow-xl border-0">
        <CardContent className="p-12 text-center">
          <Target className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No campaigns yet</h3>
          <p className="text-slate-600 mb-4">Create your first marketing campaign to start generating leads</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => {
        const statusInfo = statusConfig[campaign.status];
        const typeInfo = campaignTypes[campaign.type];
        const StatusIcon = statusInfo?.icon || Target;
        const TypeIcon = typeInfo?.icon || Target;

        return (
          <Card key={campaign.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <TypeIcon className={`w-5 h-5 ${typeInfo?.color || 'text-slate-600'}`} />
                  <CardTitle className="text-lg text-slate-900">{campaign.name}</CardTitle>
                </div>
                <Badge className={statusInfo?.color || 'bg-gray-100 text-gray-800'}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {statusInfo?.label || campaign.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-bold text-slate-900">
                    {campaign.metrics?.leads_generated || 0}
                  </div>
                  <div className="text-sm text-slate-500">Leads</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="text-lg font-bold text-slate-900">
                    {campaign.metrics?.conversion_rate || 0}%
                  </div>
                  <div className="text-sm text-slate-500">Conversion</div>
                </div>
              </div>

              {campaign.budget && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <DollarSign className="w-4 h-4" />
                  <span>Budget: ${campaign.budget.toLocaleString()}</span>
                </div>
              )}

              {campaign.schedule_start && (
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>Started: {new Date(campaign.schedule_start).toLocaleDateString()}</span>
                </div>
              )}

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onEdit(campaign)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                
                {campaign.status === 'active' ? (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onStatusChange(campaign, 'paused')}
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onStatusChange(campaign, 'active')}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}