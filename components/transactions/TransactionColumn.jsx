import React from 'react';
import { Droppable, Draggable } from "@hello-pangea/dnd";
import TransactionCard from './TransactionCard';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TransactionColumn({ stageId, title, transactions }) {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-semibold text-slate-800 mb-3 px-2 flex justify-between items-center">
        <span>{title}</span>
        <span className="text-sm font-normal bg-slate-200 text-slate-600 rounded-full px-2 py-0.5">
          {transactions.length}
        </span>
      </h3>
      <Droppable droppableId={stageId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`bg-slate-100 rounded-xl p-3 min-h-[500px] transition-colors duration-200 ${
              snapshot.isDraggingOver ? 'bg-blue-100' : ''
            }`}
          >
            {transactions.map((transaction, index) => (
              <Draggable key={transaction.id} draggableId={transaction.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-3"
                  >
                    <TransactionCard transaction={transaction} isDragging={snapshot.isDragging} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}