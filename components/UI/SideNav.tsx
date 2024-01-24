import { sidenavActions } from '@/store/slices/sidenavSlice';
import classes from '@/styles/SideNav.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
    children: any;
    title: string;
}

export default function SideNav(props: Props) {

    const sidebarRef = useRef<HTMLDivElement  | null>(null);
    const dispatch = useDispatch();

    const closeSidebar = () => {
        dispatch(sidenavActions.toggleWidgetsModal());
    };

    useEffect(() => {
        // Typing the event as MouseEvent
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            // Ensure the target is an HTMLElement for the contains method
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                closeSidebar();
            }
        };

        // Add when the component mounts
        document.addEventListener("mousedown", handleClickOutside);

        // Return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarRef]);

    return (
            <motion.aside
                className={classes.wrapper}
                initial={{ left: "-350px" }}
                animate={{ left: 0 }}
                exit={{ left: "-350px" }}
                ref={sidebarRef}
            >
                <h2 className={classes.title}>{props.title}</h2>

                {props.children}
            </motion.aside>
    )
}