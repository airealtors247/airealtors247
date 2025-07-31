import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, DollarSign, MapPin, Square, Bed, Bath, Calendar } from "lucide-react";

export default function ListingForm({ listing, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(listing || {
    address: "",
    city: "",
    state: "",
    zip_code: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    square_footage: "",
    lot_size: "",
    year_built: "",
    property_type: "single_family",
    description: "",
    features: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price) || 0,
      bedrooms: parseInt(formData.bedrooms) || 0,
      bathrooms: parseFloat(formData.bathrooms) || 0,
      square_footage: parseInt(formData.square_footage) || 0,
      lot_size: parseFloat(formData.lot_size) || 0,
      year_built: parseInt(formData.year_built) || new Date().getFullYear()
    });
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-6 h-6 text-blue-600" />
          {listing ? "Edit Listing" : "Create New Listing"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Property Address</label>
              <Input
                placeholder="123 Main Street"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input
                placeholder="Beverly Hills"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              <Input
                placeholder="CA"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Zip Code</label>
              <Input
                placeholder="90210"
                value={formData.zip_code}
                onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Price</label>
              <Input
                type="number"
                placeholder="1500000"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bedrooms</label>
              <Input
                type="number"
                placeholder="4"
                value={formData.bedrooms}
                onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Bathrooms</label>
              <Input
                type="number"
                step="0.5"
                placeholder="3.5"
                value={formData.bathrooms}
                onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Square Footage</label>
              <Input
                type="number"
                placeholder="2500"
                value={formData.square_footage}
                onChange={(e) => setFormData({...formData, square_footage: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Year Built</label>
              <Input
                type="number"
                placeholder="2020"
                value={formData.year_built}
                onChange={(e) => setFormData({...formData, year_built: e.target.value})}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Property Type</label>
              <Select value={formData.property_type} onValueChange={(value) => setFormData({...formData, property_type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single_family">Single Family Home</SelectItem>
                  <SelectItem value="condo">Condominium</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="multi_family">Multi-Family</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Lot Size (acres)</label>
              <Input
                type="number"
                step="0.01"
                placeholder="0.25"
                value={formData.lot_size}
                onChange={(e) => setFormData({...formData, lot_size: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Property Description</label>
            <Textarea
              placeholder="Describe the property features, location, and unique selling points..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="h-32"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {listing ? "Update Listing" : "Create Listing"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}