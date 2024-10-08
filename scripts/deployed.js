// Import necessary packages
const { ethers, network } = require("hardhat");

async function main() {
    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    
    // Token address for the pool, make sure you set it correctly
    const tokenAddress = "0x9c76c6304885661CdB97F3984b13114B6D4b5248"; // Replace with the correct token address
    

    console.log("Deploying contracts with the account:", deployer.address);

    const LiquidityPool = await ethers.getContractFactory("LiquidityPool");
    const pool = await LiquidityPool.deploy(tokenAddress);
    
    // Wait for deployment confirmation via transaction receipt
    const receipt = await pool.waitForDeployment();
    
    console.log("Liquidity Pool contract deployed to:", pool.target);


    


    
    console.log("Liquidity Pool contract deployed to:", pool.address);
    console.log("Deployment confirmed on network:", network.name);


    console.log(receipt)
}

// Main function handler for deployment
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
