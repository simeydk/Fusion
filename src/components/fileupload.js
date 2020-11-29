import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

import path from 'path'

import styles from "./fileupload.module.css"

function sortByName(obj1, obj2) {
    return obj1.name.localeCompare(obj2.name);
}

const ipcRenderer = window.require("electron").ipcRenderer;

function FileUpload() {
    const [message, setMessage] = useState('Drag and drop some files here, or click to select the pdfs you want to combine.')
    const [inputFiles, setInputFiles] = useState([]);
    const [outputFile, setOutputFile] = useState('');


    async function browseClick() {
        const result = await ipcRenderer.invoke('getfile', outputFile)
        if (!result.cancelled) {
            setOutputFile(result.filePath)
        }
    }

    const onDrop = async acceptedFiles => {
        const paths = acceptedFiles.sort(sortByName)
        if((outputFile == '') && (inputFiles.length == 0)) {
            const dir = await ipcRenderer.invoke('dirname', paths[0].path)
            setOutputFile(dir + '\\' + 'combined.pdf')
        }
        setInputFiles(current => [...current, ...paths])
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'application/pdf' })

    return (
        <div className={styles.wrapper} >
            <div className={styles.input_area}>
                <div className={styles.input_header_area}>
                    <h2 className={styles.title}>Input Files</h2>
                    <div >
                        {inputFiles.length ? <button className={styles.inputs_clear_button} onClick={() => setInputFiles([])}>
                            <svg className={styles.inputs_clear_icon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button> : ''}
                    </div>
                </div>
                <div className={styles.inputzone}>
                    <ol className={styles.file_list}>
                        {inputFiles.map(x => <li className={styles.file_item}>{x.name}</li>)}
                    </ol>
                    <div {...getRootProps()} className={styles.dropzone}>
                        <input {...getInputProps()} className={styles.input} />
                        <div className={styles.drop_outer}>
                            <div className={styles.drop_inner}>
                                {
                                    isDragActive ?
                                        <p className={styles.dropIt}>Drop it like it's hot 🔥</p> :
                                        <p>{message}</p>
                                }
                            </div>

                        </div>
                        <ul>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.output_area}>
                <h2 className={styles.title}>Output File</h2>
                <div className={styles.output_form}>
                    <div className={styles.input_group}>
                        <input type="text" className={styles.textbox} value={outputFile} onChange={e => setOutputFile(e.target.value)} />
                        <button className={styles.browse_button} onClick={browseClick}>...</button>
                    </div>
                    <button className={styles.go_button}>Go</button>
                </div>
            </div>
        </div>
    )
}


export default FileUpload
