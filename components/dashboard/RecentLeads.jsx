import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Users, Phone, Mail, MapPin, ArrowRight, Star } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  contacted: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  qualified: "bg-green-100 text-green-800 border-green-200",
  appointment: "bg-purple-100 text-purple-800 border-purple-200",
  under_contract: "bg-indigo-100 text-indigo-800 border-indigo-200",
  closed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  lost: "bg-red-100 text-red-800 border-red-200"
};

export default function RecentLeads({ leads }) {
  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-md flex items-center justify-center">
            <Users className="w-3 h-3 text-white" />
          </div>
          Recent Leads
        </CardTitle>
        <Button variant="outline" asChild size="sm">
          <Link to={createPageUrl("Leads")}>
            View All
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {leads.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium mb-2">No leads yet</p>
            <p className="text-sm">Start generating leads with our AI tools</p>
            <Button asChild className="mt-4" size="sm">
              <Link to={createPageUrl("AITools")}>Generate First Lead</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors duration-200 border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {lead.first_name?.charAt(0) || 'L'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      {lead.first_name} {lead.last_name}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      {lead.email && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </div>
                      )}
                      {lead.phone && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Phone className="w-3 h-3" />
                          {lead.phone}
                        </div>
                      )}
                      {lead.zip_code && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" />
                          {lead.zip_code}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {lead.ai_score && (
                    <div className="flex items-center gap-1 text-xs text-amber-600">
                      <Star className="w-3 h-3" />
                      {lead.ai_score}%
                    </div>
                  )}
                  <Badge className={statusColors[lead.status] || statusColors.new}>
                    {lead.status?.replace('_', ' ')}
                  </Badge>
                  <span className="text-xs text-slate-400">
                    {format(new Date(lead.created_date), 'MMM d')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}