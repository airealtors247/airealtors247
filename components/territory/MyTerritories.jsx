import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, DollarSign, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function MyTerritories({ territories, onRefresh }) {
  const marketActivityColors = {
    hot: "bg-red-100 text-red-800",
    moderate: "bg-yellow-100 text-yellow-800",
    slow: "bg-blue-100 text-blue-800"
  };

  if (!territories || territories.length === 0) {
    return (
      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-600" />
            My Territories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-slate-500">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium mb-2">No territories assigned yet</p>
            <p className="text-sm">Contact your administrator to get assigned exclusive territories</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl text-slate-900 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-600" />
          My Territories ({territories.length})
        </CardTitle>
        <Button variant="outline" onClick={onRefresh} size="sm">
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {territories.map((territory) => (
            <Card key={territory.id} className="border border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900">
                      {territory.city}, {territory.state}
                    </h3>
                    <p className="text-sm text-slate-600">ZIP: {territory.zip_code}</p>
                  </div>
                  <Badge className={marketActivityColors[territory.market_activity] || marketActivityColors.moderate}>
                    {territory.market_activity}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {territory.population && (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">Population:</span>
                      <span className="font-medium text-slate-900">{territory.population.toLocaleString()}</span>
                    </div>
                  )}

                  {territory.avg_home_price && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">Avg Home Price:</span>
                      <span className="font-medium text-slate-900">${territory.avg_home_price.toLocaleString()}</span>
                    </div>
                  )}

                  {territory.exclusivity_expires && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600">Expires:</span>
                      <span className="font-medium text-slate-900">
                        {format(new Date(territory.exclusivity_expires), 'MMM d, yyyy')}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Generate Leads
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}