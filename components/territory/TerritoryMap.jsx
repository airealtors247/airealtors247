import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Zap, Users, DollarSign } from "lucide-react";

export default function TerritoryMap({ territories, onTerritorySelect }) {
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Simulate Google Maps integration
  useEffect(() => {
    // In production, this would initialize Google Maps
    const timer = setTimeout(() => setMapLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTerritoryClick = (territory) => {
    setSelectedTerritory(territory);
    if (onTerritorySelect) {
      onTerritorySelect(territory);
    }
  };

  const getMarkerColor = (territory) => {
    if (territory.assigned_to) return 'bg-red-500'; // Occupied
    if (territory.market_activity === 'hot') return 'bg-orange-500';
    if (territory.market_activity === 'moderate') return 'bg-yellow-500';
    return 'bg-green-500'; // Available
  };

  if (!mapLoaded) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Interactive Territory Map...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Map Display */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Territory Coverage Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-slate-100 rounded-lg h-96 overflow-hidden">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-30"></div>
            
            {/* Territory Markers */}
            <div className="absolute inset-0 p-4">
              {territories.map((territory, index) => (
                <button
                  key={territory.id}
                  onClick={() => handleTerritoryClick(territory)}
                  className={`absolute w-4 h-4 rounded-full ${getMarkerColor(territory)} 
                    hover:scale-150 transition-transform duration-200 cursor-pointer
                    shadow-lg border-2 border-white`}
                  style={{
                    left: `${20 + (index * 15) % 60}%`,
                    top: `${30 + (index * 12) % 40}%`
                  }}
                  title={`${territory.city}, ${territory.state} - ${territory.zip_code}`}
                />
              ))}
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button size="sm" variant="outline" className="bg-white/90">
                <Zap className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="bg-white/90">
                +
              </Button>
              <Button size="sm" variant="outline" className="bg-white/90">
                -
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white/90 rounded-lg p-3 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Moderate Demand</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>High Demand</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Occupied</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Territory Details */}
      <Card>
        <CardHeader>
          <CardTitle>Territory Details</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedTerritory ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedTerritory.city}, {selectedTerritory.state}</h3>
                <p className="text-sm text-slate-600">ZIP Code: {selectedTerritory.zip_code}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <Users className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                  <div className="text-sm font-semibold">{selectedTerritory.population?.toLocaleString() || 'N/A'}</div>
                  <div className="text-xs text-slate-500">Population</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <DollarSign className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                  <div className="text-sm font-semibold">${selectedTerritory.avg_home_price?.toLocaleString() || 'N/A'}</div>
                  <div className="text-xs text-slate-500">Avg Home Price</div>
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-2">Market Activity:</p>
                <Badge className={
                  selectedTerritory.market_activity === 'hot' ? 'bg-red-100 text-red-800' :
                  selectedTerritory.market_activity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }>
                  {selectedTerritory.market_activity}
                </Badge>
              </div>

              {selectedTerritory.assigned_to ? (
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm font-medium text-red-800">Territory Occupied</p>
                  <p className="text-xs text-red-600">Assigned to: {selectedTerritory.assigned_to}</p>
                </div>
              ) : (
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Claim Territory
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center text-slate-500 py-8">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>Click on a territory marker to view details</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}