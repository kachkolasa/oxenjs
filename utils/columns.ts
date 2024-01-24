import { generateRandomId } from "./helpers";

export const restructureRow = (row: HTMLElement) => {
    const columns = row.querySelectorAll('.ox-section-col');
    const columnCount = columns.length;

    if(columnCount === 0){
        row.remove();
        return;
    }

    row.setAttribute('data-cols', columnCount.toString());
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
    return row.querySelectorAll('.ox-section-col').length < 10;
}

export const canDeleteColumn = (row: HTMLElement) => {
    return row.querySelectorAll('.ox-section-col').length > 1;
}