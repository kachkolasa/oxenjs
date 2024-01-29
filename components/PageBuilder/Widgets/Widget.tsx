import { editable_widget_target_class } from "@/utils/editable_classes";
import { generateRandomId } from "@/utils/helpers";
import Heading from "./Heading";
import { CardText, TypeH1 } from "react-bootstrap-icons";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/store";
import TextEditor from "./TextEditor";
import Button from "./Button";

interface Props {
    children: JSX.Element;
    type: string;
}

interface widgetsContentTypes {
    [key: string]: JSX.Element
}
interface Widget {
    widget: string;
    title: string;
    icon: JSX.Element;
}
interface Widgets {
    [key: string]: Widget[];
}

export const widgetsContent: widgetsContentTypes = {
    "heading": <Heading />,
    "text-editor": <TextEditor />,
    "button": <Button />
}
    
export const widgets: Widgets = {
    "basic": [
        {
            widget: "heading",
            title: "Heading",
            icon: <TypeH1 className="text-3xl mx-auto" />
        },
        {
            widget: "text-editor",
            title: "Text Editor",
            icon: <CardText className="text-3xl mx-auto" />
        },
        {
            widget: "button",
            title: "Button",
            icon: <div className="w-[40px] h-[25px] rounded border-gray-600 group-hover:border-white border-2 text-3xl mx-auto flex items-center justify-center"><div className="bg-gray-600 group-hover:bg-white h-[1px] w-[10px]"></div></div>
        }
    ]
}

const Widget = (props: Props) => {
    return (
        <div className={editable_widget_target_class} data-id={generateRandomId()} data-type={props.type}>
            {props.children}
        </div>
    )
}


export const createWidget = (column: Element, widget: JSX.Element) => {
    const container = document.createElement('div');
    container.className = 'ox-widget-container';
    column.appendChild(container);
    createRoot(container).render(
        <Provider store={store}>
            {widget}
        </Provider>
    );
};

export default Widget;