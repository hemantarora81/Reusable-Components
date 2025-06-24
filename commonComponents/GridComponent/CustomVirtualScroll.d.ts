import { default as React } from 'react';

interface CustomVirtualScrollProps {
    items: any[];
    itemHeight: number;
    renderItem: (item: any, index: number) => React.ReactNode;
    containerHeight: number;
    overscanCount?: number;
    className?: string;
    containerStyle?: React.CSSProperties;
}
declare const CustomVirtualScroll: React.FC<CustomVirtualScrollProps>;
export default CustomVirtualScroll;
