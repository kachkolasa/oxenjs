import { Back, PencilSquare, TrashFill } from "react-bootstrap-icons";
import classes from '@/styles//ContextMenu.module.scss';
import { useSelector } from "react-redux";
import { deleteWidget, duplicateWidget } from "@/utils/widgets";

const WidgetMenu = () => {
    const {activeWidget} = useSelector((state: any) => state.pagebuilder);

    const widget = document.querySelector(`[data-id="${activeWidget}"]`);
    if (!widget) return null;
    
    const handleDuplicateClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        duplicateWidget(activeWidget);
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        deleteWidget(activeWidget);
    }
    
    return (
        <>
            <li className={classes.option}>
                <PencilSquare /> <span>Edit Widget</span>
            </li>

            {<li className={classes.option} onClick={handleDuplicateClick}>
                <Back /> <span>Duplicate</span>
            </li>}
            
            <li className={classes.divider}></li>
            
            <li className={`${classes.option} ${classes.danger}`} onClick={handleDeleteClick}>
                <TrashFill /> <span>Delete Widget</span>
            </li>
        </>
    )
};

export default WidgetMenu;