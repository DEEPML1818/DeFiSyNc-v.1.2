// src/components/WorldcoinAuth.js
import React from "react";
import { WorldIDWidget } from "@worldcoin/id";

const WorldcoinAuth = ({ onSuccess }) => {
  const handleSuccess = (verificationResponse) => {
    onSuccess(verificationResponse);
  };

  return (
    <div>
      <h2>Worldcoin Verification (Staging)</h2>
      <WorldIDWidget
        actionId="wid_staging_YOUR_ACTION_ID" // Staging action ID, replace YOUR_ACTION_ID with your staging ID
        signal="user_login"
        enableTelemetry={true}
        onSuccess={handleSuccess}
        onError={(error) => console.error(error)}
        debug={true} // Enable debug mode for staging
      />
    </div>
  );
};

export default WorldcoinAuth;
