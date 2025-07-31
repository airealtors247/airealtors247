import React, { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { Team } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Plus, Users, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// This is a new page to represent Team Management
export default function TeamPage() {
    const [team, setTeam] = useState(null);
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadTeamData = async () => {
            const currentUser = await User.me();
            if (currentUser.team_id) {
                const teamData = await Team.get(currentUser.team_id);
                setTeam(teamData);
                const memberData = await User.filter({ team_id: currentUser.team_id });
                setMembers(memberData);
            }
            setIsLoading(false);
        };
        loadTeamData();
    }, []);

    if (isLoading) return <div>Loading Team...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <Building2 className="w-8 h-8 text-blue-600" />
                    Team Management
                </h1>
                
                {team ? (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>{team.name}</span>
                                <Button><Plus className="w-4 h-4 mr-2" /> Invite Member</Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {members.map(member => (
                                    <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-50">
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={member.profile_image_url} />
                                                <AvatarFallback>{member.first_name?.[0]}{member.last_name?.[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{member.first_name} {member.last_name}</p>
                                                <p className="text-sm text-slate-500">{member.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{member.team_role}</span>
                                            <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                                            <Button variant="ghost" size="icon" className="text-red-500"><Trash2 className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg">You are not part of a team.</p>
                        <Button className="mt-4">Create a Team</Button>
                    </div>
                )}
            </div>
        </div>
    );
}