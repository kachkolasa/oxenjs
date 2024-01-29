import { editable_column_target_class } from "./editable_classes";
import { generateRandomId } from "./helpers";
import { restructureRow } from "./rows";



export const restructureAllRows = (column_dragging: Boolean = false) => {
    const rows = document.querySelectorAll('.ox-section-row');
    rows.forEach(row => restructureRow(row as HTMLElement, column_dragging));
}

// Delete Column 
export const deleteColumn = (columnId: string) => {
    // Getting the column element by data-id
    const column = document.querySelector(`[data-id="${columnId}"]`) as HTMLElement;
    if(!column) return;

    const row = column.closest('.ox-section-row') as HTMLElement;
    if(!row) return;

    if(!canDeleteColumn(row)) return;

    column.remove();
    restructureRow(row!);
}

// Duplicate Column
export const duplicateColumn = (columnId: string) => {
    // Getting the column element by data-id
    const column = document.querySelector(`[data-id="${columnId}"]`) as HTMLElement;
    if(!column) return;

    const row = column.closest('.ox-section-row') as HTMLElement;
    if(!row) return;
    if(!canAddColumn(row)) return;

    const newColumn = column.cloneNode(true) as HTMLElement;
    
    // Generating a new id for the column
    const newId = generateRandomId();
    newColumn.setAttribute('data-id', newId);

    // Adding the new column to the row beside the original column
    column.insertAdjacentElement('afterend', newColumn);
    restructureRow(row);
}

export const canAddColumn = (row: HTMLElement) => {
    return row.querySelectorAll('.ox-section-col:not(.dragging)').length < 10;
}

export const canDeleteColumn = (row: HTMLElement) => {
    return row.querySelectorAll('.ox-section-col').length > 1;
}

export const getDragAfterElementColumn = (row: HTMLElement, x: number) => {
    const draggableElements = Array.from(row.querySelectorAll('.ox-section-col:not(.dragging)')) as HTMLElement[];

    return draggableElements.reduce<{ offset: number; element: HTMLElement | null }>((closest, child) => {
        const box = child.getBoundingClientRect();
        const boxMiddleX = box.left + box.width / 2;
        const offset = x - boxMiddleX;

        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY, element: null });
}


