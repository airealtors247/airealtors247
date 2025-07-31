import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Target, 
  Home, 
  Building2, 
  Users, 
  TrendingUp, 
  Briefcase,
  MapPin,
  Star,
  CheckCircle
} from "lucide-react";

const propertyTypeCategories = [
  {
    category: "Residential",
    icon: Home,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    types: [
      { id: "residential_luxury", label: "Luxury Homes ($1M+)", description: "High-end properties, luxury amenities" },
      { id: "residential_first_time_buyers", label: "First-Time Buyers", description: "Entry-level homes, condos, education focus" },
      { id: "residential_seniors_downsizing", label: "Seniors & Downsizing", description: "Age-friendly communities, accessibility" },
      { id: "residential_families", label: "Family Homes", description: "School districts, safety, neighborhoods" },
      { id: "residential_condos", label: "Condominiums", description: "Urban living, amenities, HOA management" },
      { id: "residential_investment", label: "Investment Properties", description: "Rental income, ROI analysis" }
    ]
  },
  {
    category: "Commercial",
    icon: Building2,
    color: "text-green-600",
    bgColor: "bg-green-50",
    types: [
      { id: "commercial_retail", label: "Retail Spaces", description: "Storefronts, shopping centers, foot traffic" },
      { id: "commercial_office", label: "Office Buildings", description: "Corporate spaces, business districts" },
      { id: "commercial_industrial", label: "Industrial Properties", description: "Warehouses, manufacturing facilities" },
      { id: "commercial_warehouse", label: "Logistics & Distribution", description: "E-commerce fulfillment, supply chain" },
      { id: "commercial_hospitality", label: "Hotels & Hospitality", description: "Tourism, hospitality management" },
      { id: "commercial_mixed_use", label: "Mixed-Use Development", description: "Live-work-play environments" }
    ]
  },
  {
    category: "Specialized",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    types: [
      { id: "leasing_residential", label: "Residential Leasing", description: "Apartment rentals, tenant relations" },
      { id: "leasing_commercial", label: "Commercial Leasing", description: "Business rentals, lease negotiations" },
      { id: "mobile_homes", label: "Mobile/Manufactured Homes", description: "Affordable housing, communities" },
      { id: "vacant_land", label: "Vacant Land", description: "Raw land, future development potential" },
      { id: "development_land", label: "Development Projects", description: "Zoning, permits, construction" },
      { id: "storage_facilities", label: "Storage & Self-Storage", description: "Investment, management, operations" }
    ]
  }
];

const clienteleOptions = [
  { id: "investors", label: "Real Estate Investors", icon: TrendingUp, focus: "ROI, cash flow, market analysis" },
  { id: "first_time_buyers", label: "First-Time Home Buyers", icon: Home, focus: "Education, financing, guidance" },
  { id: "luxury_buyers", label: "Luxury Buyers", icon: Star, focus: "Exclusive properties, privacy, white-glove service" },
  { id: "seniors", label: "Seniors & Retirees", icon: Users, focus: "Downsizing, accessibility, community" },
  { id: "young_professionals", label: "Young Professionals", icon: Briefcase, focus: "Urban living, commute, lifestyle" },
  { id: "families_with_children", label: "Families", icon: Users, focus: "Schools, safety, space" },
  { id: "relocators", label: "Corporate Relocations", icon: MapPin, focus: "Timing, remote guidance, settling services" },
  { id: "builders_developers", label: "Builders & Developers", icon: Building2, focus: "Land acquisition, permits, partnerships" }
];

