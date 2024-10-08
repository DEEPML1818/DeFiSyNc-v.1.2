import React, { useState } from 'react';
import { ethers } from 'ethers';

function WalletConnect() {
    const [walletAddress, setWalletAddress] = useState("");

    const connectWallet = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            setWalletAddress(accounts[0]);
        } else {
            alert("MetaMask not detected");
        }
    };

    return (
        <div>
            <button onClick={connectWallet}>
                {walletAddress ? `Connected: ${walletAddress}` : "Connect Wallet"}
            </button>
        </div>
    );
}

export default WalletConnect;
