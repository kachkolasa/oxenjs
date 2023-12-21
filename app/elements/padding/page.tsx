"use client";

import React, { useState, useCallback, useEffect } from 'react';

interface UseResizableProps {
  initialPadding?: number;
}

interface ResizableBoxProps {
  children: React.ReactNode;
  initialPadding?: number;
}

// Hook that manages the resizable behavior
const useResizable = ({ initialPadding = 20 }: UseResizableProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [paddingRight, setPaddingRight] = useState(initialPadding);

  const onMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    setStartX(event.clientX);
    setIsDragging(true);

    // Prevents text selection
    event.preventDefault();
  }, []);

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging) {
        const deltaX = event.clientX - startX;
        setPaddingRight((prevPadding) => Math.max(0, prevPadding + deltaX));
        setStartX(event.clientX);
      }
    },
    [isDragging, startX]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => onMouseMove(event);
    const handleMouseUp = () => onMouseUp();

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onMouseMove, onMouseUp]);

  return { paddingRight, onMouseDown };
};

// Your ResizableBox component now takes children and an initialPadding prop
const ResizableBox: React.FC<ResizableBoxProps> = ({ children, initialPadding }) => {
  const { paddingRight, onMouseDown } = useResizable({ initialPadding });

  return (
    <div className="bg-zinc-100 border border-zinc-200 rounded w-[300px] h-[300px] relative" style={{ paddingRight }}>
      {children}
      <div className="bg-primary-500 absolute top-[50%] right-0 translate-y-[-50%] h-10 w-2 rounded cursor-e-resize" onMouseDown={onMouseDown} />
    </div>
  );
};

// Usage in a page builder
const PageBuilder: React.FC = () => {
  // You can have multiple resizable components in your page builder
  return (
    <div>
      <ResizableBox initialPadding={20}>
        <p>Some text inside a resizable component</p>
      </ResizableBox>
      {/* ... other components ... */}
    </div>
  );
};

export default PageBuilder;
