import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { MapPin, ArrowRight, Users, DollarSign, TrendingUp } from "lucide-react";

const marketActivityColors = {
  hot: "bg-red-100 text-red-800 border-red-200",
  moderate: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  slow: "bg-blue-100 text-blue-800 border-blue-200"
};

export default function TerritoryInsights({ territories }) {
  const totalPopulation = territories.reduce((sum, territory) => sum + (territory.population || 0), 0);
  const avgHomePrice = territories.length > 0 
    ? territories.reduce((sum, territory) => sum + (territory.avg_home_price || 0), 0) / territories.length
    : 0;

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-md flex items-center justify-center">
            <MapPin className="w-3 h-3 text-white" />
          </div>
          Territory Insights
        </CardTitle>
        <Button variant="outline" asChild size="sm">
          <Link to={createPageUrl("Territory")}>
            View Map
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {territories.length === 0 ? (
          <div className="text-center py-6 text-slate-500">
            <MapPin className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            <p className="text-sm font-medium mb-1">No territories assigned</p>
            <p className="text-xs">Contact admin to get exclusive areas</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <Users className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                <div className="text-sm font-semibold text-slate-900">
                  {totalPopulation.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500">Total Population</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <DollarSign className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                <div className="text-sm font-semibold text-slate-900">
                  ${avgHomePrice.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500">Avg Home Price</div>
              </div>
            </div>

            {/* Territory List */}
            <div className="space-y-3">
              {territories.slice(0, 3).map((territory) => (
                <div key={territory.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900">
                      {territory.city}, {territory.state}
                    </div>
                    <div className="text-xs text-slate-500">
                      ZIP: {territory.zip_code}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={marketActivityColors[territory.market_activity] || marketActivityColors.moderate}>
                      {territory.market_activity}
                    </Badge>
                    {territory.population && (
                      <div className="text-xs text-slate-500 mt-1">
                        {territory.population.toLocaleString()} people
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {territories.length > 3 && (
                <div className="text-center">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={createPageUrl("Territory")}>
                      View {territories.length - 3} more territories
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}