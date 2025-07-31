
import React, { useState, useEffect } from "react";
import { Appointment } from "@/api/entities";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar, Plus, Clock, Video, MapPin, User as UserIcon, Link as LinkIcon, Share2
} from "lucide-react";
// Assuming a calendar component exists, like react-big-calendar or a custom one
// For this example, we'll simulate it with a simple list view.

export default function AppointmentsPage() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const [userData, apptData] = await Promise.all([
        User.me(),
        Appointment.list("-appointment_time")
      ]);
      setUser(userData);
      setAppointments(apptData.filter(a => a.realtor_email === userData.email));
    } catch (error) {
      console.error("Error loading appointments:", error);
    }
    setIsLoading(false);
  };

  const statusColors = {
    scheduled: "bg-blue-100 text-blue-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-purple-100 text-purple-800",
    cancelled: "bg-red-100 text-red-800"
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            My Calendar
          </h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <LinkIcon className="w-4 h-4 mr-2" />
              Copy Booking Link
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>Calendar Sync</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4">
                <Button variant="outline">Connect Google Calendar</Button>
                <Button variant="outline">Connect Outlook Calendar</Button>
            </CardContent>
        </Card>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map(appt => (
                  <div key={appt.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-slate-900">{appt.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><UserIcon className="w-4 h-4" /> {appt.contact_name}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {new Date(appt.appointment_time).toLocaleString()}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {appt.location || 'Virtual'}</span>
                      </div>
                    </div>
                    <Badge className={statusColors[appt.status]}>{appt.status}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium">No appointments scheduled.</p>
                <p className="text-sm">Your AI assistant will book appointments here automatically.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
