import { Back, GearWideConnected, Trash } from 'react-bootstrap-icons';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import Tooltip from '../UI/Tooltip';
import { addSectionToWebsite } from './AddNewSection';

const section_options_class = 'ox-section-options ox-builder-feature';

const SectionOptions = () => {
    const [isHover, setIsHover] = useState(false);

    const handleDuplicate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        const section = e.currentTarget.closest('.ox-editable-section') as HTMLElement;
        if (!section) return;
    
        // Get the parent of the original section
        let websiteContainer = section.parentNode;
        if (!websiteContainer) return console.error('Parent container not found');
        
        const clonedSection = section.cloneNode(true) as HTMLElement;
        clonedSection.querySelectorAll('.ox-builder-feature').forEach(el => el.remove());
    
        // Pass the parent and the original section as reference
        addSectionToWebsite('after', section, clonedSection);
    }
    
    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    
        const section = e.currentTarget.closest('.ox-editable-section');
    
        if (!section) return;
    
        section.remove();
    }

    return (
        <div className={section_options_class}>
            {/* Section Settings */}
            <Tooltip text="Settings">
                <button className='flex gap-2 items-center p-2 pr-3 sec-btn'>
                    <span className="w-[25px] h-[25px] rounded-full bg-primary-500 text-white flex items-center justify-center"><GearWideConnected /></span> Section
                </button>
            </Tooltip>

            {/* Section Additional Options */}
            <div className="ox-section-additional-options">
                <Tooltip text="Duplicate">
                    <button className='px-3' onClick={handleDuplicate}>
                        <Back />
                    </button>
                </Tooltip>
                <Tooltip text="Delete">
                    <button className='px-3' onClick={handleDelete}>
                        <Trash />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export const createSectionOptions = (section: Element) => {
    const container = document.createElement('div');
    container.className = 'section-options-container';
    section.appendChild(container);
    createRoot(container).render(<SectionOptions />);
};