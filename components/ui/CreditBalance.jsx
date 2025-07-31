import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Coins, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function CreditBalance({ user, showPurchaseButton = true }) {
  const credits = user?.credits_remaining || 0;
  const isLowCredits = credits < 100;

  return (
    <div className={`flex items-center gap-3 ${isLowCredits ? 'animate-pulse' : ''}`}>
      <div className="flex items-center gap-2">
        <Coins className={`w-5 h-5 ${isLowCredits ? 'text-red-500' : 'text-blue-600'}`} />
        <Badge 
          variant={isLowCredits ? "destructive" : "secondary"}
          className="text-sm font-semibold"
        >
          {credits.toLocaleString()} Credits
        </Badge>
      </div>
      
      {showPurchaseButton && (
        <Button 
          asChild 
          size="sm" 
          variant={isLowCredits ? "default" : "outline"}
          className={isLowCredits ? "bg-red-600 hover:bg-red-700" : ""}
        >
          <Link to={createPageUrl("CreditPurchase")}>
            <Plus className="w-4 h-4 mr-1" />
            {isLowCredits ? "Buy Credits" : "Add Credits"}
          </Link>
        </Button>
      )}
    </div>
  );
}