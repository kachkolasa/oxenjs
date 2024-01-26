import { Archive, LayoutSidebarInsetReverse } from "react-bootstrap-icons";
import { createRoot } from "react-dom/client";

const SectionDragImage = () => {
    return (
        <>
            <div className="bg-white rounded-lg border shadow w-[120px] h-[120px] absolute left-[-100vw] top-[-100vh] pointer-events-none z-[9] flex flex-col items-center justify-center text-center">
                <Archive />
                <span className="text-xs">Section</span>
            </div>
        </>
    )
}

const createSectionDragImage = () => {
    const container = document.createElement('div');
    container.className = 'ox-section-drag-image ox-builder-feature';
    document.body.appendChild(container);
    createRoot(container).render(
        <SectionDragImage />
    );
}

export default createSectionDragImage;