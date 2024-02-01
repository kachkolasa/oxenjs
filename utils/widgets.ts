import { generateRandomId } from "./helpers";
import { restructureRow } from "./rows";

// Delete Widget
export const deleteWidget = (widgetId: string) => {
    // Getting the widget element by data-id
    const widget = document.querySelector(`[data-id="${widgetId}"]`) as HTMLElement;
    if(!widget) return;

    const row = widget.closest('.ox-section-row') as HTMLElement;
    if(!row) return;

    const widgetContainer = widget.closest('.ox-widget-container') as HTMLElement;
    widgetContainer.remove();
    restructureRow(row!);
}

// Duplicate Widget
export const duplicateWidget = (widgetId: string) => {
    // Getting the widget element by data-id
    const widget = document.querySelector(`[data-id="${widgetId}"]`) as HTMLElement;
    if(!widget) return;

    const row = widget.closest('.ox-section-row') as HTMLElement;
    if(!row) return;

    const widgetContainer = widget.closest(".ox-widget-container") as HTMLElement;
    const newWidget = widgetContainer.cloneNode(true) as HTMLElement;

    // Generating a new id for the widget
    const newId = generateRandomId();
    newWidget.setAttribute('data-id', newId);

    // Adding the new widget to the row beside the original widget
    widgetContainer.insertAdjacentElement('afterend', newWidget);
    restructureRow(row);
}


export const getDragAfterElementWidget = (column: Element, y: number) => {
    const draggableSections = Array.from(column.querySelectorAll('.ox-widget-container:not(.dragging)')) as HTMLElement[];

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