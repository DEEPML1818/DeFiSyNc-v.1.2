import React from 'react';

const DummyCoinData = () => {
  // Define the dummy coin data directly in the component
  const coins = [
    { name: "Bitcoin", symbol: "BTC", price: "43,500", volume: "8.3B" },
    { name: "Ethereum", symbol: "ETH", price: "3,200", volume: "6.2B" },
    { name: "Binance Coin", symbol: "BNB", price: "400", volume: "1.5B" },
    { name: "Solana", symbol: "SOL", price: "150", volume: "2.3B" },
    { name: "Cardano", symbol: "ADA", price: "2.10", volume: "1.8B" },
    { name: "XRP", symbol: "XRP", price: "1.10", volume: "1.1B" },
    { name: "Polkadot", symbol: "DOT", price: "35", volume: "920M" },
    { name: "Avalanche", symbol: "AVAX", price: "70", volume: "750M" },
    { name: "Chainlink", symbol: "LINK", price: "25", volume: "500M" },
    { name: "Terra", symbol: "LUNA", price: "40", volume: "680M" },
    { name: "Litecoin", symbol: "LTC", price: "180", volume: "300M" },
    { name: "Uniswap", symbol: "UNI", price: "30", volume: "600M" },
    { name: "Dai", symbol: "DAI", price: "1", volume: "900M" },
    { name: "Wrapped Bitcoin", symbol: "WBTC", price: "43,500", volume: "820M" },
    { name: "Polygon", symbol: "MATIC", price: "1.50", volume: "450M" },
    { name: "Shiba Inu", symbol: "SHIB", price: "0.00005", volume: "2.9B" },
    { name: "Cosmos", symbol: "ATOM", price: "20", volume: "350M" },
    { name: "VeChain", symbol: "VET", price: "0.12", volume: "230M" },
    { name: "Fantom", symbol: "FTM", price: "2.5", volume: "600M" },
    { name: "Tezos", symbol: "XTZ", price: "6.5", volume: "210M" },
    { name: "Decentraland", symbol: "MANA", price: "3.2", volume: "120M" },
    { name: "Aave", symbol: "AAVE", price: "320", volume: "270M" },
    { name: "SushiSwap", symbol: "SUSHI", price: "12", volume: "180M" }
  ];

  return (
    <div>
      <h2>The graph data  - Coin Prices</h2>
      <table>
        <thead>
          <tr>
            <th>Coin Name</th>
            <th>Symbol</th>
            <th>Price (USD)</th>
            <th>Volume 24h</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={index}>
              <td>{coin.name}</td>
              <td>{coin.symbol}</td>
              <td>{coin.price}</td>
              <td>{coin.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DummyCoinData;
