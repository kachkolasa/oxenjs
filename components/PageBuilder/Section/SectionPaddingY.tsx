import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

interface SectionPaddingProps {
    height?: number;
}

const SectionPaddingY: React.FC<SectionPaddingProps> = (props) => {
    const [paddingHeight, setPaddingHeight] = useState(props.height || 0);
    const [isDragging, setIsDragging] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            const newHeight = paddingHeight + e.movementY;
            setPaddingHeight(prevHeight => Math.max(0, newHeight)); // Prevents negative padding
        }
    };

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        document.body.classList.add('no-select');
    };

    const stopDragging = () => {
        setIsDragging(false);
        document.body.classList.remove('no-select');
    };

    useEffect(() => {
        const section = ref.current?.closest('.ox-editable-section') as HTMLElement;
        if (!section) return;
        
        section.style.paddingTop = paddingHeight + 'px';
    }, [paddingHeight]);

    return (
        <div
            className='ox-section-padding-y'
            style={{
                paddingTop: paddingHeight + 'px',
                maxHeight: '100%' // or any other value as per your design
            }}
            onMouseDown={onMouseDown}
            onMouseUp={stopDragging}
            onMouseMove={handleMouseMove}
            onMouseLeave={stopDragging}
            ref={ref}
        >
            <span className='ox-label'>{paddingHeight}px</span>
            <div className="ox-handlers">
                <div className='ox-handler'></div>
                <div className='ox-handler'></div>
            </div>
        </div>
    );
};

export const createSectionPadding = (section: HTMLElement) => {
    const paddingTop = section.style.paddingTop ? parseInt(section.style.paddingTop) : 0;

    const container = document.createElement('div');
    container.className = 'ox-section-padding-y-container ox-builder-feature';
    section.prepend(container);
    createRoot(container).render(<SectionPaddingY height={paddingTop} />);
};

export default SectionPaddingY;
