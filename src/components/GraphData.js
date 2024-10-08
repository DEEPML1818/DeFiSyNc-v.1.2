// src/components/GraphData.js
import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_TRANSACTIONS = gql`
  query {
    transactions(first: 5) {
      id
      from
      to
      value
    }
  }
`;

const GraphData = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (data) {
      setTransactions(data.transactions);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data from The Graph</p>;

  return (
    <div>
      <h2>Latest Transactions from The Graph</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>
            <p>From: {tx.from}</p>
            <p>To: {tx.to}</p>
            <p>Value: {tx.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GraphData;
