import React, { useCallback } from 'react'
import FileUploadStyles from "./fileupload.module.css"
import { useDropzone } from 'react-dropzone'

function FileUpload() {

    const onDrop = useCallback(acceptedFiles => {
        console.log('Files dropped woohoo!')
        var paths = []
        acceptedFiles.map(file =>
            paths.push(file.path)
        )
        const ipcRenderer = window.require("electron").ipcRenderer;
        ipcRenderer.send("merge", paths)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'application/pdf' })

    return (
        <div {...getRootProps()} className={FileUploadStyles.wrapper}>
            <input {...getInputProps()} className={FileUploadStyles.input} />
            {
                isDragActive ?
                    <p>Drop it like it's hot...</p> :
                    <p>Drag and drop some files here, or click to select files</p>
            }
        </div>
    )
}

export default FileUpload
