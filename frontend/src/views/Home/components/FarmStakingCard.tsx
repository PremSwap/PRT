import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { ThemeContext } from 'contexts/ThemeContext'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import CakeHarvestBalance from './CakeHarvestBalance'
import CakeWalletBalance from './CakeWalletBalance'


const StyledFarmStakingCard = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
  border-radius: 10px;
  position: relative;
  h2 {
		background: -webkit-linear-gradient(75deg, #1D1EF5 5.3%, #F31AB5 122.3%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		opacity: 0.9;
    font-weight: 700;
    font-size: 35px;
	}

`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  font-size: 18px;
  opacity: 0.9;
	color: ${props => props.color ? "#ABAADD" : "#5B5A99"};
`

const Actions = styled.div`
  margin-top: 24px;
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 15px;

  ${({ theme }) => theme.mediaQueries.sm} {
    bottom: 45px;
  }

  button:not([disabled]) {
    background: linear-gradient(133.54deg, #1D1EF5 5.3%, #F31AB5 122.3%);
    border-radius: 5px;
  }
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const theme = useContext(ThemeContext);
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard color={theme.isDark}>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(542, 'Farms & Staking')}
        </Heading>
        {/* <CardImage src="/images/logo-richLab.png" alt="cake logo" width={64} height={64} /> */}
        <Block>
          <Label color={theme.isDark}>{TranslateString(544, 'PRT to Harvest')}:</Label>
          <CakeHarvestBalance />
        </Block>
        <Block>
          <Label color={theme.isDark}>{TranslateString(546, 'PRT in Wallet')}:</Label>
          <CakeWalletBalance />
        </Block>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {pendingTx
                ? TranslateString(548, 'Collecting CAKE')
                : TranslateString(532, `Harvest all (${balancesWithValue.length})`, {
                    count: balancesWithValue.length,
                  })}
            </Button>
          ) : (
            <UnlockButton width="100%" />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
