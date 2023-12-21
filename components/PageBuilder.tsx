import { RootState } from '@/store';
import classes from '@/styles/PageBuilder.module.scss';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

interface WidgetsContentTypes {
    [key: string]: JSX.Element
}

const widgetsContent: WidgetsContentTypes = {
    "heading": <h1 className='text-3xl'>Hello world</h1>,
    "text-editor": <p className='text-base'>Hello world</p>,
    "button": <button className='bg-primary-500 text-white px-4 py-2 rounded'>Hello world</button>
}

export default function PageBuilder(){
    // const [components, setComponents] = React.useState<JSX.Element[]>([]);

    const websiteContent = useRef<HTMLDivElement>(null);

    const { currentlyDragging } = useSelector((state: RootState) => state.widgets);

    const dragEntered = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
    }

    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // This line allows the drop to occur.
    }

    const dropped = (e: React.DragEvent<HTMLDivElement>) => {
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
        <div ref={websiteContent} className={classes.website} onDragOver={dragOver} onDragEnter={dragEntered} onDrop={dropped}>
            <div className="p-20 bg-black"></div>
        </div>
    )
}