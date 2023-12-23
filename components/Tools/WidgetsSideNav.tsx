import { CardText, Square, TypeH1 } from "react-bootstrap-icons";
import SideNav from "./SideNav";
import { useDispatch } from "react-redux";
import { widgetsActions } from "@/store/slices/widgetsSlice";
import { sidenavActions } from "@/store/slices/sidenavSlice";
interface Widget {
    widget: string;
    title: string;
    icon: JSX.Element;
}

interface Widgets {
[key: string]: Widget[];
}

const widgets: Widgets = {
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

export default function WidgetsSideNav() {

    const dispatch = useDispatch();

    const hangleDragStart = (widget: string) => {
        dispatch(widgetsActions.changeDraggingWidget(widget));
        dispatch(sidenavActions.closeWidgetsModal())
    }
    const handleDragEnd = (widget: string) => {
        dispatch(widgetsActions.changeDraggingWidget(null))
    }

    return (
        <>
            <SideNav title="Widgets">
                {Object.keys(widgets).map((widget, index) => {
                    return (
                        <div key={index}>
                            <p><span className="rounded-full text-xs uppercase bg-zinc-200 px-4 py-1 font-light">{widget}</span></p>

                            <div className="grid grid-cols-3 gap-2 mt-3">
                                {widgets[widget].map((widget, index) => {
                                    return (
                                        <div key={index} draggable onDragEnd={() => handleDragEnd(widget.widget)} onDragStart={() => hangleDragStart(widget.widget)} className="group rounded h-[80px] bg-white hover:bg-primary-500 hover:text-white text-center flex flex-wrap items-center justify-center cursor-grab">
                                            <div className="w-full">
                                                {widget.icon}
                                                <p className="text-xs mt-1">{widget.title}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </SideNav>
        </>
    )
}