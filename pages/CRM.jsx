import React, { useState, useEffect } from "react";
import { User } from "@/api/entities";
import CRMDashboard from "../components/crm/CRMDashboard";

export default function CRMPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await User.me();
      setUser(userData);
    } catch (error) {
      console.error("Error loading user:", error);
    }
    setIsLoading(false);
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
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Built-in CRM</h1>
          <p className="text-slate-600 text-lg">
            Manage contacts, deals, and communications - completely independent platform
          </p>
        </div>
        
        <CRMDashboard user={user} />
      </div>
    </div>
  );
}