import { default as React } from 'react';

interface CustomTooltipProps {
    content: React.ReactNode;
    children: React.ReactElement;
    position?: 'top' | 'right' | 'bottom' | 'left';
    delay?: number;
}
declare const CustomTooltip: React.FC<CustomTooltipProps>;
export default CustomTooltip;
