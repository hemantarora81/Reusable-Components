import React, { useState, useRef, useEffect, useMemo } from 'react';

interface CustomVirtualScrollProps {
  items: any[];
  itemHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  containerHeight: number;
  overscanCount?: number;
  className?: string;
  containerStyle?: React.CSSProperties;
}

const CustomVirtualScroll: React.FC<CustomVirtualScrollProps> = ({
  items,
  itemHeight,
  renderItem,
  containerHeight,
  overscanCount = 3,
  className = '',
  containerStyle = {}
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  // Calculate visible items
  const { startIndex, endIndex, paddingTop, paddingBottom } = useMemo(() => {
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / itemHeight) - overscanCount
    );
    const endIndex = Math.min(
      items.length - 1,
      startIndex + visibleCount + overscanCount * 2
    );

    const paddingTop = startIndex * itemHeight;
    const paddingBottom = Math.max(
      0,
      (items.length - endIndex - 1) * itemHeight
    );

    return { startIndex, endIndex, paddingTop, paddingBottom };
  }, [scrollTop, items.length, itemHeight, containerHeight, overscanCount]);

  // Update scroll position if items change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollTop;
    }
  }, [items.length]);

  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <div
      ref={containerRef}
      className={`virtual-scroll-container ${className}`}
      style={{
        height: containerHeight,
        overflowY: 'auto',
        ...containerStyle
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: `${items.length * itemHeight}px`,
          position: 'relative'
        }}
      >
        <div style={{ height: `${paddingTop}px` }} />
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: 'absolute',
              top: `${(startIndex + index) * itemHeight}px`,
              width: '100%',
              height: `${itemHeight}px`
            }}
          >
            {renderItem(item, startIndex + index)}
          </div>
        ))}
        <div style={{ height: `${paddingBottom}px` }} />
      </div>
    </div>
  );
};

export default CustomVirtualScroll;