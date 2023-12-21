"use client";

import Tools from '@/components/Tools/Tools';
import classes from '@/styles/Builder.module.scss'
import {Tooltip} from "@nextui-org/react";
import { Display, Phone, Tablet } from 'react-bootstrap-icons'

export default function Home() {
  return (
    <>
    <main>
      <section>
        {/* Header */}
        <header className={classes.header}>
          <div>
            <h1>OxenJS</h1>
          </div>

          <ul className={classes.devices}>
            <li>
              <Tooltip content="Desktop View" placement='bottom' className='tooltip'>
                <Display className={`${classes.active} ${classes.desktop}`} />
              </Tooltip>
            </li>
            <li>
              <Tooltip content="Tablet View" placement='bottom' className='tooltip'>
                <Tablet />
              </Tooltip>
            </li>
            <li>
              <Tooltip content="Phone View" placement='bottom' className='tooltip'>
                <Phone />
              </Tooltip>
            </li>
          </ul>

          <div className={classes.btns}>
            <button className={classes.draft}>Draft</button>
            <button className={classes.publish}>Publish</button>
          </div>
        </header>

        {/* Website Builder */}
        <div className={classes.website}>

        </div>

        {/* Widgets & Tools */}
        <div className={classes.tools}>
          <Tools />
        </div>
      </section>
    </main>
    </>
  )
}
