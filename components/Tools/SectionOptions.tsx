import { ArrowsMove, GearWideConnected } from 'react-bootstrap-icons';
import { pagebuilderActions } from '@/store/slices/pageBuilderSlice';
import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const section_options_class = 'ox-section-options';

const SectionOptions = () => {
    return (
        <div className={section_options_class}>
            <button className='p-2 px-3 bg-zinc-500 text-white text-lg cursor-grab'>
                <ArrowsMove />
            </button>
            <button className='flex gap-2 items-center p-2 pr-3'>
                <span className="w-[25px] h-[25px] rounded-full bg-primary-500 text-white flex items-center justify-center"><GearWideConnected /></span> Section
            </button>
        </div>
    );
};

const createSectionOptions = (section: Element) => {
    const container = document.createElement('div');
    container.className = 'section-options-container';
    section.appendChild(container);
    createRoot(container).render(<SectionOptions />);
};

const SectionOptionsContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleMouseEnter = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const section = target.closest('.ox-editable-section');
            if (section && !section.querySelector('.section-options-container')) {
                const id = section.id;
                dispatch(pagebuilderActions.activeSection(id));
                createSectionOptions(section);
            }
        };

        const handleMouseLeave = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const section = target.closest('.ox-editable-section');
            if (section) {
                const optionsContainer = section.querySelector('.section-options-container');
                if (optionsContainer) {
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
        <></>
    )
}

export default SectionOptionsContainer;