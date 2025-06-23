import { useState, useRef, useEffect, useCallback } from 'react';

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

const useColumnResize = ({
  minWidth = 50,
  maxWidth = 1000,
  defaultWidth = 150,
  onResize
}: UseColumnResizeProps): UseColumnResizeReturn => {
  
  const [width, setWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    startX.current = e.clientX;
    startWidth.current = width;
    setIsResizing(true);
  }, [width]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = startWidth.current + e.clientX - startX.current;
      const constrainedWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      setWidth(constrainedWidth);
    },
    [isResizing, minWidth, maxWidth]
  );

  const handleMouseUp = useCallback(() => {
    if (!isResizing) return;
    setIsResizing(false);
    onResize?.(width);
  }, [isResizing, width, onResize]);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return {
    width,
    isResizing,
    resizerProps: {
      onMouseDown: handleMouseDown
    }
  };
};

export default useColumnResize;