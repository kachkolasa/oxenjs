import { sidenavActions } from "@/store/slices/sidenavSlice";
import {Tooltip} from "@nextui-org/react";
import { Files, GearWideConnected, Grid, Layers, LightningCharge } from 'react-bootstrap-icons'
import { useDispatch } from "react-redux";

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
        <>
            <Tooltip content="Widgets" placement='right' className='tooltip'>
                <span onClick={() => openTool('widgets')}>
                    <Grid />
                </span>
            </Tooltip>
            <Tooltip content="Layers" placement='right' className='tooltip'>
                <span onClick={() => openTool('layers')}>
                    <Layers />
                </span>
            </Tooltip>
            <Tooltip content="Pages" placement='right' className='tooltip'>
                <span onClick={() => openTool('pages')}>
                    <Files />
                </span>
            </Tooltip>
            <Tooltip content="Settings" placement='right' className='tooltip'>
                <span onClick={() => openTool('settings')}>
                    <GearWideConnected />
                </span>
            </Tooltip>
            <Tooltip content="Preview" placement='right' className='tooltip'>
                <span>
                    <LightningCharge />
                </span>
            </Tooltip>
        </>
    )
}