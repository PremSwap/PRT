import gql from 'graphql-tag';

const TokenFields = `
fragment TokenFields on Token {
  id
  name
  symbol
  derivedETH
  tradeVolume
  tradeVolumeUSD
  untrackedVolumeUSD
  totalLiquidity
  txCount
}
`
const BUNDLE_ID = '1';

export const TOKEN_DATA = (tokenAddress, block) => {
    const queryString = `
      ${TokenFields}
      query tokens {
        tokens(${block ? `block : {number: ${block}}` : ``} where: {id:"${tokenAddress}"}) {
          ...TokenFields
        }
        pairs0: pairs(where: {token0: "${tokenAddress}"}, first: 50, orderBy: reserveUSD, orderDirection: desc){
          id
        }
        pairs1: pairs(where: {token1: "${tokenAddress}"}, first: 50, orderBy: reserveUSD, orderDirection: desc){
          id
        }
      }
    `
    return gql(queryString)
}


export const ETH_PRICE = (block) => {
  const queryString = block
    ? `
    query bundles {
      bundles(where: { id: ${BUNDLE_ID} } block: {number: ${block}}) {
        id
        ethPrice
      }
    }
  `
    : ` query bundles {
      bundles(where: { id: ${BUNDLE_ID} }) {
        id
        ethPrice
      }
    }
  `
  return gql(queryString)
}