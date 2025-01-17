import { createRoot } from "react-dom/client";
import { PlusCircleFill } from "react-bootstrap-icons";
import { generateRandomId } from "@/utils/helpers";
import React from "react";
import "@/styles/Website.scss";
import EmptyColumn from "../Column/EmptyColumn";
import { Provider } from "react-redux";
import store from "@/store";
import { restructureAllRows } from "@/utils/rows";

const section_classes = 'ox-section ox-editable-section';

const NewSection = () => {
    return (
        <Provider store={store}>
            <div className="container mx-auto">
                <div className="ox-section-row" data-cols="2">
                    <EmptyColumn />
                    <EmptyColumn />
                </div>
            </div>
        </Provider>
    )
}

const addNewSectionHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    let websiteContainer = document.getElementById('ox-website-container');
    if (!websiteContainer) return console.error('Website container not found');

    // Pass NewSection as a JSX Element
    addSectionToWebsite('end', websiteContainer, <NewSection />);
}


const addSectionToWebsite = (
    position: 'end' | 'start' | 'after',
    target: HTMLElement,
    content: JSX.Element | HTMLElement
) => {
    // Check if the content is a cloned section
    if (content instanceof HTMLElement && content.tagName === 'SECTION') {
        // Append/prepend the cloned section directly based on the specified position
        if (position === 'after') {
            target.insertAdjacentElement('afterend', content);
        } else if (position === 'end') {
            target.appendChild(content);
        } else if (position === 'start') {
            target.prepend(content);
        }
    } else {
        // For JSX elements or non-section HTMLElements
        const section = document.createElement('section');
        section.className = section_classes;
        section.id = generateRandomId();
        section.style.paddingTop = '50px';

        // Append/prepend the new section based on the specified position
        if (position === 'after') {
            target.insertAdjacentElement('afterend', section);
        } else if (position === 'end') {
            target.appendChild(section);
        } else if (position === 'start') {
            target.prepend(section);
        }

        // Render JSX element or append HTMLElement
        if (React.isValidElement(content)) {
            createRoot(section).render(content);
        } else if (content instanceof HTMLElement) {
            section.appendChild(content);
        }
    }

    setTimeout(() => {
        restructureAllRows();
    })
}



const AddNewSection = () => {
    return (
        <div className='w-full h-[400px] flex flex-wrap items-center justify-center bg-zinc-50'>
            <div className='bg-white w-[90%] md:w-[50%] p-5 border-dashed border-2 border-zinc-300 flex flex-wrap items-center justify-center gap-5'>
                <div className='border border-primary-500 flex items-center justify-center flex-col text-center p-5 text-primary-500 rounded cursor-pointer' onClick={addNewSectionHandler}>
                    <div>
                        <PlusCircleFill className='text-3xl' />
                    </div>
                    <div>
                        New section
                    </div>
                </div>
                <div className='border flex items-center justify-center flex-col text-center p-5 text-zinc-400 rounded cursor-pointer'>
                    <div>
                        <PlusCircleFill className='text-3xl' />
                    </div>
                    <div>
                        Select a template
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddNewSection;

export {addSectionToWebsite};