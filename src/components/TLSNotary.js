// src/components/TLSNotary.js
import React, { useState } from "react";

const TLSNotary = () => {
  const [proof, setProof] = useState(null);

  const handleGenerateProof = async () => {
    try {
      // Mock the TLSNotary proof generation
      const generatedProof = "GeneratedProofData"; // Replace with actual API call
      setProof(generatedProof);
      console.log("Proof generated:", generatedProof);
    } catch (error) {
      console.error("Error generating proof:", error);
    }
  };

  return (
    <div>
      <h2>TLSNotary Proof Generation</h2>
      <button onClick={handleGenerateProof}>Generate Proof</button>
      {proof && (
        <div>
          <h3>Proof:</h3>
          <p>{proof}</p>
        </div>
      )}
    </div>
  );
};

export default TLSNotary;
