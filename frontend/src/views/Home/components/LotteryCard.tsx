import React from 'react'
import styled from 'styled-components'
import { Card } from '@pancakeswap-libs/uikit'
import { BuyToken } from './BuyToken'



const StyledLotteryCard = styled(Card)`
  min-height: 496px;
  border-radius: 10px;
`

const Block = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LotteryCard = () => {
  return (
    <StyledLotteryCard>
      <Block>
        <BuyToken />
      </Block>
    </StyledLotteryCard>
  )
}

export default LotteryCard
