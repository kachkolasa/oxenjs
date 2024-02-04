import { editable_column_target_class } from "@/utils/editable_classes"
import { generateRandomId } from "@/utils/helpers";

interface Props {
    children: JSX.Element;
}

const Column = () => {
    return (
            <div className={`ox-section-col ${editable_column_target_class}`} style={{
                paddingLeft: '3%',
                paddingRight: '3%',
            }} data-id={generateRandomId()}>
                
            </div>
    )
}

export default Column;