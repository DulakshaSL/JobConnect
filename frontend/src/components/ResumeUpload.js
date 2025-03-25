import React, { useState } from 'react';
import axios from 'axios';

const ResumeUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictedRole, setPredictedRole] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPredictedRole(response.data.predicted_job_role);
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and Predict</button>
      {predictedRole && <p>Predicted Job Role: {predictedRole}</p>}
    </div>
  );
};

export default ResumeUpload;
