"use client";
import { RootState } from "@/store";
import {useSelector, useDispatch} from "react-redux";
import { sidenavActions } from "@/store/slices/sidenavSlice";
import WidgetsSideNav from "../PageBuilder/WidgetsSideNav";
import { AnimatePresence } from "framer-motion";

export default function SideNavs(){
    const { isWidgetsModalOpen } = useSelector((state: RootState) => state.sidenav);

    return (
        <>
            <AnimatePresence>
                {isWidgetsModalOpen && (
                    <WidgetsSideNav />
                )}
            </AnimatePresence>
        </>
    )
} 