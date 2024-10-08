import { gql } from "@apollo/client";

export const GET_POOLS = gql`
  {
    pools(first: 10, orderBy: volumeUSD, orderDirection: desc) {
      id
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      volumeUSD
    }
  }
`;