export default function NicheSpecializationSetup({ onComplete, initialData = {} }) {
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState(initialData.property_types || []);
  const [selectedClientele, setSelectedClientele] = useState(initialData.target_clientele || []);
  const [brandPositioning, setBrandPositioning] = useState(initialData.brand_positioning || '');
  const [contentTone, setContentTone] = useState(initialData.content_tone || 'professional');

  const handlePropertyTypeToggle = (typeId) => {
    setSelectedPropertyTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleClienteleToggle = (clienteleId) => {
    setSelectedClientele(prev => 
      prev.includes(clienteleId) 
        ? prev.filter(id => id !== clienteleId)
        : [...prev, clienteleId]
    );
  };

  const handleComplete = () => {
    const nicheData = {
      property_types: selectedPropertyTypes,
      target_clientele: selectedClientele,
      brand_positioning: brandPositioning,
      content_tone: contentTone,
      expertise_areas: [] // Will be auto-populated based on selections
    };
    onComplete(nicheData);
  };

  const canProceed = selectedPropertyTypes.length > 0 && selectedClientele.length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Build Your Niche Specialization</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Position yourself as the go-to expert in your chosen market segments. 
          All your AI-generated content will be tailored to establish you as THE specialist in these areas.
        </p>
      </div>

      {/* Property Type Selection */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="w-6 h-6 text-blue-600" />
            What Types of Properties Do You Specialize In?
          </CardTitle>
          <p className="text-sm text-slate-600">Select all that apply. Your content will focus on these property types.</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {propertyTypeCategories.map((category) => (
              <div key={category.category}>
                <div className={`flex items-center gap-3 mb-4 p-3 rounded-lg ${category.bgColor}`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                  <h3 className="text-lg font-semibold text-slate-900">{category.category}</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ml-6">
                  {category.types.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => handlePropertyTypeToggle(type.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                        selectedPropertyTypes.includes(type.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{type.label}</h4>
                          <p className="text-sm text-slate-600 mt-1">{type.description}</p>
                        </div>
                        {selectedPropertyTypes.includes(type.id) && (
                          <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 ml-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Target Clientele */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-green-600" />
            Who Are Your Ideal Clients?
          </CardTitle>
          <p className="text-sm text-slate-600">Select your target demographics. Your messaging will speak directly to these groups.</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {clienteleOptions.map((clientele) => (
              <div
                key={clientele.id}
                onClick={() => handleClienteleToggle(clientele.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedClientele.includes(clientele.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-center">
                  <clientele.icon className="w-8 h-8 mx-auto mb-2 text-slate-600" />
                  <h4 className="font-semibold text-slate-900 mb-2">{clientele.label}</h4>
                  <p className="text-xs text-slate-600">{clientele.focus}</p>
                  {selectedClientele.includes(clientele.id) && (
                    <CheckCircle className="w-5 h-5 text-green-500 mx-auto mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Brand Positioning */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-600" />
            How Do You Want to Be Known?
          </CardTitle>
          <p className="text-sm text-slate-600">Describe your unique value proposition in one sentence.</p>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="e.g., 'The luxury condo specialist in downtown Miami with unmatched market insights and VIP service'"
            value={brandPositioning}
            onChange={(e) => setBrandPositioning(e.target.value)}
            className="h-24"
          />
        </CardContent>
      </Card>

      {/* Content Tone */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Content Tone & Style</CardTitle>
          <p className="text-sm text-slate-600">How should your AI-generated content sound?</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { value: 'professional', label: 'Professional', desc: 'Formal, authoritative' },
              { value: 'friendly', label: 'Friendly', desc: 'Warm, approachable' },
              { value: 'luxury', label: 'Luxury', desc: 'Sophisticated, exclusive' },
              { value: 'analytical', label: 'Analytical', desc: 'Data-driven, detailed' },
              { value: 'educational', label: 'Educational', desc: 'Informative, helpful' },
              { value: 'conversational', label: 'Conversational', desc: 'Casual, relatable' }
            ].map((tone) => (
              <div
                key={tone.value}
                onClick={() => setContentTone(tone.value)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  contentTone === tone.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <h4 className="font-semibold text-slate-900">{tone.label}</h4>
                <p className="text-sm text-slate-600">{tone.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Selected Summary */}
      {(selectedPropertyTypes.length > 0 || selectedClientele.length > 0) && (
        <Card className="shadow-lg border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Your Specialization Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedPropertyTypes.length > 0 && (
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Property Focus:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPropertyTypes.map((typeId) => {
                      const type = propertyTypeCategories
                        .flatMap(cat => cat.types)
                        .find(t => t.id === typeId);
                      return (
                        <Badge key={typeId} variant="secondary" className="bg-blue-100 text-blue-800">
                          {type?.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {selectedClientele.length > 0 && (
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Target Clients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedClientele.map((clienteleId) => {
                      const clientele = clienteleOptions.find(c => c.id === clienteleId);
                      return (
                        <Badge key={clienteleId} variant="secondary" className="bg-green-100 text-green-800">
                          {clientele?.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}

              {brandPositioning && (
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Brand Positioning:</h4>
                  <p className="text-blue-800 italic">"{brandPositioning}"</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center">
        <Button
          onClick={handleComplete}
          disabled={!canProceed}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
          size="lg"
        >
          {canProceed ? 'Complete Niche Setup' : 'Select Your Specializations'}
        </Button>
      </div>
    </div>
  );
}