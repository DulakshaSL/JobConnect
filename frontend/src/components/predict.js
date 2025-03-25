import React, { useState } from "react";
import FileUpload from "./FileUpload";
import Carousel from './Carousel';

function App() {
  const [predictedRole, setPredictedRole] = useState(null);

  const handlePrediction = (role) => {
    setPredictedRole(role);
  };

  return (
    <div className="App">
      <h1>JobConnect Resume Job Role Prediction</h1>
      <FileUpload onPrediction={handlePrediction} />
      {predictedRole && (
        <div>
          <h2>Predicted Job Role:</h2>
          <p>{predictedRole}</p>
        </div>
      )}
    </div>
  );
}

export default App;
