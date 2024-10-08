import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POOLS } from '../queries';

const Exchanges = () => {
  const { loading, error, data } = useQuery(GET_POOLS);

  if (loading) return <p>Loading pools...</p>;
  if (error) {
    console.error("Error fetching pools:", error);
    return <p>Error fetching pools: {error.message}</p>;
  }

  return (
    <div>
      <h2>Top Liquidity Pools by Volume</h2>
      <table>
        <thead>
          <tr>
            <th>Pool ID</th>
            <th>Token Pair</th>
            <th>Total Volume (USD)</th>
          </tr>
        </thead>
        <tbody>
          {data.pools.map((pool) => (
            <tr key={pool.id}>
              <td>{pool.id}</td>
              <td>
                {pool.token0.symbol}/{pool.token1.symbol}
              </td>
              <td>{parseFloat(pool.volumeUSD).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Exchanges;
