import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, User, Home, Phone } from "lucide-react";

export default function ReviewRequestForm({ onSubmit, onCancel, user }) {
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    property_address: "",
    transaction_type: "sale"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client_name || !formData.client_email) {
      alert("Please fill in client name and email");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="w-6 h-6 text-blue-600" />
          Send Review Request
        </CardTitle>
        <p className="text-sm text-slate-600">
          Request a review from your client. 5-star reviews will be directed to Google, others will provide private feedback.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Client Name *
              </label>
              <Input
                placeholder="John Smith"
                value={formData.client_name}
                onChange={(e) => setFormData({...formData, client_name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Client Email *
              </label>
              <Input
                type="email"
                placeholder="john.smith@email.com"
                value={formData.client_email}
                onChange={(e) => setFormData({...formData, client_email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Client Phone
              </label>
              <Input
                placeholder="(555) 123-4567"
                value={formData.client_phone}
                onChange={(e) => setFormData({...formData, client_phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Transaction Type</label>
              <Select value={formData.transaction_type} onValueChange={(value) => setFormData({...formData, transaction_type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select transaction type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">Home Sale</SelectItem>
                  <SelectItem value="purchase">Home Purchase</SelectItem>
                  <SelectItem value="rental">Rental</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Home className="w-4 h-4" />
              Property Address (Optional)
            </label>
            <Input
              placeholder="123 Main Street, Beverly Hills, CA 90210"
              value={formData.property_address}
              onChange={(e) => setFormData({...formData, property_address: e.target.value})}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">How This Works:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 5-star reviews → Redirected to Google Reviews for public posting</li>
              <li>• 4-star or below → Private feedback form to help you improve</li>
              <li>• Professional email template automatically sent to client</li>
              <li>• Track all responses in your dashboard</li>
            </ul>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Send Review Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}