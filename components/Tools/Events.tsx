import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pagebuilderActions } from '@/store/slices/pageBuilderSlice';
import { createSectionOptions } from "./SectionOptions";
import { createSectionPadding } from "./SectionPaddingY";

const OxenEvents = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const observeDOM = (obj: Element, callback: MutationCallback) => {
            const MutationObserver = window.MutationObserver;
            if (MutationObserver) {
                const observer = new MutationObserver(callback);
                observer.observe(obj, { childList: true, subtree: true });
                return observer;
            }
        };

        // Section Events
        const handleSectionMouseEnter = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const section = target.closest('.ox-editable-section') as HTMLElement;
            if (section && !section.querySelector('.section-options-container')) {
                const id = section.id;
                dispatch(pagebuilderActions.activeSection(id));
                createSectionOptions(section);
                
                // Checking if the section has padding
                const sectionPadding = section.querySelector('.ox-section-padding-y');
                if (!sectionPadding) {
                    createSectionPadding(section);
                }
            }
        };

        const handleSectionMouseLeave = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const section = target.closest('.ox-editable-section');
            if (section) {

                // Remove the options container
                const optionsContainer = section.querySelector('.section-options-container');
                if (optionsContainer) {
                    section.removeChild(optionsContainer);
                }

                // Remove the padding container
                const paddingContainer = section.querySelector('.ox-section-padding-y-container');
                if (paddingContainer) {
                    section.removeChild(paddingContainer);
                }

                dispatch(pagebuilderActions.activeSection(null));
            }
        };


        // Observer for the dynamic content
        const observer = observeDOM(document.body, function () {

            // Section Events
            const editableSections = document.querySelectorAll('.ox-editable-section');
            editableSections.forEach(section => {
                section.addEventListener('mouseenter', handleSectionMouseEnter);
                section.addEventListener('mouseleave', handleSectionMouseLeave);
            });
        });

        return () => {
            observer?.disconnect(); // Disconnect the observer if it was created

            
            // Section Options Events
            const editableSections = document.querySelectorAll('.ox-editable-section');
            editableSections.forEach(section => {
                section.removeEventListener('mouseenter', handleSectionMouseEnter);
                section.removeEventListener('mouseleave', handleSectionMouseLeave);
            });
        };
    }, []);

    return <></>;
}


export default OxenEvents;