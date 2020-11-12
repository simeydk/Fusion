import React from 'react'
import TitlebarStyles from './titlebar.module.css'
import { VscChromeClose, VscChromeMinimize } from 'react-icons/vsc'

function Titlebar() {
    const ipcRenderer = window.require("electron").ipcRenderer;

    return (
        <div id="title-bar" className={TitlebarStyles.titleBar}>
            <div id="title" className={TitlebarStyles.title}>
                <p>
                    Fusion
                </p>
            </div>
            <div id="title-bar-btns" className={TitlebarStyles.btns}>
                <div id="min-button" className={TitlebarStyles.btn}>
                    <VscChromeMinimize onClick={(e) => ipcRenderer.send("minimize-window")} />
                </div>
                <div id="close-button" className={TitlebarStyles.btn} >
                    <VscChromeClose onClick={(e) => ipcRenderer.send("close-window")} />
                </div>
            </div>
        </div>
    )
}

export default Titlebar
