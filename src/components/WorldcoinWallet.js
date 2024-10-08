// src/components/WorldcoinWallet.js
import React from "react";
import { WorldIDWidget } from "@worldcoin/id";

const WorldcoinWallet = ({ onSuccess }) => {
  const handleSuccess = (verificationResponse) => {
    onSuccess(verificationResponse);
  };

  return (
    <div>
      <h2>Worldcoin Wallet (Optional)</h2>
      <WorldIDWidget
        actionId="wid_staging_YOUR_ACTION_ID" // Use staging ID
        signal="user_login"
        enableTelemetry={true}
        onSuccess={handleSuccess}
        onError={(error) => console.error(error)}
        debug={true}
      />
    </div>
  );
};

export default WorldcoinWallet;
