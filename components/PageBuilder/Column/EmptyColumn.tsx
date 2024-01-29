import store from "@/store"
import { sidenavActions } from "@/store/slices/sidenavSlice"
import { editable_column_target_class } from "@/utils/editable_classes"
import { generateRandomId } from "@/utils/helpers"
import { Plus } from "react-bootstrap-icons"
import { Provider, useDispatch } from "react-redux"

const EmptyColumn = () => {
    const dispatch = useDispatch();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dispatch(sidenavActions.toggleWidgetsModal());
    }

    return (
            <div className={`ox-section-col ${editable_column_target_class}`} data-id={generateRandomId()}>
                <div className="ox-empty-column" onClick={handleClick}>
                    <Plus />
                </div>
            </div>
    )
}

export default EmptyColumn;