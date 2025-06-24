interface UseColumnResizeProps {
    minWidth?: number;
    maxWidth?: number;
    defaultWidth?: number;
    onResize?: (width: number) => void;
}
interface UseColumnResizeReturn {
    width: number;
    isResizing: boolean;
    resizerProps: {
        onMouseDown: (e: React.MouseEvent) => void;
    };
}
declare const useColumnResize: ({ minWidth, maxWidth, defaultWidth, onResize }: UseColumnResizeProps) => UseColumnResizeReturn;
export default useColumnResize;
