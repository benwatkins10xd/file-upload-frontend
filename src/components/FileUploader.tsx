import { FormEvent, useState } from "react";
import axios from "axios";

const FileUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileInputChange = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        const inputElement = event.currentTarget;
        const selectedFile = inputElement.files && inputElement.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const formData = new FormData()
       
        // validate we have a file
        if (!file) {
            return;
        } else {
            formData.append("file_upload", file);
        }
        
        console.log(formData)
        try {
            console.log('formdata: ', formData.entries())
            const response = await axios.post("http://localhost:8000/upload",
                formData
            )
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }

    const getSizePrefix = (sizeInBytes: number): string => {
        if (sizeInBytes < 1024) {
            return sizeInBytes + " B";
        } else if (sizeInBytes < 1024 * 1024) {
            return (sizeInBytes / 1024).toFixed(2) + " KB";
        } else if (sizeInBytes < 1024 * 1024 * 1024) {
            return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
        } else {
            return (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
        }
    };

    return (
        <>
            <form>
                <input type="file" onChange={handleFileInputChange}></input>
                <button onClick={handleSubmit}>Submit</button>
            </form>
            {file && <p>Size: {getSizePrefix(file.size)}</p>}
        </>
    );
};

export default FileUploader;
