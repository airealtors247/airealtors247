import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, User, Home } from "lucide-react";

export default function TransactionCard({ transaction, isDragging }) {
  return (
    <Card className={`shadow-md hover:shadow-lg transition-shadow duration-200 ${isDragging ? 'shadow-2xl' : ''}`}>
      <CardContent className="p-4 space-y-2">
        <p className="font-semibold text-slate-900 leading-tight">
          {transaction.listing_id || "No Listing Attached"}
        </p>
        <div className="text-sm text-slate-600 space-y-1">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3" />
            <span>{transaction.client_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-3 h-3" />
            <span>{transaction.deal_value.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}