import { sidenavActions } from "@/store/slices/sidenavSlice";
import {Tooltip as Tooltip2} from "@nextui-org/react";
import { Files, GearWideConnected, Grid, Layers, LightningCharge } from 'react-bootstrap-icons'
import { useDispatch } from "react-redux";
import classes from '@/styles/Tools.module.scss';
import Tooltip from "./UI/Tooltip";

export default function Tools(){
    const dispatch = useDispatch();
    
    const openTool = (tool: string) => {
        switch(tool){
            case 'widgets':
                dispatch(sidenavActions.toggleWidgetsModal());
                break;
        }
    }

    return (
        <div className={classes.tools}>
            <Tooltip text="Widgets" placement='right'>
                <span onClick={() => openTool('widgets')}>
                    <Grid />
                </span>
            </Tooltip>
            <Tooltip text="Layers" placement='right'>
                <span onClick={() => openTool('layers')}>
                    <Layers />
                </span>
            </Tooltip>
            <Tooltip text="Pages" placement='right'>
                <span onClick={() => openTool('pages')}>
                    <Files />
                </span>
            </Tooltip>
            <Tooltip text="Settings" placement='right'>
                <span onClick={() => openTool('settings')}>
                    <GearWideConnected />
                </span>
            </Tooltip>
            <Tooltip text="Preview" placement='right'>
                <span>
                    <LightningCharge />
                </span>
            </Tooltip>
        </div>
    )
}