import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import path from 'path'

import styles from "./fileupload.module.css"

function sortByName(obj1, obj2) {
    return obj1.name.localeCompare(obj2.name);
}

const ipcRenderer = window.require("electron").ipcRenderer;

const CrossIcon = (props) => <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
</svg>

function FileUpload() {
    const [message, setMessage] = useState('Drag and drop some files here, or click to select the pdfs you want to combine.')
    const [inputFiles, setInputFiles] = useState([]);
    const [outputFile, setOutputFile] = useState('');

    function removeInputFile(i) {
        setInputFiles(inputFiles => {
            const newFiles = [...inputFiles]
            newFiles.splice(i, 1)
            return newFiles
        })
    }

    async function browseClick() {
        const result = await ipcRenderer.invoke('getfile', outputFile)
        if (!result.cancelled) {
            setOutputFile(result.filePath)
        }
    }

    async function goClick() {
        const inpaths = inputFiles.map(file => file.path)
        const result = await ipcRenderer.invoke('merge', inpaths, outputFile)
        return result
    }

    const onDrop = async acceptedFiles => {
        const paths = acceptedFiles.sort(sortByName)
        if ((outputFile === '') && (inputFiles.length === 0)) {
            const dir = await ipcRenderer.invoke('dirname', paths[0].path)
            const defaultName = 'combined.pdf'
            setOutputFile(dir + '\\' + defaultName)
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
                            <CrossIcon className={styles.inputs_clear_icon} />
                        </button> : ''}
                    </div>
                </div>
                <div className={styles.inputzone}>
                    <ol className={styles.file_list}>
                        {inputFiles.map((x, i) => (
                            <li key={i + x.path} className={styles.file_item}>
                                <span>{x.name}</span>
                                <button className={styles.file_item_delete_button} onClick={() => removeInputFile(i)}><CrossIcon className={styles.file_item_delete_button}/></button>
                            </li>
                        ))}
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
                    <button className={styles.go_button} onClick={goClick}>Go</button>
                </div>
            </div>
        </div>
    )
}


export default FileUpload
