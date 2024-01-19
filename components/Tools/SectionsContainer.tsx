import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import React, { useRef } from 'react';


interface WidgetsContentTypes {
    [key: string]: JSX.Element
}

const widgetsContent: WidgetsContentTypes = {
    "heading": <h1 className='text-3xl'>Hello world</h1>,
    "text-editor": <p className='text-base'>Hello world</p>,
    "button": <button className='bg-primary-500 text-white px-4 py-2 rounded'>Hello world</button>
}


export default function SectionsContainer(){    
    const websiteContent = useRef<HTMLDivElement>(null);

    const { currentlyDragging } = useSelector((state: RootState) => state.widgets);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // This line allows the drop to occur.
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();

        const target = e.target as HTMLDivElement;

        const newWidget = React.createElement(
            widgetsContent[currentlyDragging].type,
            { ...widgetsContent[currentlyDragging].props },
            widgetsContent[currentlyDragging].props.children
        );
    }

    return (
        <div ref={websiteContent} id="ox-website-container" onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDrop={handleDrop}>
            
        </div>
    )
}