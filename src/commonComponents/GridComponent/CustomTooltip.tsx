import React, { 
  useState, 
  useRef, 
  useEffect, 
  ForwardedRef, 
  forwardRef, 
  ReactElement,
  RefAttributes
} from 'react';

interface CustomTooltipProps {
  content: React.ReactNode;
  children: ReactElement & RefAttributes<HTMLElement>;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  darkMode?: boolean;
}

const CustomTooltip = ({
  content,
  children,
  position = 'top',
  delay = 300,
  darkMode = false
}: CustomTooltipProps) => {
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

  // Clone the child element with proper ref handling
  const childWithProps = React.cloneElement(children, {
    ref: (node: HTMLElement | null) => {
      // Keep the original ref if it exists
      if (typeof children.ref === 'function') {
        children.ref(node);
      } else if (children.ref) {
        (children.ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
      // Set our ref
      targetRef.current = node;
    },
    onMouseEnter: (e: React.MouseEvent) => {
      children.props.onMouseEnter?.(e);
      showTooltip();
    },
    onMouseLeave: (e: React.MouseEvent) => {
      children.props.onMouseLeave?.(e);
      hideTooltip();
    },
    onFocus: (e: React.FocusEvent) => {
      children.props.onFocus?.(e);
      showTooltip();
    },
    onBlur: (e: React.FocusEvent) => {
      children.props.onBlur?.(e);
      hideTooltip();
    }
  });

  return (
    <>
      {childWithProps}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`custom-tooltip tooltip-${position} ${darkMode ? 'dark-mode' : ''}`}
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