
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Mail, MapPin, Star, Calendar, Edit } from "lucide-react";
import { format } from "date-fns";

const statusColumns = [
  { id: 'new', title: 'New Leads', color: 'bg-blue-50 border-blue-200', badgeColor: 'bg-blue-100 text-blue-800' },
  { id: 'contacted', title: 'Contacted', color: 'bg-yellow-50 border-yellow-200', badgeColor: 'bg-yellow-100 text-yellow-800' },
  { id: 'qualified', title: 'Qualified', color: 'bg-green-50 border-green-200', badgeColor: 'bg-green-100 text-green-800' },
  { id: 'appointment', title: 'Appointment', color: 'bg-purple-50 border-purple-200', badgeColor: 'bg-purple-100 text-purple-800' },
  { id: 'under_contract', title: 'Under Contract', color: 'bg-indigo-50 border-indigo-200', badgeColor: 'bg-indigo-100 text-indigo-800' },
  { id: 'closed', title: 'Closed', color: 'bg-emerald-50 border-emerald-200', badgeColor: 'bg-emerald-100 text-emerald-800' }
];

export default function LeadKanban({ leads, onUpdateLead, onEditLead, statusConfig }) {
  const handleStatusChange = (lead, newStatus) => {
    onUpdateLead(lead.id, { status: newStatus });
  };

  const getLeadsByStatus = (status) => {
    return leads.filter(lead => lead.status === status);
  };

  const LeadCard = ({ lead }) => (
    <Card className="mb-3 border hover:shadow-md transition-shadow duration-200 cursor-move">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                {lead.first_name?.charAt(0)}{lead.last_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-sm text-slate-900">
                {lead.first_name} {lead.last_name}
              </h4>
              <p className="text-xs text-slate-500 capitalize">{lead.lead_type}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {lead.ai_score && (
              <div className="flex items-center gap-1 text-xs text-amber-600">
                <Star className="w-3 h-3" />
                {lead.ai_score}%
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditLead(lead)}
              className="w-6 h-6 p-0"
            >
              <Edit className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="space-y-2 mb-3">
          {lead.email && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Mail className="w-3 h-3" />
              <span className="truncate">{lead.email}</span>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Phone className="w-3 h-3" />
              <span>{lead.phone}</span>
            </div>
          )}
          {lead.zip_code && (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <MapPin className="w-3 h-3" />
              <span>ZIP: {lead.zip_code}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {lead.lead_source}
          </Badge>
          {lead.budget_max && (
            <span className="text-xs text-slate-500">
              ${lead.budget_max.toLocaleString()}
            </span>
          )}
        </div>

        {lead.last_contact_date && (
          <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
            <Calendar className="w-3 h-3" />
            <span>Last: {format(new Date(lead.last_contact_date), 'MMM d')}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 h-full">
      {statusColumns.map((column) => {
        const columnLeads = getLeadsByStatus(column.id);
        
        return (
          <div key={column.id} className={`rounded-lg border-2 ${column.color} p-4 min-h-96`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">{column.title}</h3>
              <Badge className={`${column.badgeColor} text-xs`}>
                {columnLeads.length}
              </Badge>
            </div>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {columnLeads.map((lead) => (
                <div key={lead.id}>
                  <LeadCard lead={lead} />
                </div>
              ))}
              
              {columnLeads.length === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <p className="text-sm">No leads in this stage</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
