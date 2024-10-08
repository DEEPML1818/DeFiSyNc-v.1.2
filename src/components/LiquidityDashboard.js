import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import LiquidityPoolArtifact from '../LiquidityPool.sol/LiquidityPool.json'; // Ensure correct path

const LiquidityPoolABI = LiquidityPoolArtifact.abi;

function LiquidityDashboard() {
    const [walletAddress, setWalletAddress] = useState("");
    const [defiProtocols, setDefiProtocols] = useState([]);
    const [network, setNetwork] = useState('localhost'); // Default to localhost

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                setWalletAddress(address);
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            alert("MetaMask not detected");
        }
    };

    const loadDeFiProtocols = async () => {
        try {
            const rpcUrl = 
                network === 'localhost'
                    ? 'http://localhost:8545'
                    : network === 'scroll'
                    ? process.env.REACT_APP_SCROLL_RPC_URL
                    : process.env.REACT_APP_MANTA_RPC_URL;

            const provider = new ethers.JsonRpcProvider(rpcUrl);
            console.log("Provider URL:", rpcUrl);

            const contractAddress = "0xb7278A61aa25c888815aFC32Ad3cC52fF24fE575"; // Use your deployed contract address
            const contract = new ethers.Contract(contractAddress, LiquidityPoolABI, provider);

            const protocolCount = await contract.protocolCount();
            const protocols = [];

            for (let i = 0; i < protocolCount; i++) {
                const [name, price, apy] = await contract.getDeFiProtocolDetails(i);
                protocols.push({ name, price, apy });
            }
            
            setDefiProtocols(protocols);
        } catch (error) {
            console.error("Error loading DeFi protocols:", error);
        }
    };

    useEffect(() => {
        if (walletAddress) {
            loadDeFiProtocols();
        }
    }, [walletAddress]);

    return (
        <div>
            <button onClick={connectWallet}>
                {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
            </button>

            <h2>Available DeFi Protocols</h2>
            <ul>
                {defiProtocols.map((protocol, index) => (
                    <li key={index}>
                        Protocol: {protocol.name} - Price: {protocol.price.toString()} - APY: {protocol.apy.toString()}%
                    </li>
                ))}
            </ul>

            <div>
                <label>Select Network:</label>
                <select onChange={(e) => setNetwork(e.target.value)}>
                    <option value="localhost">Localhost</option>
                    <option value="scroll">Scroll</option>
                    <option value="manta">Manta</option>
                </select>
            </div>
        </div>
    );
}

export default LiquidityDashboard;
