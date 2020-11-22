import React from 'react'
import styles from './titlebar.module.css'
import { VscChromeClose, VscChromeMinimize } from 'react-icons/vsc'

function Titlebar() {
    const ipcRenderer = window.require("electron").ipcRenderer;

    return (
        <div id="title-bar" className={styles.titleBar}>
            <div id="title" className={styles.title}>
                <p>
                    Fusion
                </p>
            </div>
            <div id="title-bar-btns" className={styles.btns}>
                <div id="min-button" className={styles.btn}>
                    <VscChromeMinimize onClick={(e) => ipcRenderer.send("minimize-window")} />
                </div>
                <div id="close-button" className={styles.btn} >
                    <VscChromeClose onClick={(e) => ipcRenderer.send("close-window")} />
                </div>
            </div>
        </div>
    )
}

export default Titlebar
