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
declare const useColumnReorder: ({ initialOrder, onReorder }: UseColumnReorderProps) => UseColumnReorderReturn;
export default useColumnReorder;
