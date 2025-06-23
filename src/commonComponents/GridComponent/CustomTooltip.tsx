import React, { useState, useRef, useEffect } from 'react';

interface CustomTooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 300
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement>(null);
  let showTimeout: NodeJS.Timeout;

  const calculatePosition = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    switch (position) {
      case 'top':
        return {
          top: rect.top + scrollY - 5,
          left: rect.left + scrollX + rect.width / 2
        };
      case 'right':
        return {
          top: rect.top + scrollY + rect.height / 2,
          left: rect.left + scrollX + rect.width + 5
        };
      case 'bottom':
        return {
          top: rect.top + scrollY + rect.height + 5,
          left: rect.left + scrollX + rect.width / 2
        };
      case 'left':
        return {
          top: rect.top + scrollY + rect.height / 2,
          left: rect.left + scrollX - 5
        };
      default:
        return { top: 0, left: 0 };
    }
  };

  const showTooltip = () => {
    showTimeout = setTimeout(() => {
      if (targetRef.current) {
        setCoords(calculatePosition(targetRef.current));
        setIsVisible(true);
      }
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(showTimeout);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      clearTimeout(showTimeout);
    };
  }, []);

  return (
    <>
      {React.cloneElement(children, {
        ref: targetRef,
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
        onFocus: showTooltip,
        onBlur: hideTooltip
      })}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`custom-tooltip tooltip-${position}`}
          style={{
            position: 'absolute',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.2s ease'
          }}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </>
  );
};

export default CustomTooltip;