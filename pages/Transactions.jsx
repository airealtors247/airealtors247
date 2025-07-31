import React, { useState, useEffect } from "react";
import { Transaction } from "@/api/entities";
import { User } from "@/api/entities";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import TransactionColumn from "../components/transactions/TransactionColumn";
import { Plus, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const transactionStages = [
  "prospect",
  "under_contract",
  "inspection",
  "appraisal",
  "financing",
  "closing",
  "closed",
  "failed"
];

const stageTitles = {
  prospect: "Prospects",
  under_contract: "Under Contract",
  inspection: "Inspections",
  appraisal: "Appraisals",
  financing: "Financing",
  closing: "Closing",
  closed: "Closed Deals",
  failed: "Failed Deals"
};

export default function TransactionsPage() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [userData, transData] = await Promise.all([
        User.me(),
        Transaction.list("-created_date")
      ]);
      setUser(userData);
      setTransactions(transData.filter(t => t.realtor_email === userData.email));
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
    setIsLoading(false);
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    const movedTransaction = transactions.find(t => t.id === draggableId);
    if (movedTransaction) {
        try {
            await Transaction.update(draggableId, { status: destination.droppableId });
            loadData(); // Re-fetch to confirm state
        } catch(error) {
            console.error("Failed to update transaction status:", error);
            // Optionally revert UI on error
        }
    }
  };
  
  const transactionsByStage = transactionStages.reduce((acc, stage) => {
    acc[stage] = transactions.filter(t => t.status === stage);
    return acc;
  }, {});
  
  const totalValueUnderContract = transactionsByStage.under_contract?.reduce((sum, t) => sum + t.deal_value, 0) || 0;
  const totalValueClosed = transactionsByStage.closed?.reduce((sum, t) => sum + t.deal_value, 0) || 0;


  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-blue-600" />
            Transaction Pipeline
          </h1>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Transaction
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader>
                    <CardTitle>Deals in Pipeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{transactions.filter(t => t.status !== 'closed' && t.status !== 'failed').length}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Value Under Contract</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">${totalValueUnderContract.toLocaleString()}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Total Value Closed (YTD)</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">${totalValueClosed.toLocaleString()}</p>
                </CardContent>
            </Card>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-5">
            {transactionStages.map((stageId) => (
              <TransactionColumn
                key={stageId}
                stageId={stageId}
                title={stageTitles[stageId]}
                transactions={transactionsByStage[stageId]}
              />
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}