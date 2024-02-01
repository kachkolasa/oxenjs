import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { pagebuilderActions } from '@/store/slices/pageBuilderSlice';
import { createSectionOptions } from "./Section/SectionOptions";
import { createSectionPadding } from "./Section/SectionPaddingY";
import {
    editable_column_target_class,
    editable_section_target_class,
    editable_widget_target_class
} from "@/utils/editable_classes";
import { createColumnOptions } from "./Column/ColumnOptions";
import createColumnDragImage from "./Column/ColumnDragImage";
import { canAddColumn, getDragAfterElementColumn } from "@/utils/columns";
import { restructureAllRows, restructureRow } from "@/utils/rows";
import createSectionDragImage from "./Section/SectionDragImage";
import { getDragAfterElementSection } from "@/utils/sections";
import { sidenavActions } from "@/store/slices/sidenavSlice";
import { createWidget, widgetsContent } from "./Widgets/Widget";
import { getDragAfterElementWidget } from "@/utils/widgets";

const OxenEvents = () => {
    const dispatch = useDispatch();
    const [leaveTimeoutColumn, setLeaveTimeoutColumn] = useState<number | null>(null);

    useEffect(() => {
        // Cleanup on component unmount
        return () => {
            if (leaveTimeoutColumn !== null) {
                clearTimeout(leaveTimeoutColumn);
            }
        };
    }, [leaveTimeoutColumn]);

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
            const section = target.closest('.' + editable_section_target_class) as HTMLElement;
            if (section && !section.querySelector('.ox-section-options-container')) {
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
            const section = target.closest('.' + editable_section_target_class);
            if (section) {

                // Remove the options container
                const optionsContainer = section.querySelector('.ox-section-options-container');
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
        const handleSectionDragStart = (event: Event) => {
            if(event.target !== event.currentTarget) return;
            const dragEvent = event as DragEvent;
            const target = event.currentTarget as HTMLElement;
            const section = target.closest('.' + editable_section_target_class) as HTMLElement;
            if (section) {
                section.classList.add('dragging');
                createSectionDragImage();
                const image = document.querySelector('.ox-section-drag-image') as HTMLElement;
                if(image){
                    dragEvent.dataTransfer?.setDragImage(image, 60, 60);
                }
            }
        }
        const handleSectionDragEnd = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const section = target.closest('.' + editable_section_target_class) as HTMLElement;
            if (section) {
                section.classList.remove('dragging');
                const dragImage = document.querySelector('.ox-section-drag-image') as HTMLElement;
                if(dragImage){
                    document.body.removeChild(dragImage);
                }
            }
        }

        // Column Events
        const handleColumnMouseEnter = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const column = target.closest('.' + editable_column_target_class) as HTMLElement;
            if (column) {
                const id = column.getAttribute('data-id') as string;
                dispatch(pagebuilderActions.activeColumn(id));
            }

            // Showing the column options
            if(column && !column.querySelector('.ox-column-options-container')){
                createColumnOptions(column);
            }
        }
        const handleColumnMouseLeave = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const column = target.closest('.' + editable_column_target_class) as HTMLElement;

            // Removing the column options
            const optionsContainer = column.querySelector('.ox-column-options-container');
            if(optionsContainer){
                column.removeChild(optionsContainer);
            }
        }
        const handleColumnDragStart = (event: Event) => {
            if(event.target !== event.currentTarget) return;
            const dragEvent = event as DragEvent;
            dragEvent.stopPropagation();
            const target = event.currentTarget as HTMLElement;
            const column = target.closest('.' + editable_column_target_class) as HTMLElement;
            if (column) {
                column.classList.add('dragging');
                createColumnDragImage();

                const image = document.querySelector('.ox-column-drag-image') as HTMLElement;
                if(image){
                    dragEvent.dataTransfer?.setDragImage(image, 60, 60);
                }
            }

            // Removing the section options
            const sectionOptions = document.querySelector('.ox-section-options-container') as HTMLElement;
            if(sectionOptions){
                sectionOptions.remove();
            }
        }
        const handleColumnDragEnd = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const column = target.closest('.' + editable_column_target_class) as HTMLElement;
            if (column) {
                column.classList.remove('dragging');

                const dragImage = document.querySelector('.ox-column-drag-image') as HTMLElement;
                if(dragImage){
                    document.body.removeChild(dragImage);
                }
            }
        }
        const handleColumnDrop = (e: Event) => {
            console.log('column drop')

            // e.stopPropagation();
            e.preventDefault();

            const target = e.target as HTMLDivElement;
    
            const column = target.closest('.ox-section-col');
            if(!column) return;
    
            const row = column.closest('.ox-section-row') as HTMLElement;
            if(!row) return;
            
            const draggingWidget = document.body.getAttribute('data-dragging-widget');
            if(!draggingWidget) return;
            

            const widget = widgetsContent[draggingWidget];
            
            createWidget(column, widget);
            restructureRow(row);

            // Reset the dragging widget
            document.body.removeAttribute('data-dragging-widget');

            // Reset the dragging column
            const columns = document.querySelectorAll('.ox-section-col');
            columns.forEach(column => {
                column.classList.remove('dragging-over');
            });
        }
        const handleColumnDragEnter = (e: Event) => {
            e.stopPropagation();
            e.preventDefault();
        }
        const handleColumnDragOver = (e: Event) => {
            e.preventDefault(); // This line allows the drop to occur.
            // e.stopPropagation();

            const dragEvent = e as DragEvent;
            const target = e.target as HTMLDivElement;
            const column = target.closest('.ox-section-col');
            if(!column) return;

            const draggingWidget = document.body.getAttribute('data-dragging-widget');
            if(!draggingWidget) return;

            // Removing any ox-widget-placeholder 
            document.querySelectorAll('.ox-widget-placeholder').forEach(placeholder => {
                placeholder.remove();
            });
            
            const placeholder = document.createElement('div');
            placeholder.className = 'ox-widget-placeholder';

            // Removing the dragging-over class from all columns
            const columns = document.querySelectorAll('.ox-section-col');
            columns.forEach(column => {
                column.classList.remove('dragging-over');
            });

            column.classList.add('dragging-over');
            
            const afterWidget = getDragAfterElementWidget(column, dragEvent.clientY);
            

            if (placeholder.parentElement !== column) {
                placeholder.parentElement?.removeChild(placeholder);
            }
        
            if (afterWidget) {
                column.insertBefore(placeholder, afterWidget.element);
            } else {
                column.appendChild(placeholder);
            }
        }
        const handleColumnDragLeave = (e: Event) => {
            const dragEvent = e as DragEvent;
            // Clear any existing timeout
            if (leaveTimeoutColumn !== null) {
                clearTimeout(leaveTimeoutColumn);
            }
    
            const target = e.target as HTMLElement;
            const relatedTarget = dragEvent.relatedTarget as HTMLElement;
            const column = target.closest('.ox-section-col');
    
            // Set a new timeout
            const newTimeout = window.setTimeout(() => {
                if (!column || column.contains(relatedTarget)) {
                    return;
                }
    
                column.classList.remove('dragging-over');
    
                // Removing the placeholder
                const placeholder = column.querySelector('.ox-widget-placeholder');
                if (placeholder) {
                    placeholder.remove();
                }
            }, 100);  // Adjust the delay as needed
    
            setLeaveTimeoutColumn(newTimeout);
        };

        // Column Dragging Events
        const handleColumnGrabbleMouseEnter = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const column = target.closest('.' + editable_column_target_class) as HTMLElement;
            if (column) {
                column.setAttribute('draggable', 'true');
            }
        }
        const handleColumnGrabbleMouseLeave = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const column = target.closest('.' + editable_column_target_class) as HTMLElement;
            if (column) {
                column.setAttribute('draggable', 'false');
            }
        }

        // Empty Column Events
        const handleEmptyColumnClick = (event: Event) => {
            event.preventDefault();
            dispatch(sidenavActions.toggleWidgetsModal());
        }

        // Section Dragging Events
        const handleSectionGrabbleMouseEnter = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const section = target.closest('.' + editable_section_target_class) as HTMLElement;
            if (section) {
                section.setAttribute('draggable', 'true');
            }
        }
        const handleSectionGrabbleMouseLeave = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const section = target.closest('.' + editable_section_target_class) as HTMLElement;
            if (section) {
                section.setAttribute('draggable', 'false');
            }
        }

        // Row Dragging Events
        const handleRowDragOver = (event: Event) => {
            const dragEvent = event as DragEvent;
            dragEvent.preventDefault();
            const column = document.querySelector('.dragging.' + editable_column_target_class) as HTMLElement;
            
            if(!column) return; // Exit the function if there is no column being dragged

            // Check if the dragged element is indeed a column
            if (!column.classList.contains('ox-section-col')) {
                return; // Exit the function if it's not a column
            }

            const overRow = event.currentTarget as HTMLElement; // The row being hovered over

            // Checking if row can handle another column
            const can_add_column = canAddColumn(overRow);
            if(!can_add_column) return; // Exit the function if the row can't handle another column

            restructureAllRows(true)

            const afterCol = getDragAfterElementColumn(overRow, dragEvent.clientX);

            if (column.parentElement !== overRow) {
                column.parentElement?.removeChild(column); // Remove from old parent if different
            }

            if (afterCol && afterCol.element && afterCol.element.parentElement === overRow) {
                overRow.insertBefore(column, afterCol.element);
            } else {
                overRow.appendChild(column);
            }
        }

        // Widgets Events
        const handleWidgetMouseEnter = (event: Event) => {
            const target = event.currentTarget as HTMLElement;
            const widget = target.closest('.' + editable_widget_target_class) as HTMLElement;
            if (widget) {
                const id = widget.getAttribute('data-id') as string;
                dispatch(pagebuilderActions.activeWidget(id));
            }
        }

        // Website Builder Events
        const handleBuilderRightClick = (event: MouseEvent) => {
            event.preventDefault();

            // Checking if it was clicked on a section, column, or widget
            const target = event.target as HTMLElement;
            const section = target.closest('.' + editable_section_target_class);
            const column = target.closest('.' + editable_column_target_class);
            const widget = target.closest('.' + editable_widget_target_class);
            
            // Since the widget is inside the column and the column is inside the section
            // So we need to check which one was clicked
            if(widget){
                dispatch(pagebuilderActions.contextMenuTarget("widget"));
            }
            else if(column){
                dispatch(pagebuilderActions.contextMenuTarget("column"));
            }
            else if(section){
                dispatch(pagebuilderActions.contextMenuTarget("section"));
            }
            else{
                dispatch(pagebuilderActions.contextMenuTarget("builder"));
            }

            // Showing the context menu
            const contextMenu = document.querySelector('#ox-context-menu') as HTMLElement;
            if(contextMenu){
                // Checking if there is enough space to show the context menu on the right
                const rightSpace = window.innerWidth - event.clientX;
                contextMenu.style.display = 'block';
                contextMenu.style.top = `${event.clientY}px`;
                
                if(rightSpace < 200){
                    contextMenu.style.left = 'auto';
                    contextMenu.style.right = '0';
                }
                else{
                    contextMenu.style.left = `${event.clientX}px`;
                    contextMenu.style.right = 'auto';
                }
            }
        
        }

        const handleWebsiteContainerDragOver = (event: Event) => {
            const dragEvent = event as DragEvent;
            dragEvent.preventDefault();
            const container = event.currentTarget as HTMLElement;
        
            const section = document.querySelector('.dragging.' + editable_section_target_class) as HTMLElement;
            if (!section || !section.classList.contains('ox-section')) return;
        
            const afterSection = getDragAfterElementSection(container, dragEvent.clientY);
        
            if (section.parentElement !== container) {
                section.parentElement?.removeChild(section);
            }
        
            if (afterSection) {
                container.insertBefore(section, afterSection.element);
            } else {
                container.appendChild(section);
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
            const editableSections = document.querySelectorAll('.' + editable_section_target_class);
            editableSections.forEach(section => {
                section.addEventListener('mouseenter', handleSectionMouseEnter);
                section.addEventListener('mouseleave', handleSectionMouseLeave);
                section.addEventListener('dragstart', handleSectionDragStart);
                section.addEventListener('dragend', handleSectionDragEnd);
            });

            // Section Dragging
            const grabbleSections = document.querySelectorAll('.ox-section-grabble');
            grabbleSections.forEach(section => {
                section.addEventListener('mouseenter', handleSectionGrabbleMouseEnter);
                section.addEventListener('mouseleave', handleSectionGrabbleMouseLeave);
            });

            // Column Events
            const editableColumns = document.querySelectorAll('.' + editable_column_target_class);
            editableColumns.forEach(column => {
                column.addEventListener('mouseenter', handleColumnMouseEnter);
                column.addEventListener('mouseleave', handleColumnMouseLeave);
                column.addEventListener('dragstart', handleColumnDragStart);
                column.addEventListener('dragend', handleColumnDragEnd);
                column.addEventListener('drop', handleColumnDrop);
                column.addEventListener('dragenter', handleColumnDragEnter);
                column.addEventListener('dragover', handleColumnDragOver);
                column.addEventListener('dragleave', handleColumnDragLeave);
            });

            // Column Dragging
            const grabbleColumns = document.querySelectorAll('.ox-column-grabble');
            grabbleColumns.forEach(column => {
                column.addEventListener('mouseenter', handleColumnGrabbleMouseEnter);
                column.addEventListener('mouseleave', handleColumnGrabbleMouseLeave);
            });

            // Empty Columns
            const emptyColumn = document.querySelectorAll('.ox-empty-column');
            emptyColumn.forEach(column => {
                column.addEventListener('click', handleEmptyColumnClick);
            });

            // Rows Events
            const editableRows = document.querySelectorAll('.ox-section-row');
            editableRows.forEach(row => {
                row.addEventListener('dragover', handleRowDragOver);
            });

            // Widget
            const widgets = document.querySelectorAll('.' + editable_widget_target_class);
            widgets.forEach(widget => {
                widget.addEventListener('mouseenter', handleWidgetMouseEnter);
            });

            // Website Builder Container
            const websiteContainer = document.getElementById('ox-website-container');
            if(websiteContainer){
                // Context Menu Event
                websiteContainer.addEventListener('contextmenu', handleBuilderRightClick);
                websiteContainer.addEventListener("dragover", handleWebsiteContainerDragOver);
            }
        });

        return () => {
            observer?.disconnect(); // Disconnect the observer if it was created
            
            // Section Options Events
            const editableSections = document.querySelectorAll('.' + editable_section_target_class);
            editableSections.forEach(section => {
                section.removeEventListener('mouseenter', handleSectionMouseEnter);
                section.removeEventListener('mouseleave', handleSectionMouseLeave);
                section.removeEventListener('dragstart', handleSectionDragStart);
                section.removeEventListener('dragend', handleSectionDragEnd);
            });

            // Section Dragging
            const grabbleSections = document.querySelectorAll('.ox-section-grabble');
            grabbleSections.forEach(section => {
                section.removeEventListener('mouseenter', handleSectionGrabbleMouseEnter);
                section.removeEventListener('mouseleave', handleSectionGrabbleMouseLeave);
            });

            // Column Events
            const editableColumns = document.querySelectorAll('.' + editable_column_target_class);
            editableColumns.forEach(column => {
                column.removeEventListener('mouseenter', handleColumnMouseEnter);
                column.removeEventListener('mouseleave', handleColumnMouseLeave);
                column.removeEventListener('dragstart', handleColumnDragStart);
                column.removeEventListener('dragend', handleColumnDragEnd);
                column.removeEventListener('drop', handleColumnDrop);
                column.removeEventListener('dragenter', handleColumnDragEnter);
                column.removeEventListener('dragover', handleColumnDragOver);
                column.removeEventListener('dragleave', handleColumnDragLeave);
            });

            // Column Dragging
            const grabbleColumns = document.querySelectorAll('.ox-column-grabble');
            grabbleColumns.forEach(column => {
                column.removeEventListener('mouseenter', handleColumnGrabbleMouseEnter);
                column.removeEventListener('mouseleave', handleColumnGrabbleMouseLeave);
            });

            // Rows Events
            const editableRows = document.querySelectorAll('.ox-section-row');
            editableRows.forEach(row => {
                row.removeEventListener('dragover', handleRowDragOver);
            });

            // Website Builder Container
            const websiteContainer = document.getElementById('ox-website-container');
            if(websiteContainer){
                // Context Menu Event
                websiteContainer.removeEventListener('contextmenu', handleBuilderRightClick);
                websiteContainer.removeEventListener("dragover", handleWebsiteContainerDragOver);
            }
        };
    }, []);

    return <></>;
}


export default OxenEvents;