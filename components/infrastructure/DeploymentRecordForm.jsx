import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function DeploymentRecordForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData || {
    appName: '',
    websiteDomain: '',
    serviceProvider: 'AWS',
    awsRegion: '',
    serverIp: '',
    cloudfrontDistributionId: '',
    databaseEndpoint: '',
    status: 'Planning',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="appName">Application Name</Label>
          <Input id="appName" name="appName" value={formData.appName} onChange={handleChange} placeholder="e.g., AI Realtors IO" required />
        </div>
        <div>
          <Label htmlFor="websiteDomain">Website Domain</Label>
          <Input id="websiteDomain" name="websiteDomain" value={formData.websiteDomain} onChange={handleChange} placeholder="e.g., airealtors247.io" required />
        </div>
      </div>
      <div>
        <Label htmlFor="awsRegion">AWS Region</Label>
        <Input id="awsRegion" name="awsRegion" value={formData.awsRegion} onChange={handleChange} placeholder="e.g., us-east-1" required />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select name="status" onValueChange={(value) => handleSelectChange('status', value)} defaultValue={formData.status}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Planning">Planning</SelectItem>
            <SelectItem value="Deploying">Deploying</SelectItem>
            <SelectItem value="Live">Live</SelectItem>
            <SelectItem value="Maintenance">Maintenance</SelectItem>
            <SelectItem value="Decommissioned">Decommissioned</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="serverIp">Server IP Address</Label>
        <Input id="serverIp" name="serverIp" value={formData.serverIp} onChange={handleChange} placeholder="e.g., 54.230.159.214" />
      </div>
      <div>
        <Label htmlFor="cloudfrontDistributionId">CloudFront Distribution ID</Label>
        <Input id="cloudfrontDistributionId" name="cloudfrontDistributionId" value={formData.cloudfrontDistributionId} onChange={handleChange} placeholder="e.g., E5EPCSAFTTAX" />
      </div>
      <div>
        <Label htmlFor="databaseEndpoint">Database Endpoint</Label>
        <Input id="databaseEndpoint" name="databaseEndpoint" value={formData.databaseEndpoint} onChange={handleChange} placeholder="e.g., db.xxxxxxxx.us-east-1.rds.amazonaws.com" />
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} placeholder="Any important notes about this deployment..." />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Record</Button>
      </div>
    </form>
  );
}