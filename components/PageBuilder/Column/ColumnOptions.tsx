import { LayoutSidebarInsetReverse } from 'react-bootstrap-icons';
import { createRoot } from 'react-dom/client';
import Tooltip from '../../UI/Tooltip';
import { Provider, useSelector } from 'react-redux';
import store from '@/store';

const column_options_class = 'ox-column-options';

const ColumnOptions = () => {
    const {activeColumn} = useSelector((state: any) => state.pagebuilder);

    return (
        <div className={column_options_class}>
            {/* Column Settings */}
            <Tooltip text="Edit/Drag">
                <button className='flex gap-2 w-[25px] h-[25px] items-center justify-center cursor-grab ox-column-grabble'>
                    <span className="rounded-l bg-primary-500 text-white flex items-center justify-center"><LayoutSidebarInsetReverse /></span>
                </button>
            </Tooltip>
        </div>
    );
};

export const createColumnOptions = (column: Element) => {
    const container = document.createElement('div');
    container.className = 'ox-column-options-container ox-builder-feature';
    column.appendChild(container);
    createRoot(container).render(
        <Provider store={store}>
            <ColumnOptions />
        </Provider>
    );
};