import React, { useState } from 'react';

interface SectionPaddingProps {
    height: number;
}

const SectionPaddingY: React.FC<SectionPaddingProps> = (props) => {
    const [paddingHeight, setPaddingHeight] = useState(props.height);
    const [isDragging, setIsDragging] = useState(false);

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
        >
            <span className='ox-label'>{paddingHeight}px</span>
            <div className="ox-handlers">
                <div className='ox-handler'></div>
                <div className='ox-handler'></div>
            </div>
        </div>
    );
};

export default SectionPaddingY;
