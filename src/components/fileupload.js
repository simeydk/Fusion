import React, { useCallback } from 'react'
import FileUploadStyles from "./fileupload.module.css"
import { useDropzone } from 'react-dropzone'

function FileUpload() {

    const onDrop = useCallback(acceptedFiles => {
        var paths = []

        function sortByName(obj1, obj2) {
            return obj1.name.localeCompare(obj2.name);
        }
        const sortedFiles = acceptedFiles.sort(sortByName)

        sortedFiles.map(file =>
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
                    <p className={FileUploadStyles.dropIt}>Drop it like it's hot 🔥</p> :
                    <p>Drag and drop some files here, or click to select the files you want to combine.</p>
            }
        </div>
    )
}

export default FileUpload
