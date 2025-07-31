import React, { useState, useEffect } from 'react';
import { UserPhone } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Phone, Plus, Trash2, Edit, Check, X, Building, UserCheck } from 'lucide-react';
import telecomProviders from '../utils/telecomProviders';

const PhoneNumberManager = ({ user }) => {
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPhone, setNewPhone] = useState({
        phone_number: '',
        country_code: 'US',
        provider_name: '',
        provider_type: 'byo_sip',
        use_for_voice: true,
        use_for_sms: true,
        caller_id_name: '',
        compliance_consent: false,
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadPhoneNumbers();
    }, [user]);

    const loadPhoneNumbers = async () => {
        setIsLoading(true);
        try {
            const numbers = await UserPhone.filter({ user_email: user.email });
            setPhoneNumbers(numbers);
        } catch (error) {
            console.error("Error loading phone numbers:", error);
        }
        setIsLoading(false);
    };
    
    const handleAddPhone = async () => {
        if (!newPhone.compliance_consent) {
            alert("You must confirm you have the right to use this number for business communications.");
            return;
        }
        try {
            await UserPhone.create({ ...newPhone, user_email: user.email });
            setShowAddForm(false);
            setNewPhone({
                phone_number: '', country_code: 'US', provider_name: '', provider_type: 'byo_sip',
                use_for_voice: true, use_for_sms: true, caller_id_name: '', compliance_consent: false,
            });
            loadPhoneNumbers();
        } catch (error) {
            console.error("Error adding phone number:", error);
        }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this phone number?")) {
            try {
                await UserPhone.delete(id);
                loadPhoneNumbers();
            } catch (error) {
                console.error("Error deleting phone number:", error);
            }
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Phone Number Management</CardTitle>
                <CardDescription>Connect your SIP lines from Twilio, Plivo, or other providers for AI calling and texting.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {phoneNumbers.map(phone => (
                        <div key={phone.id} className="p-4 border rounded-lg flex items-center justify-between">
                            <div>
                                <div className="font-bold text-lg flex items-center gap-2">
                                    {phone.phone_number} {phone.is_primary && <Badge>Primary</Badge>}
                                </div>
                                <div className="text-sm text-slate-500">{phone.provider_name} ({phone.provider_type})</div>
                                <div className="flex gap-2 mt-2">
                                    {phone.use_for_voice && <Badge variant="outline">Voice Enabled</Badge>}
                                    {phone.use_for_sms && <Badge variant="outline">SMS Enabled</Badge>}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button size="icon" variant="ghost"><Edit className="w-4 h-4" /></Button>
                                <Button size="icon" variant="ghost" onClick={() => handleDelete(phone.id)}><Trash2 className="w-4 h-4 text-red-500" /></Button>
                            </div>
                        </div>
                    ))}
                    {!showAddForm && (
                        <Button onClick={() => setShowAddForm(true)} className="w-full">
                            <Plus className="w-4 h-4 mr-2" /> Add Phone Number
                        </Button>
                    )}
                </div>

                {showAddForm && (
                    <div className="mt-6 p-4 border-t pt-6 space-y-4">
                        <h3 className="font-semibold text-lg">Add New Phone Number</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                           <Input placeholder="Phone Number (e.g., +15551234567)" value={newPhone.phone_number} onChange={e => setNewPhone({...newPhone, phone_number: e.target.value})} />
                           <Input placeholder="Caller ID Name" value={newPhone.caller_id_name} onChange={e => setNewPhone({...newPhone, caller_id_name: e.target.value})} />
                        </div>
                         <div className="grid md:grid-cols-2 gap-4">
                             <Select onValueChange={value => setNewPhone({...newPhone, provider_type: value})} defaultValue={newPhone.provider_type}>
                                <SelectTrigger><SelectValue placeholder="Provider Type" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="byo_sip">Bring Your Own SIP Trunk</SelectItem>
                                    <SelectItem value="purchased">Purchased from AIRealtors247</SelectItem>
                                    <SelectItem value="system_pooled">System Pooled Number</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select onValueChange={value => setNewPhone({...newPhone, provider_name: value})}>
                                <SelectTrigger><SelectValue placeholder="Select Provider" /></SelectTrigger>
                                <SelectContent>
                                    {telecomProviders.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="use_for_voice" checked={newPhone.use_for_voice} onCheckedChange={checked => setNewPhone({...newPhone, use_for_voice: checked})} />
                            <label htmlFor="use_for_voice" className="text-sm font-medium">Enable for Voice Calls</label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="use_for_sms" checked={newPhone.use_for_sms} onCheckedChange={checked => setNewPhone({...newPhone, use_for_sms: checked})} />
                            <label htmlFor="use_for_sms" className="text-sm font-medium">Enable for SMS/Texting</label>
                        </div>
                        <div className="flex items-start space-x-2 pt-4 border-t">
                            <Checkbox id="compliance_consent" checked={newPhone.compliance_consent} onCheckedChange={checked => setNewPhone({...newPhone, compliance_consent: checked})} />
                            <label htmlFor="compliance_consent" className="text-sm font-medium">
                                I confirm that I have the legal right and necessary consent to use this phone number for business communications, including automated calls and texts, in compliance with TCPA, CASL, and all relevant regulations.
                            </label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => setShowAddForm(false)}>Cancel</Button>
                            <Button onClick={handleAddPhone}>Save Number</Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default PhoneNumberManager;