import { useState } from 'react';
import { testFileMulter } from '../../utils/api/properties';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', file);
        const response = await testFileMulter(formData);
        console.log(response);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Télécharger</button>
        </form>
    );
};

export default FileUpload;
