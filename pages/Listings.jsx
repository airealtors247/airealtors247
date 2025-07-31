
import React, { useState, useEffect } from "react";
import { Listing } from "@/api/entities";
import { User } from "@/api/entities";
import { InvokeLLM, GenerateImage } from "@/api/integrations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Plus,
  Sparkles,
  FileText,
  Camera,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Calendar,
  Eye,
  Edit,
  Share2,
  Download,
  Loader2,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom"; // New import
import { createPageUrl } from "@/utils"; // New import

import ListingForm from "../components/listings/ListingForm";
import ListingCard from "../components/listings/ListingCard";
import AIListingAssistant from "../components/listings/AIListingAssistant";
import VRTourGenerator from "../components/listings/VRTourGenerator"; // Existing import, no change needed

const FeatureLock = ({ tier, children }) => (
  <div className="relative">
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-lg border-2 border-dashed">
      <Lock className="w-12 h-12 text-slate-400 mb-4" />
      <h3 className="text-xl font-bold text-slate-800">Upgrade to {tier}</h3>
      <p className="text-slate-600 mb-4">This feature is exclusively available on the {tier} plan.</p>
      <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <Link to={createPageUrl("Pricing")}>View Plans & Upgrade</Link>
      </Button>
    </div>
    <div className="blur-sm pointer-events-none opacity-50">
      {children}
    </div>
  </div>
);

export default function ListingsPage() {
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [activeTab, setActiveTab] = useState("my_listings");

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const [userData, listingsData] = await Promise.all([
        User.me(),
        Listing.list("-created_date")
      ]);
      
      setUser(userData);
      setListings(listingsData);
    } catch (error) {
      console.error("Error loading listings:", error);
    }
    setIsLoading(false);
  };

  const handleCreateListing = async (listingData) => {
    try {
      await Listing.create({
        ...listingData,
        realtor_email: user.email,
        listing_preparation_status: "draft"
      });
      setShowForm(false);
      setEditingListing(null);
      loadListings();
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  const handleEditListing = (listing) => {
    setEditingListing(listing);
    setShowForm(true);
  };

  const myListings = listings.filter(listing => listing.realtor_email === user?.email);

  const hasAccess = (allowedTiers) => {
    if (!user) return false;
    const currentTier = user.subscription_tier || 'trial';
    return allowedTiers.includes(currentTier);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Home className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Property Listings</h1>
          </div>
          <Button onClick={() => setShowForm(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-5 h-5 mr-2" />
            New Listing
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4"> {/* Updated to 4 cols */}
            <TabsTrigger value="my_listings">
              My Listings ({myListings.length})
            </TabsTrigger>
            <TabsTrigger value="ai_assistant">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="vr_tours"> {/* New Tab */}
              <Camera className="w-4 h-4 mr-2" />
              Realty Tours
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <FileText className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my_listings" className="mt-6">
            {showForm ? (
              <ListingForm
                listing={editingListing}
                onSubmit={handleCreateListing}
                onCancel={() => {
                  setShowForm(false);
                  setEditingListing(null);
                }}
              />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onEdit={handleEditListing}
                  />
                ))}
                {myListings.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                    <p className="text-gray-500 mb-4">Create your first listing to get started</p>
                    <Button onClick={() => setShowForm(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create First Listing
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="ai_assistant" className="mt-6">
            <AIListingAssistant user={user} onListingCreated={loadListings} />
          </TabsContent>
          
          <TabsContent value="vr_tours" className="mt-6"> {/* New Tab Content */}
            {hasAccess(['premium']) ? (
              <VRTourGenerator listings={myListings} user={user} />
            ) : (
              <FeatureLock tier="Premium">
                <VRTourGenerator listings={myListings} user={user} />
              </FeatureLock>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{myListings.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {myListings.filter(l => l.status === 'active').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Sales</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {myListings.filter(l => l.status === 'pending').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sold Properties</CardTitle>
                  <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {myListings.filter(l => l.status === 'sold').length}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
