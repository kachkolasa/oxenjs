export const restructureRow = (row: HTMLElement, column_dragging: Boolean = false) => {
    const columns = row.querySelectorAll('.ox-section-col');
    const columnCount = columns.length;
    
    if(columnCount === 0 && !column_dragging){
        row.remove();
        return;
    }

    row.setAttribute('data-cols', columnCount.toString());
}

const ifEmptyRow = (row: HTMLElement) => {
    const columns = row.querySelectorAll('.ox-section-col');
    const columnCount = columns.length;

    if(columnCount === 0){
        
    }
}