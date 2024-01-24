import { Back, PencilSquare, TrashFill } from "react-bootstrap-icons";
import classes from '@/styles//ContextMenu.module.scss';
import { useSelector } from "react-redux";
import { canAddColumn, canDeleteColumn, deleteColumn, duplicateColumn } from "@/utils/columns";

const ColumnMenu = () => {
    const {activeColumn} = useSelector((state: any) => state.pagebuilder);

    const column = document.querySelector(`[data-id="${activeColumn}"]`);
    if (!column) return null;
    const row = column.closest('.ox-section-row') as HTMLElement;
    
    const handleDuplicateClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        duplicateColumn(activeColumn);
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        deleteColumn(activeColumn);
    }
    
    return (
        <>
            <li className={classes.option}>
                <PencilSquare /> <span>Edit Column</span>
            </li>

            {<li className={classes.option} onClick={handleDuplicateClick} data-disabled={!canAddColumn(row)}>
                <Back /> <span>Duplicate</span>
            </li>}
            
            <li className={classes.divider}></li>
            
            <li className={`${classes.option} ${classes.danger}`} onClick={handleDeleteClick} data-disabled={!canDeleteColumn(row)}>
                <TrashFill /> <span>Delete Column</span>
            </li>
        </>
    )
};

export default ColumnMenu;