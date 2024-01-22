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
            }
        };

        // Column Events
        const handleColumnMouseEnter = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const column = target.closest('.ox-section-col') as HTMLElement;
            if (column) {
                const id = column.id;
                dispatch(pagebuilderActions.activeColumn(id));
            }
        }

        // Website Builder Events
        const handleBuilderRightClick = (event: MouseEvent) => {
            event.preventDefault();
            
            // Showing the context menu
            const contextMenu = document.querySelector('#ox-context-menu') as HTMLElement;
            if(contextMenu){
                contextMenu.style.display = 'block';
                contextMenu.style.top = `${event.clientY}px`;
                contextMenu.style.left = `${event.clientX}px`;
            }
        }
        // Hide the context menu when clicked outside
        document.addEventListener('click', (event) => {
            const contextMenu = document.querySelector('#ox-context-menu') as HTMLElement;
            if(contextMenu){
                contextMenu.style.display = 'none';
            }
        });



        // Observer for the dynamic content
        const observer = observeDOM(document.body, function () {

            // Section Events
            const editableSections = document.querySelectorAll('.ox-editable-section');
            editableSections.forEach(section => {
                section.addEventListener('mouseenter', handleSectionMouseEnter);
                section.addEventListener('mouseleave', handleSectionMouseLeave);
            });

            // Column Events
            const editableColumns = document.querySelectorAll('.ox-section-col');
            editableColumns.forEach(column => {
                column.addEventListener('mouseenter', handleColumnMouseEnter);
                // column.addEventListener('mouseleave', handleSectionMouseLeave);
            });

            // Website Builder Container
            const websiteContainer = document.getElementById('ox-website-container');
            if(websiteContainer){
                // Right Click Event
                websiteContainer.addEventListener('contextmenu', handleBuilderRightClick);
            }
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