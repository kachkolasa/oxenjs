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

    // Pass the parent and the original section as reference
    addSectionToWebsite('after', section, clonedSection);
}