"use client";

import { RootState } from '@/store';
import classes from '@/styles/PageBuilder.module.scss';
import React, {useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '@/styles/PageBuilder.scss';
import { GearWideConnected } from 'react-bootstrap-icons';
import ReactDOM from 'react-dom';
import { pagebuilderActions } from '@/store/slices/pageBuilderSlice';


interface WidgetsContentTypes {
    [key: string]: JSX.Element
}

const widgetsContent: WidgetsContentTypes = {
    "heading": <h1 className='text-3xl'>Hello world</h1>,
    "text-editor": <p className='text-base'>Hello world</p>,
    "button": <button className='bg-primary-500 text-white px-4 py-2 rounded'>Hello world</button>
}
const SectionOptions = () => {
    return (
        <div className={section_options_class}>
            <button className='flex gap-2 items-center p-2 pr-3'>
                <span className="w-[25px] h-[25px] rounded-full bg-primary-500 text-white flex items-center justify-center"><GearWideConnected /></span> Section
            </button>
        </div>
    );
};

const section_options_class = 'ox-section-options';

export default function PageBuilder(){
    const dispatch = useDispatch();
    const [activeSection, setActiveSection] = useState<Element | null>(null);
    // const [components, setComponents] = React.useState<JSX.Element[]>([]);

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

    const createSectionOptions = (section: Element) => {
        const container = document.createElement('div');
        container.className = 'section-options-container';
        section.appendChild(container);
        ReactDOM.render(<SectionOptions />, container);
    };

    useEffect(() => {
        const handleMouseEnter = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const section = target.closest('.ox-editable-section');
            if (section && !section.querySelector('.section-options-container')) {
                dispatch(pagebuilderActions.activeSection(section));
                createSectionOptions(section);
            }
        };

        const handleMouseLeave = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const section = target.closest('.ox-editable-section');
            if (section) {
                const optionsContainer = section.querySelector('.section-options-container');
                if (optionsContainer) {
                    ReactDOM.unmountComponentAtNode(optionsContainer);
                    section.removeChild(optionsContainer);
                }
                dispatch(pagebuilderActions.activeSection(null));
            }
        };

        const observeDOM = (obj: Element, callback: MutationCallback) => {
            const MutationObserver = window.MutationObserver;
            if (MutationObserver) {
                const observer = new MutationObserver(callback);
                observer.observe(obj, { childList: true, subtree: true });
                return observer;
            }
        };

        // Observer for the dynamic content
        const observer = observeDOM(document.body, function () {
            const editableSections = document.querySelectorAll('.ox-editable-section');
            editableSections.forEach(section => {
                section.addEventListener('mouseenter', handleMouseEnter);
                section.addEventListener('mouseleave', handleMouseLeave);
            });
        });

        return () => {
            observer?.disconnect(); // Disconnect the observer if it was created
            const editableSections = document.querySelectorAll('.ox-editable-section');
            editableSections.forEach(section => {
                section.removeEventListener('mouseenter', handleMouseEnter);
                section.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    


    return (
        <div ref={websiteContent} className={classes.website} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDrop={handleDrop}>
            <section className='ox-section ox-editable-section'>
                <div className="container mx-auto">
                    <div className="grid grid-cols-2" style={{
                        paddingTop: '3%',
                        paddingBottom: '3%'
                    }}>
                        <div className="col-span-1">
                            <h1 className='text-3xl'>Hello world</h1>
                        </div>
                        <div className="col-span-1">
                            <p className='text-base'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, sint libero iure voluptates quas corporis qui impedit obcaecati numquam totam incidunt est quod, ipsa facere beatae quam similique! Libero, fuga?</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}