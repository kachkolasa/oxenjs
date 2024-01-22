"use client";

import classes from '@/styles/PageBuilder.module.scss';
import React, { useRef } from 'react';
import '@/styles/PageBuilder.scss';
import AddNewSection from './Tools/AddNewSection';
import SectionsContainer from './Tools/SectionsContainer';
import ContextMenu from './Tools/ContextMenu';


export default function PageBuilder(){
    // const [components, setComponents] = React.useState<JSX.Element[]>([]);
    return (
        <>
            {/* Website Builder Container */}
            <div className={classes.website}>
                <ContextMenu />

                {/* All Sections */}
                <SectionsContainer />
                
                {/* Add new section */}
                <AddNewSection />
                
            </div>
        </>
    )
}