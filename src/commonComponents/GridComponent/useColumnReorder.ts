import { useState } from 'react';

interface UseColumnReorderProps {
  initialOrder: string[];
  onReorder?: (newOrder: string[]) => void;
}

interface UseColumnReorderReturn {
  columnOrder: string[];
  draggedColumn: string | null;
  dropTarget: string | null;
  handleDragStart: (columnId: string) => void;
  handleDragOver: (columnId: string) => void;
  handleDrop: () => void;
  handleDragEnd: () => void;
  resetColumnOrder: () => void;
}

const useColumnReorder = ({
  initialOrder,
  onReorder
}: UseColumnReorderProps): UseColumnReorderReturn => {
  const [columnOrder, setColumnOrder] = useState<string[]>(initialOrder);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);

  const handleDragStart = (columnId: string) => {
    setDraggedColumn(columnId);
  };

  const handleDragOver = (columnId: string) => {
    if (!draggedColumn || columnId === draggedColumn) return;
    setDropTarget(columnId);
  };

  const handleDrop = () => {
    if (!draggedColumn || !dropTarget || draggedColumn === dropTarget) {
      handleDragEnd();
      return;
    }

    const newOrder = [...columnOrder];
    const fromIndex = newOrder.indexOf(draggedColumn);
    const toIndex = newOrder.indexOf(dropTarget);

    newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, draggedColumn);

    setColumnOrder(newOrder);
    onReorder?.(newOrder);
    handleDragEnd();
  };

  const handleDragEnd = () => {
    setDraggedColumn(null);
    setDropTarget(null);
  };

  const resetColumnOrder = () => {
    setColumnOrder(initialOrder);
  };

  return {
    columnOrder,
    draggedColumn,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    resetColumnOrder
  };
};

export default useColumnReorder;