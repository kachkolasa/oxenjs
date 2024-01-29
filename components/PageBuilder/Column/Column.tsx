import { editable_column_target_class } from "@/utils/editable_classes"
import { generateRandomId } from "@/utils/helpers";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { createWidget, widgetsContent } from "../Widgets/Widget";
import { restructureRow } from "@/utils/rows";
import { useEffect } from "react";

interface Props {
    children: JSX.Element;
}

const Column = () => {
    // const { currentlyDragging: draggingWidget } = useSelector((state: RootState) => state.widgets);

    // useEffect(() => {
    //     const handleDragEnter = (e: Event) => {
    //         e.stopPropagation();
    //         e.preventDefault();
    //     }
    
    //     const handleDragOver = (e: Event) => {
    //         e.preventDefault(); // This line allows the drop to occur.
    //     }
    
    //     const handleDrop = (e: Event) => {
    //         e.stopPropagation();
    //         e.preventDefault();
    
    //         const target = e.target as HTMLDivElement;
    
    //         const column = target.closest('.ox-section-col');
    //         if(!column) return;
    
    //         const row = column.closest('.ox-section-row') as HTMLElement;
    //         if(!row) return;
    
    //         const widget = widgetsContent[draggingWidget];
            
    //         createWidget(column, widget);
    //         restructureRow(row);
    //     }

    //     const columns = document.querySelectorAll('.ox-section-col');
    //     columns.forEach(column => {
    //         column.addEventListener('dragenter', handleDragEnter);
    //         column.addEventListener('dragover', handleDragOver);
    //         column.addEventListener('drop', handleDrop);
    //     });

    //     return () => {
    //         columns.forEach(column => {
    //             column.removeEventListener('dragenter', handleDragEnter);
    //             column.removeEventListener('dragover', handleDragOver);
    //             column.removeEventListener('drop', handleDrop);
    //         });
    //     }
    // }, [draggingWidget]);
    

    return (
            <div className={`ox-section-col ${editable_column_target_class}`} data-id={generateRandomId()}>
                
            </div>
    )
}

export default Column;