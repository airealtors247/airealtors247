import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp, MapPin } from "lucide-react";

export default function TerritoryStats({ territories }) {
  const calculateStats = () => {
    if (!territories || territories.length === 0) {
      return {
        totalTerritories: 0,
        totalPopulation: 0,
        avgHomePrice: 0,
        hotMarkets: 0
      };
    }

    const totalPopulation = territories.reduce((sum, t) => sum + (t.population || 0), 0);
    const avgHomePrice = territories.reduce((sum, t) => sum + (t.avg_home_price || 0), 0) / territories.length;
    const hotMarkets = territories.filter(t => t.market_activity === 'hot').length;

    return {
      totalTerritories: territories.length,
      totalPopulation,
      avgHomePrice,
      hotMarkets
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: "My Territories",
      value: stats.totalTerritories,
      icon: MapPin,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Total Population",
      value: stats.totalPopulation.toLocaleString(),
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Avg Home Price",
      value: `$${Math.round(stats.avgHomePrice).toLocaleString()}`,
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Hot Markets",
      value: stats.hotMarkets,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <Card key={stat.title} className="shadow-lg border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}