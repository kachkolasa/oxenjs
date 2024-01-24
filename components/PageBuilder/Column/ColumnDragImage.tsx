import { LayoutSidebarInsetReverse } from "react-bootstrap-icons";
import { createRoot } from "react-dom/client";

const ColumnDragImage = () => {
    return (
        <>
            <div className="bg-white rounded-lg border shadow w-[120px] h-[120px] absolute left-[-100vw] top-[-100vh] pointer-events-none z-[9] flex flex-col items-center justify-center text-center">
                <LayoutSidebarInsetReverse />
                <span className="text-xs">Column</span>
            </div>
        </>
    )
}

const createColumnDragImage = () => {
    const container = document.createElement('div');
    container.className = 'ox-column-drag-image ox-builder-feature';
    document.body.appendChild(container);
    createRoot(container).render(
        <ColumnDragImage />
    );
}

export default createColumnDragImage;