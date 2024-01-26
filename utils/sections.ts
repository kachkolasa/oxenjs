import { addSectionToWebsite } from "@/components/PageBuilder/Section/AddNewSection";
import { generateRandomId } from "./helpers";

// Delete Section 
export const deleteSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) return;

    section.remove();
}

// Duplicate Section
export const duplicateSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Get the parent of the original section
    let websiteContainer = section.parentNode;
    if (!websiteContainer) return console.error('Parent container not found');
    
    const clonedSection = section.cloneNode(true) as HTMLElement;

    // Remove the id from the cloned section
    clonedSection.removeAttribute('id');

    // New id for the cloned section
    const newId = generateRandomId();
    clonedSection.setAttribute('id', newId);

    clonedSection.querySelectorAll('.ox-builder-feature').forEach(el => el.remove());

    // Adding the new id to the section's all elements that has an data-id or id attribute
    clonedSection.querySelectorAll('[data-id], [id]').forEach(el => {
        const newId = generateRandomId();

        // Checking if the element has an id attribute
        if(el.hasAttribute("id")){
            el.setAttribute('id', newId);
        }
        if(el.hasAttribute("data-id")){
            el.setAttribute('data-id', newId);
        }
    });

    // Pass the parent and the original section as reference
    addSectionToWebsite('after', section, clonedSection);
}

export const getDragAfterElementSection = (container: HTMLElement, y: number) => {
    const draggableSections = Array.from(container.querySelectorAll('.ox-section:not(.dragging)')) as HTMLElement[];

    return draggableSections.reduce<{ offset: number; element: HTMLElement | null }>((closest, section) => {
        const box = section.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset, element: section };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY, element: null });
}