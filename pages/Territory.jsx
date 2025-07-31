import React, { useState, useEffect } from "react";
import { Territory } from "@/api/entities";
import { User } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MapPin,
  Search,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Crown,
  Building
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import TerritoryMap from "../components/territory/TerritoryMap";
import TerritoryStats from "../components/territory/TerritoryStats";
import AvailableTerritories from "../components/territory/AvailableTerritories";
import MyTerritories from "../components/territory/MyTerritories";

export default function TerritoryPage() {
  const [user, setUser] = useState(null);
  const [territories, setTerritories] = useState([]);
  const [myTerritories, setMyTerritories] = useState([]);
  const [availableTerritories, setAvailableTerritories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [priceRange, setPriceRange] = useState("all");

  useEffect(() => {
    loadTerritoryData();
  }, []);

  const loadTerritoryData = async () => {
    try {
      const [userData, allTerritories] = await Promise.all([
        User.me(),
        Territory.list("-created_date")
      ]);
      
      setUser(userData);
      setTerritories(allTerritories);
      
      // Filter user's territories
      const userTerritories = allTerritories.filter(t => t.assigned_to === userData.email);
      const availableOnes = allTerritories.filter(t => !t.assigned_to);
      
      setMyTerritories(userTerritories);
      setAvailableTerritories(availableOnes);
    } catch (error) {
      console.error("Error loading territory data:", error);
    }
    setIsLoading(false);
  };

  const handleClaimTerritory = async (territory) => {
    try {
      await Territory.update(territory.id, {
        assigned_to: user.email,
        exclusivity_expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
      loadTerritoryData();
    } catch (error) {
      console.error("Error claiming territory:", error);
    }
  };

  const filteredAvailable = availableTerritories.filter(territory => {
    const matchesSearch = territory.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         territory.zip_code.includes(searchQuery) ||
                         territory.state.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = selectedState === "all" || territory.state === selectedState;
    
    const matchesPrice = priceRange === "all" || 
      (priceRange === "under_500k" && territory.avg_home_price < 500000) ||
      (priceRange === "500k_1m" && territory.avg_home_price >= 500000 && territory.avg_home_price < 1000000) ||
      (priceRange === "over_1m" && territory.avg_home_price >= 1000000);
    
    return matchesSearch && matchesState && matchesPrice;
  });

  const getTierAllowedTerritories = (tier) => {
    const limits = {
      trial: 1,
      starter: 3,
      professional: 8,
      premium: 15,
      enterprise: 25,
      unlimited: 100
    };
    return limits[tier] || 1;
  };

  const canClaimMore = myTerritories.length < getTierAllowedTerritories(user?.subscription_tier || 'trial');

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
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                Territory Management
              </h1>
              <p className="text-slate-600 text-lg">
                Manage your exclusive geographic territories and discover new opportunities
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-slate-500">My Territories</div>
                <div className="text-2xl font-bold text-blue-600">
                  {myTerritories.length} / {getTierAllowedTerritories(user?.subscription_tier || 'trial')}
                </div>
              </div>
              <Badge variant={canClaimMore ? "default" : "secondary"} className="text-sm">
                {user?.subscription_tier?.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>

        {/* Territory Stats Overview */}
        <TerritoryStats territories={myTerritories} />

        {/* My Territories */}
        <MyTerritories territories={myTerritories} onRefresh={loadTerritoryData} />

        {/* Available Territories */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <CardTitle className="text-2xl text-slate-900 flex items-center gap-2">
                <Building className="w-6 h-6 text-green-600" />
                Available Territories
              </CardTitle>
              {!canClaimMore && (
                <Alert className="w-auto bg-amber-50 border-amber-200">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-700 text-sm">
                    Upgrade your subscription to claim more territories
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by city, state, or zip code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  <SelectItem value="California">California</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="Florida">Florida</SelectItem>
                  <SelectItem value="Texas">Texas</SelectItem>
                  <SelectItem value="Ontario">Ontario</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under_500k">Under $500K</SelectItem>
                  <SelectItem value="500k_1m">$500K - $1M</SelectItem>
                  <SelectItem value="over_1m">Over $1M</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Available Territories Grid */}
            <AvailableTerritories 
              territories={filteredAvailable}
              onClaim={handleClaimTerritory}
              canClaim={canClaimMore}
            />

            {filteredAvailable.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p className="text-lg font-medium mb-2">No territories found</p>
                <p className="text-sm">Try adjusting your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upgrade CTA */}
        {!canClaimMore && (
          <Card className="shadow-xl border-2 border-gradient-to-r from-purple-200 to-blue-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-8 text-center">
              <Crown className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Unlock More Territories
              </h3>
              <p className="text-slate-600 mb-6">
                Upgrade your subscription to claim exclusive territories in premium markets
              </p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Upgrade Subscription
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}