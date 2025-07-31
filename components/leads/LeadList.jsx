
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Phone, Mail, MapPin, Star, MoreHorizontal, Edit, Eye } from "lucide-react";
import { format } from "date-fns";

export default function LeadList({ leads, onUpdateLead, onEditLead, statusConfig }) {
  const handleStatusChange = (lead, newStatus) => {
    onUpdateLead(lead.id, { status: newStatus });
  };

  if (leads.length === 0) {
    return (
      <Card className="shadow-xl border-0">
        <CardContent className="p-12 text-center">
          <div className="text-slate-400 mb-4">
            <Star className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No leads found</h3>
          <p className="text-slate-600">Try adjusting your search criteria or add new leads</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-xl text-slate-900">All Leads ({leads.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leads.map((lead) => {
            const statusInfo = statusConfig[lead.status] || statusConfig.new;
            const StatusIcon = statusInfo.icon;

            return (
              <Card key={lead.id} className="border border-slate-200 hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                          {lead.first_name?.charAt(0)}{lead.last_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-slate-900">
                            {lead.first_name} {lead.last_name}
                          </h3>
                          {lead.ai_score && (
                            <div className="flex items-center gap-1 text-sm text-amber-600">
                              <Star className="w-4 h-4" />
                              {lead.ai_score}%
                            </div>
                          )}
                          <Badge className={statusInfo.color}>
                            <StatusIcon className={`w-3 h-3 mr-1 ${statusInfo.iconColor}`} />
                            {lead.status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                          {lead.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <span className="truncate">{lead.email}</span>
                            </div>
                          )}
                          {lead.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span>{lead.phone}</span>
                            </div>
                          )}
                          {lead.zip_code && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>ZIP: {lead.zip_code}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm">
                          <Badge variant="outline" className="capitalize">
                            {lead.lead_type}
                          </Badge>
                          <Badge variant="outline">
                            {lead.lead_source}
                          </Badge>
                          {lead.budget_max && (
                            <span className="text-slate-500">
                              Budget: ${lead.budget_max.toLocaleString()}
                            </span>
                          )}
                          {lead.last_contact_date && (
                            <span className="text-slate-500">
                              Last Contact: {format(new Date(lead.last_contact_date), 'MMM d, yyyy')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditLead(lead)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleStatusChange(lead, 'contacted')}>
                            Mark as Contacted
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(lead, 'qualified')}>
                            Mark as Qualified
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(lead, 'appointment')}>
                            Schedule Appointment
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(lead, 'closed')}>
                            Mark as Closed
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {lead.notes && (
                    <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-700">{lead.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
