import React, { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import MetaMaskConnect from "./components/MetaMaskConnect";
import WorldcoinWallet from "./components/WorldcoinWallet";
import TLSNotary from "./components/TLSNotary";
import LiquidityPools from "./components/LiquidityPools";
import DummyCoinData from "./components/DummyCoinData";  // Import the dummy coin component
import client from "./components/apolloClient";
import "./App.css";

function App() {
  const [worldcoinVerified, setWorldcoinVerified] = useState(false);

  const handleWorldcoinSuccess = (response) => {
    console.log("Worldcoin verification successful:", response);
    setWorldcoinVerified(true);
  };

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1>Liquidity Pool With Ai Optimizer</h1>

        {/* MetaMask Wallet Connect */}
        <MetaMaskConnect />

        {/* Optional Worldcoin Wallet */}
        <WorldcoinWallet onSuccess={handleWorldcoinSuccess} />

        {worldcoinVerified && <p>Worldcoin Wallet Connected!</p>}

        {/* Liquidity Pool Stats */}
        <div className="stats">
          <div className="stat-item">
            <h3>Total Liquidity</h3>
            <p>$5.3M</p>
          </div>
          <div className="stat-item">
            <h3>Volume 24h</h3>
            <p>$1.2M</p>
          </div>
          <div className="stat-item">
            <h3>Pools Active</h3>
            <p>45</p>
          </div>
        </div>

        {/* Liquidity Pools Component */}
        <LiquidityPools />

        {/* Dummy Coin Data Component */}
        <DummyCoinData />

        {/* TLSNotary Proof Generation */}
        <TLSNotary />
      </div>
    </ApolloProvider>
  );
}

export default App;
