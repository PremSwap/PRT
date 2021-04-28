export const getConfig = (key: string): string => {
  const chainId = process.env.REACT_APP_CHAIN_ID || 56;
	return config[key][chainId];
}

export const config = {
  urlBlockchain: {
    56: 'https://bscscan.com/',
    97: 'https://testnet.bscscan.com/',
  },
  webSwap: {
    56: 'http://localhost:3000/',
    97: 'http://richlabswap.rionlab.com/',
  },
}

export default getConfig;

