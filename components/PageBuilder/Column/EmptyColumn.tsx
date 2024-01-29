import { Plus } from "react-bootstrap-icons"
import Column from "./Column"
import { createRoot } from "react-dom/client"

const EmptyColumn = () => {
    return (
        <Column />
    )
}

export const createEmptyColumn = (column: HTMLElement) => {
    const container = document.createElement('div');
    container.className = 'ox-empty-column ox-builder-feature';
    column.prepend(container);
    createRoot(container).render(<Plus />);
};

export default EmptyColumn;