// src/components/MetaMaskConnect.js
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// Chain configuration for Manta and Scroll
const chains = {
  manta: {
    chainId: '0x1389', // Example Chain ID for Manta (Hexadecimal)
    chainName: 'Manta Testnet',
    rpcUrls: ['https://manta-testnet-rpc-url.com'], // Replace with actual Manta RPC URL
    nativeCurrency: {
      name: 'Manta Coin',
      symbol: 'MANTA',
      decimals: 18,
    },
  },
  scroll: {
    chainId: '0x539', // Example Chain ID for Scroll (Hexadecimal)
    chainName: 'Scroll Testnet',
    rpcUrls: ['https://scroll-testnet-rpc-url.com'], // Replace with actual Scroll RPC URL
    nativeCurrency: {
      name: 'Scroll Coin',
      symbol: 'SCRL',
      decimals: 18,
    },
  },
};

// Utility function for error handling
const handleError = (error, customMessage = "An error occurred") => {
  console.error(`${customMessage}:`, error);
};

// Utility function to fetch signer and address
const getSignerAndAddress = async (provider) => {
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  return { signer, address };
};

// Main component for MetaMask connection and chain selection
const MetaMaskConnect = () => {
  const [walletData, setWalletData] = useState({
    address: null,
    balance: null,
  });
  const [provider, setProvider] = useState(null);
  const [selectedChain, setSelectedChain] = useState('manta'); // Default to Manta

  // Function to initialize provider
  const initializeProvider = () => {
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);
    } else {
      alert("MetaMask is not installed. Please install MetaMask to use this feature.");
    }
  };

  // Function to fetch wallet balance
  const fetchWalletBalance = async (address) => {
    try {
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance); // Format balance in Ether
    } catch (error) {
      handleError(error, "Failed to fetch wallet balance");
      return null;
    }
  };

  // Function to connect MetaMask wallet
  const connectWallet = async () => {
    if (!provider) {
      initializeProvider();
      return;
    }

    try {
      await provider.send("eth_requestAccounts", []);
      const { address } = await getSignerAndAddress(provider);

      // Fetch and update balance
      const balance = await fetchWalletBalance(address);

      setWalletData({
        address,
        balance,
      });
    } catch (error) {
      handleError(error, "Failed to connect MetaMask");
    }
  };

  // Function to switch networks
  const switchNetwork = async () => {
    if (!provider || !window.ethereum) {
      alert("MetaMask is not available.");
      return;
    }

    const chainConfig = chains[selectedChain];

    try {
      // Try switching to the selected chain
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainConfig.chainId }],
      });
    } catch (switchError) {
      // If the chain is not added yet, try adding it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [chainConfig],
          });
        } catch (addError) {
          handleError(addError, "Failed to add the new chain");
        }
      } else {
        handleError(switchError, "Failed to switch network");
      }
    }
  };

  // Automatically initialize provider when the component mounts
  useEffect(() => {
    initializeProvider();
  }, []);

  return (
    <div>
      <button onClick={connectWallet}>
        {walletData.address ? "Wallet Connected" : "Connect MetaMask"}
      </button>

      {walletData.address && (
        <div>
          <p>Connected Wallet: {walletData.address}</p>
          <p>Balance: {walletData.balance} ETH</p>

          {/* Chain Selection */}
          <div>
            <label htmlFor="chain-select">Select Chain:</label>
            <select
              id="chain-select"
              value={selectedChain}
              onChange={(e) => setSelectedChain(e.target.value)}
            >
              <option value="manta">Manta</option>
              <option value="scroll">Scroll</option>
            </select>

            <button onClick={switchNetwork}>Switch Network</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetaMaskConnect;
