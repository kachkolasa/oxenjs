import { Back, GearWideConnected, Trash } from 'react-bootstrap-icons';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import Tooltip from '../UI/Tooltip';
import { Provider, useSelector } from 'react-redux';
import store from '@/store';
import { deleteSection, duplicateSection } from '@/utils/sections';

const section_options_class = 'ox-section-options ox-builder-feature';

const SectionOptions = () => {
    const {activeSection} = useSelector((state: any) => state.pagebuilder);

    const handleSectionDuplicate = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        duplicateSection(activeSection);
    }
    
    const handleSectionDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        deleteSection(activeSection);
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
                    <button className='px-3' onClick={handleSectionDuplicate}>
                        <Back />
                    </button>
                </Tooltip>
                <Tooltip text="Delete">
                    <button className='px-3' onClick={handleSectionDelete}>
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
    createRoot(container).render(
        <Provider store={store}>
            <SectionOptions />
        </Provider>
    );
};