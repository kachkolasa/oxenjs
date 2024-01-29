import { createEmptyColumn } from "@/components/PageBuilder/Column/EmptyColumn";

export const restructureRow = (row: HTMLElement, column_dragging: Boolean = false) => {
    const columns = row.querySelectorAll('.ox-section-col');

    // Checking if any columns has the .ox-empty-column inside and there are widgets inside the column as well
    // If so, remove the .ox-empty-column
    columns.forEach(column => {
        const emptyColumn = column.querySelector('.ox-empty-column');
        if(emptyColumn && column.querySelectorAll('.ox-widget-container').length > 0){
            emptyColumn.remove();
        }
    });

    // If there are no widgets inside the row, add the .ox-empty-column
    columns.forEach(column => {
        if(column.querySelectorAll('.ox-widget-container').length === 0){
            // If there is no .ox-empty-column, add it
            if(!column.querySelector('.ox-empty-column')){
                createEmptyColumn(column as HTMLElement);
            }
        }
    });
    

    const columnCount = columns.length;
    if(columnCount === 0 && !column_dragging){
        row.remove();
        return;
    }

    row.setAttribute('data-cols', columnCount.toString());
}
export const restructureAllRows = (column_dragging: Boolean = false) => {
    const rows = document.querySelectorAll('.ox-section-row');
    rows.forEach(row => restructureRow(row as HTMLElement, column_dragging));
}