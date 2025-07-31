
import React, { useState, useEffect } from "react";
import { Lead } from "@/api/entities";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Plus,
  Search,
  Filter,
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

import LeadKanban from "../components/leads/LeadKanban";
import LeadForm from "../components/leads/LeadForm";
import LeadStats from "../components/leads/LeadStats";
import LeadFilters from "../components/leads/LeadFilters";
import LeadList from "../components/leads/LeadList";

const statusConfig = {
  new: { label: "New", color: "bg-blue-100 text-blue-800", icon: Plus, iconColor: 'text-blue-800' },
  contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-800", icon: Phone, iconColor: 'text-yellow-800' },
  qualified: { label: "Qualified", color: "bg-green-100 text-green-800", icon: CheckCircle, iconColor: 'text-green-800' },
  appointment: { label: "Appointment", color: "bg-purple-100 text-purple-800", icon: Calendar, iconColor: 'text-purple-800' },
  under_contract: { label: "Under Contract", color: "bg-indigo-100 text-indigo-800", icon: Target, iconColor: 'text-indigo-800' },
  closed: { label: "Closed", color: "bg-emerald-100 text-emerald-800", icon: TrendingUp, iconColor: 'text-emerald-800' },
  lost: { label: "Lost", color: "bg-red-100 text-red-800", icon: AlertCircle, iconColor: 'text-red-800' }
};

export default function LeadsPage() {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    status: "all",
    source: "all",
    type: "all",
    priority: "all"
  });
  const [viewMode, setViewMode] = useState("kanban");

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [userData, leadsData] = await Promise.all([
        User.me(),
        Lead.list("-created_date")
      ]);
      
      if (!userData) {
        throw new Error("Please log in to view your leads");
      }
      
      setUser(userData);
      setLeads(leadsData || []);
    } catch (err) {
      console.error("Error loading leads:", err);
      setError("Failed to load leads. Please try refreshing the page.");
    }
    setIsLoading(false);
  };

  const handleCreateLead = async (leadData) => {
    try {
      await Lead.create({
        ...leadData,
        assigned_agent: user.email
      });
      setShowForm(false);
      setEditingLead(null);
      await loadLeads();
    } catch (error) {
      console.error("Error creating lead:", error);
      alert("Failed to create lead. Please try again.");
    }
  };

  const handleUpdateLead = async (leadId, updates) => {
    try {
      await Lead.update(leadId, updates);
      await loadLeads();
    } catch (error) {
      console.error("Error updating lead:", error);
      alert("Failed to update lead. Please try again.");
    }
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setShowForm(true);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone?.includes(searchQuery);
    
    const matchesStatus = activeFilters.status === "all" || lead.status === activeFilters.status;
    const matchesSource = activeFilters.source === "all" || lead.lead_source === activeFilters.source;
    const matchesType = activeFilters.type === "all" || lead.lead_type === activeFilters.type;
    
    return matchesSearch && matchesStatus && matchesSource && matchesType;
  });

  const calculateStats = () => {
    const totalLeads = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;
    const qualifiedLeads = leads.filter(l => l.status === 'qualified').length;
    const closedLeads = leads.filter(l => l.status === 'closed').length;
    const conversionRate = totalLeads > 0 ? ((closedLeads / totalLeads) * 100).toFixed(1) : 0;
    
    return {
      totalLeads,
      newLeads,
      qualifiedLeads,
      closedLeads,
      conversionRate
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              Error Loading Leads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">{error}</p>
            <Button onClick={loadLeads} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                Lead Management
              </h1>
              <p className="text-slate-600 text-lg">
                Track and nurture your leads through the sales pipeline
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>
        </div>

        {/* Lead Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.totalLeads}</div>
              <p className="text-xs text-slate-500">All time</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">New Leads</CardTitle>
              <Plus className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.newLeads}</div>
              <p className="text-xs text-slate-500">Awaiting contact</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Qualified</CardTitle>
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.qualifiedLeads}</div>
              <p className="text-xs text-slate-500">Ready to close</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">{stats.conversionRate}%</div>
              <p className="text-xs text-slate-500">Lead to close</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search leads by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Tabs */}
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <div className="flex justify-center">
            <TabsList className="grid w-80 grid-cols-2 bg-slate-100">
              <TabsTrigger value="kanban" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Pipeline View
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                List View
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="kanban" className="mt-8">
            {leads.length > 0 ? (
              <LeadKanban 
                leads={filteredLeads}
                onUpdateLead={handleUpdateLead}
                onEditLead={handleEditLead}
                statusConfig={statusConfig}
              />
            ) : (
              <Card className="shadow-xl border-0">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No leads yet</h3>
                  <p className="text-slate-600 mb-4">Get started by adding your first lead</p>
                  <Button onClick={() => setShowForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Lead
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="list" className="mt-8">
            <LeadList 
              leads={filteredLeads}
              onUpdateLead={handleUpdateLead}
              onEditLead={handleEditLead}
              statusConfig={statusConfig}
            />
          </TabsContent>
        </Tabs>

        {/* Lead Form Modal/Sidebar */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <LeadForm
                lead={editingLead}
                onSubmit={handleCreateLead}
                onCancel={() => {
                  setShowForm(false);
                  setEditingLead(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
