import { Back, PencilSquare, TrashFill } from "react-bootstrap-icons";
import classes from '@/styles//ContextMenu.module.scss';
import { useSelector } from "react-redux";
import { deleteSection, duplicateSection } from "@/utils/sections";

const SectionMenu = () => {
    const {activeSection} = useSelector((state: any) => state.pagebuilder);
    
    const handleDuplicateClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        duplicateSection(activeSection);
    }

    const handleDeleteClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        deleteSection(activeSection);
    }
    
    return (
        <>
            <li className={classes.option}>
                <PencilSquare /> <span>Edit Section</span>
            </li>

            <li className={classes.option} onClick={handleDuplicateClick}>
                <Back /> <span>Duplicate</span>
            </li>
            
            <li className={classes.divider}></li>
            
            <li className={`${classes.option} ${classes.danger}`} onClick={handleDeleteClick}>
                <TrashFill /> <span>Delete Section</span>
            </li>
        </>
    )
};

export default SectionMenu;