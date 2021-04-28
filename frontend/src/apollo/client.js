import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange',
  cache: new InMemoryCache()
});

export const abc = '123';