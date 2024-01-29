import classes from '@/styles//ContextMenu.module.scss';
import { useSelector } from 'react-redux';
import SectionMenu from './SectionMenu';
import ColumnMenu from './ColumnMenu';
import WidgetMenu from './WidgetMenu';

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
                {contextMenuTarget === 'widget' && <WidgetMenu />}
            </ul>
        </>
    )
}

export default ContextMenu;