import React, { useState, useEffect } from 'react';
import { DeploymentRecord } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Server, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import DeploymentRecordForm from '../components/infrastructure/DeploymentRecordForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function InfrastructureDashboard() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setIsLoading(true);
    const fetchedRecords = await DeploymentRecord.list();
    setRecords(fetchedRecords);
    setIsLoading(false);
  };

  const handleFormSubmit = async (data) => {
    if (selectedRecord) {
      await DeploymentRecord.update(selectedRecord.id, data);
    } else {
      await DeploymentRecord.create(data);
    }
    await loadRecords();
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleAddNew = () => {
    setSelectedRecord(null);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (recordId) => {
    if (window.confirm("Are you sure you want to delete this record? This cannot be undone.")) {
      await DeploymentRecord.delete(recordId);
      await loadRecords();
    }
  };

  const statusColors = {
    Live: "bg-green-100 text-green-800",
    Planning: "bg-blue-100 text-blue-800",
    Deploying: "bg-yellow-100 text-yellow-800",
    Maintenance: "bg-orange-100 text-orange-800",
    Decommissioned: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Server className="w-8 h-8" />
            Infrastructure Dashboard
          </h1>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Deployment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Deployment Records</CardTitle>
            <CardDescription>
              An overview of all your hosted applications and their infrastructure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading records...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Application</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>AWS Region</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.appName}</TableCell>
                      <TableCell>{record.websiteDomain}</TableCell>
                      <TableCell>{record.awsRegion}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[record.status] || "bg-gray-100 text-gray-800"}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(record)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(record.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            {records.length === 0 && !isLoading && (
                 <div className="text-center py-12">
                    <p className="text-slate-500">No deployment records found. Click "Add Deployment" to get started.</p>
                </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedRecord ? 'Edit Deployment Record' : 'Add New Deployment Record'}</DialogTitle>
            </DialogHeader>
            <DeploymentRecordForm
              initialData={selectedRecord}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsModalOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}