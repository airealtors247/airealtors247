import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Save } from "lucide-react";

export default function CampaignForm({ campaign, onSubmit, onCancel, campaignTypes }) {
  const [formData, setFormData] = useState(campaign || {
    name: "",
    type: "social_media",
    platform: "facebook",
    target_zip_codes: [],
    message_template: "",
    budget: "",
    audience_criteria: {
      age_min: 25,
      age_max: 65,
      income_min: 50000,
      income_max: 200000,
      homeowner_status: "both"
    }
  });

  const [zipCode, setZipCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addZipCode = () => {
    if (zipCode && !formData.target_zip_codes.includes(zipCode)) {
      setFormData({
        ...formData,
        target_zip_codes: [...formData.target_zip_codes, zipCode]
      });
      setZipCode("");
    }
  };

  const removeZipCode = (codeToRemove) => {
    setFormData({
      ...formData,
      target_zip_codes: formData.target_zip_codes.filter(code => code !== codeToRemove)
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{campaign ? 'Edit Campaign' : 'Create New Campaign'}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Campaign Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter campaign name"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Campaign Type</label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData({...formData, type: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(campaignTypes).map(([key, type]) => (
                    <SelectItem key={key} value={key}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Target Zip Codes</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter zip code"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addZipCode())}
              />
              <Button type="button" onClick={addZipCode} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.target_zip_codes.map(code => (
                <Badge key={code} variant="secondary" className="cursor-pointer" onClick={() => removeZipCode(code)}>
                  {code} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Message Template</label>
            <Textarea
              value={formData.message_template}
              onChange={(e) => setFormData({...formData, message_template: e.target.value})}
              placeholder="Enter your campaign message template..."
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Budget ($)</label>
              <Input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: parseFloat(e.target.value) || 0})}
                placeholder="0"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Target Audience</label>
              <Select 
                value={formData.audience_criteria?.homeowner_status || 'both'} 
                onValueChange={(value) => setFormData({
                  ...formData, 
                  audience_criteria: {...formData.audience_criteria, homeowner_status: value}
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Homeowners</SelectItem>
                  <SelectItem value="renter">Renters</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              {campaign ? 'Update Campaign' : 'Create Campaign'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}