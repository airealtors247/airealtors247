import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Home,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Calendar,
  Eye,
  Edit,
  Share2
} from "lucide-react";

export default function ListingCard({ listing, onEdit }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      case 'off_market': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg">{listing.address}</CardTitle>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {listing.city}, {listing.state} {listing.zip_code}
            </p>
          </div>
          <Badge className={getStatusColor(listing.status)}>
            {listing.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-2xl font-bold text-blue-600 flex items-center gap-1">
          <DollarSign className="w-5 h-5" />
          {formatPrice(listing.price)}
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-gray-500" />
            <span>{listing.bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-gray-500" />
            <span>{listing.bathrooms} baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4 text-gray-500" />
            <span>{listing.square_footage?.toLocaleString()} sqft</span>
          </div>
        </div>
        
        {listing.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
        )}
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            {listing.year_built}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Eye className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={() => onEdit(listing)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}