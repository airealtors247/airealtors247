import React, { useState, useEffect } from "react";
import { TrainingModule } from "@/api/entities";
import { User } from "@/api/entities";
import { GraduationCap, BookOpen, Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ModuleCard from "../components/university/ModuleCard";

export default function UniversityPage() {
    const [user, setUser] = useState(null);
    const [modules, setModules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [userData, moduleData] = await Promise.all([
                User.me(),
                TrainingModule.list()
            ]);
            setUser(userData);
            
            // Filter modules for the user's brokerage or system-wide
            const userModules = moduleData.filter(
                m => m.owner_email === 'system' || m.owner_email === userData.email // simplified logic
            );
            setModules(userModules);

        } catch (error) {
            console.error("Error loading university data:", error);
        }
        setIsLoading(false);
    }
    
    if (isLoading) return <div className="p-8">Loading modules...</div>

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>
                                AI University & Training Hub
                            </h1>
                            <p className="text-slate-600 text-lg">
                                Access world-class training modules and practice with AI
                            </p>
                        </div>
                        <Button variant="outline">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Custom Module
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Modules Available</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{modules.length}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Modules Completed</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-3xl font-bold">0</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Average Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-3xl font-bold">N/A</p>
                        </CardContent>
                    </Card>
                </div>
                
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">My Learning Path</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {modules.map(module => (
                            <ModuleCard key={module.id} module={module} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}