import React, { useCallback, useState } from 'react'
import FileUploadStyles from "./fileupload.module.css"
import { useDropzone } from 'react-dropzone'

function FileUpload() {
    const [message, setMessage] = useState('Drag and drop some files here, or click to select the pdfs you want to combine.')
    const onDrop = useCallback(acceptedFiles => {
        var paths = []

        function sortByName(obj1, obj2) {
            return obj1.name.localeCompare(obj2.name);
        }
        const sortedFiles = acceptedFiles.sort(sortByName) // sorted alphabetically by name

        sortedFiles.map(file =>
            paths.push(file.path)
        )
        const ipcRenderer = window.require("electron").ipcRenderer;

        if (paths.length === 0) {
            setMessage('You dropped an invalid filetype 🚫')
        }
        else if (paths.length === 1) {
            setMessage('Did you really just try to combine a single file? 🤨')
        }
        else {
            setMessage('Working on it ⚙️')
            ipcRenderer.send("merge", paths)
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'application/pdf' })

    return (
        <div {...getRootProps()} className={FileUploadStyles.wrapper}>
            <input {...getInputProps()} className={FileUploadStyles.input} />
            {
                isDragActive ?
                    <p className={FileUploadStyles.dropIt}>Drop it like it's hot 🔥</p> :
                    <p>{message}</p>
            }
        </div>
    )
}

export default FileUpload
