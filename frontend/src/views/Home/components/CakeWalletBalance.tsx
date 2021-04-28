import React, { useContext } from 'react'
import { Text } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceCakeBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import { ThemeContext } from 'contexts/ThemeContext'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'


const CakeWalletBalance = () => {
  const TranslateString = useI18n()
  const cakeBalance = useTokenBalance(getCakeAddress())
  const busdBalance = new BigNumber(getBalanceNumber(cakeBalance)).multipliedBy(0.54612).toNumber()
  const { account } = useWeb3React()
  const theme = useContext(ThemeContext)
  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(cakeBalance)} color={theme.isDark ? "white" : "#000"} decimals={3} fontSize="40px" lineHeight="1.5" />
      <CardBusdValue value={busdBalance} />
    </>
  )
}

export default CakeWalletBalance
