import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, DollarSign, Crown, Lock } from "lucide-react";

export default function AvailableTerritories({ territories, onClaim, canClaim }) {
  const marketActivityColors = {
    hot: "bg-red-100 text-red-800 border-red-200",
    moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    slow: "bg-blue-100 text-blue-800 border-blue-200"
  };

  const getPriorityLevel = (territory) => {
    if (territory.market_activity === 'hot' && territory.avg_home_price > 800000) return 'premium';
    if (territory.market_activity === 'hot') return 'high';
    if (territory.market_activity === 'moderate') return 'medium';
    return 'low';
  };

  const priorityColors = {
    premium: "bg-purple-100 text-purple-800 border-purple-200",
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200"
  };

  if (!territories || territories.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <MapPin className="w-16 h-16 mx-auto mb-4 text-slate-300" />
        <p className="text-lg font-medium mb-2">No available territories</p>
        <p className="text-sm">All territories in your search criteria are currently assigned</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {territories.map((territory) => {
        const priority = getPriorityLevel(territory);
        const isPremium = priority === 'premium';
        
        return (
          <Card key={territory.id} className={`border-2 hover:shadow-xl transition-all duration-300 ${
            isPremium ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50' : 'border-slate-200'
          }`}>
            <CardContent className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 flex items-center gap-2">
                    {territory.city}, {territory.state}
                    {isPremium && <Crown className="w-4 h-4 text-purple-600" />}
                  </h3>
                  <p className="text-sm text-slate-600">ZIP: {territory.zip_code}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={marketActivityColors[territory.market_activity]}>
                    {territory.market_activity}
                  </Badge>
                  <Badge className={priorityColors[priority]}>
                    {priority} priority
                  </Badge>
                </div>
              </div>

              {/* Territory Stats */}
              <div className="space-y-3 mb-4">
                {territory.population && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">Population:</span>
                    </div>
                    <span className="font-medium text-slate-900">{territory.population.toLocaleString()}</span>
                  </div>
                )}

                {territory.avg_home_price && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">Avg Price:</span>
                    </div>
                    <span className="font-medium text-slate-900">${territory.avg_home_price.toLocaleString()}</span>
                  </div>
                )}

                {territory.county && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">County:</span>
                    </div>
                    <span className="font-medium text-slate-900">{territory.county}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100">
                {canClaim ? (
                  <Button 
                    onClick={() => onClaim(territory)}
                    className={`w-full ${
                      isPremium 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isPremium && <Crown className="w-4 h-4 mr-2" />}
                    Claim Territory
                  </Button>
                ) : (
                  <Button variant="outline" disabled className="w-full">
                    <Lock className="w-4 h-4 mr-2" />
                    Upgrade to Claim
                  </Button>
                )}
              </div>

              {/* Premium Badge */}
              {isPremium && (
                <div className="mt-3 text-center">
                  <span className="text-xs text-purple-600 font-medium">Premium Territory</span>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}