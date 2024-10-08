// src/components/LiquidityPools.js
import React from "react";

const LiquidityPools = () => {
  const pools = [
    {
      name: "ETH/USDC",
      totalLiquidity: "$2M",
      volume24h: "$500K",
      apy: "8.5%",
    },
    {
      name: "BTC/ETH",
      totalLiquidity: "$1.5M",
      volume24h: "$400K",
      apy: "7.2%",
    },
    {
      name: "DAI/USDT",
      totalLiquidity: "$800K",
      volume24h: "$200K",
      apy: "6.9%",
    },
  ];

  return (
    <div>
      <h2>Top Liquidity Pools</h2>
      <ul>
        {pools.map((pool, index) => (
          <li key={index}>
            <p>
              <strong>{pool.name}</strong>
            </p>
            <p>Total Liquidity: {pool.totalLiquidity}</p>
            <p>Volume (24h): {pool.volume24h}</p>
            <p>APY: {pool.apy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiquidityPools;
