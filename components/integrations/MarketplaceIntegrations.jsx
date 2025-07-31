import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Shield, Building, CreditCard } from "lucide-react";

const marketplaceApps = [
    {
        name: "Advanced Mortgage Calculator",
        category: "Client Tools",
        description: "Embed a real-time mortgage calculator on your website.",
        icon: Calculator,
        status: "Not Installed"
    },
    {
        name: "Title & Escrow Services",
        category: "Closing Tools",
        description: "Connect with trusted local title and escrow partners.",
        icon: Shield,
        status: "Not Installed"
    },
    {
        name: "Zillow Open House Sync",
        category: "Lead Generation",
        description: "Automatically sync your open house schedule with Zillow.",
        icon: Building,
        status: "Not Installed"
    },
    {
        name: "Client Insurance Quotes",
        category: "Client Tools",
        description: "Offer your clients instant homeowner's insurance quotes.",
        icon: CreditCard,
        status: "Not Installed"
    }
];

export default function MarketplaceIntegrations() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Integrations Marketplace</h2>
            <p className="text-slate-600">
                Enhance your platform by connecting powerful third-party tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {marketplaceApps.map((app, index) => {
                    const Icon = app.icon;
                    return (
                        <Card key={index}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{app.name}</CardTitle>
                                            <Badge variant="outline">{app.category}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-700 mb-4">{app.description}</p>
                                <Button>Install App</Button>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}