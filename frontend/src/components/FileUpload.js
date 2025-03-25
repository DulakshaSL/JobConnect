import React, { useState } from "react";

function FileUpload({ onPrediction }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Change the URL to your FastAPI service
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        onPrediction(data.predicted_job_role);
      } else {
        alert('Error: ' + data.detail);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Processing..." : "Predict Job Role"}
      </button>
    </div>
  );
}

export default FileUpload;
