import React, { useState, useEffect } from "react";
import { EmailSequence } from "@/api/entities";
import { User } from "@/api/entities";
import { InvokeLLM } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Plus,
  Calendar,
  Users,
  TrendingUp,
  Sparkles,
  Play,
  Pause,
  Edit,
  Eye,
  Heart,
  Gift,
  Snowflake,
  Sun,
  MapPin
} from "lucide-react";

import EmailSequenceForm from "../components/email/EmailSequenceForm";
import EmailSequenceCard from "../components/email/EmailSequenceCard";
import SmartEmailGenerator from "../components/email/SmartEmailGenerator";

export default function EmailSequencesPage() {
  const [user, setUser] = useState(null);
  const [sequences, setSequences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSequence, setEditingSequence] = useState(null);
  const [activeTab, setActiveTab] = useState("my_sequences");

  useEffect(() => {
    loadSequences();
  }, []);

  const loadSequences = async () => {
    try {
      const [userData, sequencesData] = await Promise.all([
        User.me(),
        EmailSequence.list("-created_date")
      ]);
      
      setUser(userData);
      setSequences(sequencesData);
    } catch (error) {
      console.error("Error loading sequences:", error);
    }
    setIsLoading(false);
  };

  const handleCreateSequence = async (sequenceData) => {
    try {
      await EmailSequence.create({
        ...sequenceData,
        realtor_email: user.email
      });
      setShowForm(false);
      setEditingSequence(null);
      loadSequences();
    } catch (error) {
      console.error("Error creating sequence:", error);
    }
  };

  const handleEditSequence = (sequence) => {
    setEditingSequence(sequence);
    setShowForm(true);
  };

  const mySequences = sequences.filter(seq => seq.realtor_email === user?.email);
  const activeSequences = mySequences.filter(seq => seq.status === 'active');
  const scheduledSequences = mySequences.filter(seq => seq.status === 'scheduled');

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
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Mail className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Email Sequences</h1>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            New Sequence
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sequences</CardTitle>
              <Play className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSequences.length}</div>
              <p className="text-xs text-muted-foreground">Running now</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduledSequences.length}</div>
              <p className="text-xs text-muted-foreground">Ready to send</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sequences</CardTitle>
              <Mail className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mySequences.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="my_sequences">
              My Sequences ({mySequences.length})
            </TabsTrigger>
            <TabsTrigger value="smart_generator">
              <Sparkles className="w-4 h-4 mr-2" />
              Smart Generator
            </TabsTrigger>
            <TabsTrigger value="templates">
              <Gift className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my_sequences" className="mt-6">
            {showForm ? (
              <EmailSequenceForm
                sequence={editingSequence}
                user={user}
                onSubmit={handleCreateSequence}
                onCancel={() => {
                  setShowForm(false);
                  setEditingSequence(null);
                }}
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mySequences.map((sequence) => (
                  <EmailSequenceCard
                    key={sequence.id}
                    sequence={sequence}
                    onEdit={handleEditSequence}
                  />
                ))}
                {mySequences.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No email sequences yet</h3>
                    <p className="text-gray-500 mb-4">Create your first automated email sequence</p>
                    <Button onClick={() => setShowForm(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create First Sequence
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="smart_generator" className="mt-6">
            <SmartEmailGenerator user={user} onSequenceCreated={loadSequences} />
          </TabsContent>

          <TabsContent value="templates" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { type: "holiday", title: "Holiday Greetings", icon: Gift, color: "bg-red-100 text-red-800" },
                { type: "seasonal", title: "Seasonal Updates", icon: Sun, color: "bg-yellow-100 text-yellow-800" },
                { type: "market_update", title: "Market Reports", icon: TrendingUp, color: "bg-blue-100 text-blue-800" },
                { type: "nurture", title: "Client Nurture", icon: Heart, color: "bg-pink-100 text-pink-800" },
                { type: "follow_up", title: "Follow-Up Series", icon: Mail, color: "bg-green-100 text-green-800" },
                { type: "birthday", title: "Birthday Wishes", icon: Gift, color: "bg-purple-100 text-purple-800" }
              ].map((template) => (
                <Card key={template.type} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <template.icon className="w-5 h-5" />
                      {template.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={template.color}>
                      {template.type.replace('_', ' ')}
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">
                      Pre-built sequence template ready to customize
                    </p>
                    <Button size="sm" className="mt-3 w-full">
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}