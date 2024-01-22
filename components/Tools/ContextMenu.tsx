import classes from '@/styles//ContextMenu.module.scss';
import { deleteSection, duplicateSection } from '@/utils/sections';
import { Back, PencilSquare, TrashFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

const ContextMenu = () => {
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
            <ul className={`${classes['ox-context-menu']} ox-builder-feature`} id="ox-context-menu">

                <li className={classes.option}>
                    <PencilSquare /> <span>Edit Section</span>
                </li>

                <li className={classes.option} onClick={handleDuplicateClick}>
                    <Back /> <span>Duplicate</span>
                </li>
                
                <li className={classes.divider}></li>
                
                <li className={`${classes.option} ${classes.danger}`} onClick={handleDeleteClick}>
                    <TrashFill /> <span>Delete</span>
                </li>
            </ul>
        </>
    )
}

export default ContextMenu;