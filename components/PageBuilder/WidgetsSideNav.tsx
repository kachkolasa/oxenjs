import SideNav from "../UI/SideNav";
import { useDispatch } from "react-redux";
import { sidenavActions } from "@/store/slices/sidenavSlice";
import { widgets } from "./Widgets/Widget";
import { DragEvent } from "react";

export default function WidgetsSideNav() {

    const dispatch = useDispatch();

    const hangleDragStart = (event: DragEvent<HTMLDivElement>) => {
        dispatch(sidenavActions.closeWidgetsModal());

        const target = event.target as HTMLDivElement;
        const widget = target.dataset.type;
        
        document.body.setAttribute('data-dragging-widget', widget || '');
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
                                        <div key={index} draggable data-type={widget.widget} onDragStart={hangleDragStart} className="group ox-sidenav-widget">
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