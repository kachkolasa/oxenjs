import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

interface Props {
    padding?: number;
}

const ColumnPaddingLeft = (props: Props) => {
    const [paddingLeft, setPaddingLeft] = useState(props.padding || 0);
    const [isDragging, setIsDragging] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const sensitivity = 5; // Increase for less sensitivity

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            const delta = e.movementX / sensitivity; // Adjust based on sensitivity
            const newPadding = paddingLeft + delta;
            const finalPadding = Math.min(45, Math.max(0, newPadding));

            // Fixing the issue of extra decimal points
            setPaddingLeft(parseFloat(finalPadding.toFixed(2)));
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
        
        column.style.paddingLeft = paddingLeft + '%';
    }, [paddingLeft]);

    return (
        <div 
            className="ox-column-padding-left"
            style={{
                paddingLeft: paddingLeft + '%',
                width: paddingLeft + '%',
                maxWidth: '100%'
            }}
            onMouseDown={onMouseDown}
            onMouseUp={stopDragging}
            onMouseMove={handleMouseMove}
            onMouseLeave={stopDragging}
            ref={ref}
        >
            <span className='ox-label'>{paddingLeft}%</span>
            <div className='ox-handler'></div>
        </div>
    )
}

export const createColumnPaddingLeft = (column: HTMLElement) => {
    const paddingLeft = column.style.paddingLeft ? parseInt(column.style.paddingLeft) : 0;

    const container = document.createElement('div');
    container.className = 'ox-column-padding-left-container ox-builder-feature';
    column.prepend(container);
    createRoot(container).render(<ColumnPaddingLeft padding={paddingLeft} />);
};

export default ColumnPaddingLeft;
