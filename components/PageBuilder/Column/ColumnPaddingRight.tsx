import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

interface Props {
    padding?: number;
}

const ColumnPaddingRight = (props: Props) => {
    const [paddingRight, setPaddingRight] = useState(props.padding || 0);
    const [isDragging, setIsDragging] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const sensitivity = 5; // Increase for less sensitivity

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            // Reversing the movement to make it feel natural
            const movement = -e.movementX;

            const delta = movement / sensitivity; // Adjust based on sensitivity
            const newPadding = paddingRight + delta;
            const finalPadding = Math.min(45, Math.max(0, newPadding));

            // Fixing the issue of extra decimal points
            setPaddingRight(parseFloat(finalPadding.toFixed(2)));
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
        const column = ref.current?.closest('.ox-editable-column') as HTMLElement;
        if (!column) return;
        
        column.style.paddingRight = paddingRight + '%';
    }, [paddingRight]);

    return (
        <div 
            className="ox-column-padding-right"
            style={{
                paddingRight: paddingRight + '%',
                width: paddingRight + '%',
                maxWidth: '100%'
            }}
            onMouseDown={onMouseDown}
            onMouseUp={stopDragging}
            onMouseMove={handleMouseMove}
            onMouseLeave={stopDragging}
            ref={ref}
        >
            <span className='ox-label'>{paddingRight}%</span>
            <div className='ox-handler'></div>
        </div>
    )
}

export const createColumnPaddingRight = (column: HTMLElement) => {
    const paddingRight = column.style.paddingRight ? parseInt(column.style.paddingRight) : 0;

    const container = document.createElement('div');
    container.className = 'ox-column-padding-right-container ox-builder-feature';
    column.prepend(container);
    createRoot(container).render(<ColumnPaddingRight padding={paddingRight} />);
};

export default ColumnPaddingRight;
