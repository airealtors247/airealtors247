import React, { useState, useEffect } from 'react';
import { DNCRecord } from '@/api/entities';
import { ComplianceLog } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Search, Upload, FileDown, ShieldOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

export default function DNCManager() {
  const [dncList, setDncList] = useState([]);
  const [complianceLogs, setComplianceLogs] = useState([]);
  const [phoneInput, setPhoneInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [reasonInput, setReasonInput] = useState('Client Request');

  useEffect(() => {
    loadDncList();
    loadComplianceLogs();
  }, []);

  const loadDncList = async () => {
    const records = await DNCRecord.list('-date_added', 50);
    setDncList(records);
  };

  const loadComplianceLogs = async () => {
    const logs = await ComplianceLog.filter({ dnc_check_result: 'blocked_dnc' }, "-check_timestamp", 20);
    setComplianceLogs(logs);
  };

  const handleAddToDNC = async () => {
    if (!phoneInput && !emailInput) return;

    try {
      await DNCRecord.create({
        phone_number: phoneInput,
        email_address: emailInput,
        country: "US", // Should be dynamic based on user profile
        dnc_source: "manual_admin",
        date_added: new Date().toISOString(),
        reason: reasonInput
      });
      setPhoneInput('');
      setEmailInput('');
      loadDncList();
    } catch (error) {
      console.error("Error adding to DNC:", error);
    }
  };

  const handleDeleteFromDNC = async (id) => {
    try {
        await DNCRecord.delete(id);
        loadDncList();
    } catch(error) {
        console.error("Error deleting from DNC:", error);
    }
  }

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ShieldOff className="w-5 h-5 text-red-600" />
                    Do-Not-Call (DNC) Suppression List
                </CardTitle>
                <CardDescription>
                    Manually add phone numbers or emails to your suppression list. The system will automatically block any outreach to these contacts.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="grid w-full items-center gap-1.5">
                        <label htmlFor="phone">Phone Number</label>
                        <Input id="phone" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} placeholder="e.g., +15551234567" />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <label htmlFor="email">Email Address</label>
                        <Input id="email" type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="e.g., contact@example.com" />
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full md:w-auto">
                                <Plus className="w-4 h-4 mr-2" /> Add to DNC List
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Confirm Add to DNC</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to add this contact to your Do-Not-Call/Contact list? All future automated communications will be blocked.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button onClick={handleAddToDNC}>Confirm</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm"><Upload className="w-4 h-4 mr-2" />Bulk Upload CSV</Button>
                    <Button variant="outline" size="sm"><FileDown className="w-4 h-4 mr-2" />Export List</Button>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Your Suppression List</CardTitle>
                <CardDescription>
                    Contacts you've manually added to the DNC list.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Contact Info</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Date Added</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dncList.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.phone_number || item.email_address}</TableCell>
                                <TableCell>{item.reason}</TableCell>
                                <TableCell>{new Date(item.date_added).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteFromDNC(item.id)}>
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Recent Blocked Communications</CardTitle>
                <CardDescription>
                    Log of automated outreach attempts that were blocked due to DNC list matches.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Contact</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Campaign</TableHead>
                            <TableHead>Date Blocked</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {complianceLogs.map(log => (
                             <TableRow key={log.id}>
                                <TableCell>{log.contact_phone || log.contact_email}</TableCell>
                                <TableCell>{log.communication_type}</TableCell>
                                <TableCell>{log.campaign_id || 'N/A'}</TableCell>
                                <TableCell>{new Date(log.check_timestamp).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}