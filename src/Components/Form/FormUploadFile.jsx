import React, { Fragment, useCallback, useState } from 'react'
import { useDropzone } from "react-dropzone";
import { LoadFile } from '../../Helper/LoadFile';
import { uploadIpfsWeb2 } from '../../Lib/web2';
import { toast } from 'react-hot-toast';

const FormUploadFile = ({updateIcon}) => {
    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        console.log("hello", acceptedFiles)
        
        const newFiles = acceptedFiles.map((file) => ({
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2), // Ukuran file dalam MB
            file,
        }));       
        
        setFiles([...newFiles]);

        const tt = toast.loading("Uploading file...")
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        uploadIpfsWeb2(formData).then(data => {
            console.log(data)
            if(data?.success){
                updateIcon(data?.IpfsHash)
                toast.success("uploaded successfully", { id: tt });
            }else{
                toast.success("Server Error", { id: tt });
            }
        }).catch(err => {
            console.log(err)
            toast.success("Server Error", { id: tt });
        })

    }, []);

    const removeFile = (e, name) => {
        e.stopPropagation();
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== name));
    };

    const uploadFiles = (e) => {
        console.log("Uploading files:", files);
        // Logic upload ke server
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpg", ".png", ".gif"],
            "video/*": [".mp4"],
        },
        maxSize: 5 * 1024 * 1024, // Maksimal ukuran file 5MB
    });


    return (
        <Fragment>
            <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center text-center rounded-xl p-3 border  w-full text__14 placeholder:text-[#999999] shadow-none outline-none bg-transparent active:hover:focus:shadow-none active:hover:focus:outline-none ${isDragActive ? "!border-[rgba(255,255,255,0.80)]" : "!border-[rgba(255,255,255,0.20)]"} cursor-pointer`}
            >
                <input {...getInputProps()} multiple={false} />

                {
                    files.length > 0 ? <>
                        <ul className="space-y-2">
                            {files.map((file, index) => (
                                <li
                                    onClick={(e) => e.stopPropagation()}
                                    key={index}
                                    className="flex items-center justify-center gap-3 bg-[#333333] rounded-lg p-3 text-white"
                                >
                                    <div className="flex items-center space-x-3">
                                        <i className="fas fa-file-alt text-lg"></i>
                                        <span>{file.name} ({file.size} MB)</span>
                                    </div>
                                    <div onClick={(e) => removeFile(e, file.name)} className="cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" stroke='red' />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </> : <>
                        <div className="mb-4">
                            <img src={LoadFile("images/CloudArrowUp.svg")} alt="" />
                        </div>
                        <p className="text__16">Drop your image or video here to upload</p>
                        <p className="text__14 mt-2 text-[#999999]">
                            Work with any .JPG, .PNG, .GIF, or .MP4 file from the web
                            <br />
                            with image dimensional 256x256 max 5mb.
                        </p>
                    </>
                }
            </div>
        </Fragment >
    )
}

export default FormUploadFile
