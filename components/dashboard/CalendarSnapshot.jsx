import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, MapPin } from 'lucide-react';
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function CalendarSnapshot({ appointments }) {
  return (
    <Card className="shadow-lg border-0 h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-500" />
            Upcoming Appointments
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to={createPageUrl('Appointments')}>View All</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {appointments && appointments.length > 0 ? (
          appointments.map(appt => (
            <div key={appt.id} className="p-3 bg-slate-50 rounded-lg border">
              <h4 className="font-semibold text-sm text-slate-900 mb-1">{appt.title}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-1">
                <span className="flex items-center gap-1"><User className="w-3 h-3"/> {appt.contact_name}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3"/> {appt.location}</span>
              </div>
              <Badge variant="secondary" className="mt-2">{new Date(appt.appointment_time).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</Badge>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>No upcoming appointments found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}