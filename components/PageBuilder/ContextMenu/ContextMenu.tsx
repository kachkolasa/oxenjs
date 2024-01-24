import classes from '@/styles//ContextMenu.module.scss';
import { deleteSection, duplicateSection } from '@/utils/sections';
import { Back, PencilSquare, TrashFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import SectionMenu from './SectionMenu';
import ColumnMenu from './ColumnMenu';

interface contextMenuPossibleTargetsInterface {
    [key: string]: string
}

const contextMenuPossibleTargets: contextMenuPossibleTargetsInterface = {
    'section' : 'Section',
    'column' : 'Column',
    'widget' : 'Widget',
    'builder': 'Builder'
}

const ContextMenu = () => {
    const {contextMenuTarget} = useSelector((state: any) => state.pagebuilder);

    return (
        <>
            <ul className={`${classes['ox-context-menu']} ox-builder-feature`} id="ox-context-menu">
                {contextMenuTarget === 'section' && <SectionMenu />}
                {contextMenuTarget === 'column' && <ColumnMenu />}
            </ul>
        </>
    )
}

export default ContextMenu;