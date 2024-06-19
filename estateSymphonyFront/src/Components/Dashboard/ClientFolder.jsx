import { useState } from 'react';
import { testFileMulter } from '../../utils/api/properties';

const ClientFolderUpload = () => {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: ''
    });

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        files.forEach(file => {
            data.append('photos', file);
        });
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('age', formData.age);

        const response = await testFileMulter(data);
        console.log(response);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={formData.firstName}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={formData.lastName}
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="age"
                placeholder="Âge"
                value={formData.age}
                onChange={handleInputChange}
            />
            <input
                type="file"
                multiple
                onChange={handleFileChange}
            />
            <button type="submit">Télécharger</button>
        </form>
    );
};

export default ClientFolderUpload;
