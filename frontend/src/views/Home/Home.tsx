import React, { useContext } from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { ThemeContext } from 'contexts/ThemeContext'
import Page from 'components/layout/Page'
import LotteryCard from 'views/Home/components/LotteryCard'
import AirDropCard from './components/AirDropCard'
import ReferralLink from './components/ReferralLink'



const Hero = styled.div`
  align-items: center;
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;
  & > div {
    font-family: 'Tajawal', sans-serif;
  }
  h1 {
    font-family: 'Tajawal', sans-serif;
    margin-bottom: -8px !important;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 165px;
    padding-top: 0;
  }
`
const Cards = styled.div`
  align-items: stretch;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  & > div:first-child {
    margin-bottom: 16px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {   
    & > div:first-child {
      width: 100%;
    }
    & > div:last-child {
      width: 100%;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    justify-content: center;
    & > div:first-child {
      width: 50%;
      max-width: 440px;
      margin-right: 58px;  
      margin-bottom: 0;
    }
    & > div:last-child {
      width: 50%;
      max-width: 440px;
    }
  }
`

const WrapHeading = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: flex-end;

  img:first-child {
    width: 43px;
    height: 43px;
    margin-right: 15px;
  }

  h1 {
    font-weight: 700;
    margin-bottom: 0;
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()
  const theme = useContext(ThemeContext)
  return (
    <Page>
      <Hero>
        <WrapHeading>
          <img src="/images/new/new-logo.png" alt="" />
          <Heading as="h1" size="xl" mb="24px" color={ theme.isDark ? '#fff' : '#110f37' }>
            {TranslateString(576, 'PremSwap')}
          </Heading>
          <img src="/images/new/iconHeader.png" alt="" width="100" height="101"/>
        </WrapHeading>
        <Text fontSize="22px" color={theme.isDark ?  "#abaadd" : "#5b5a99"}>{TranslateString(578, 'The Most Delicious Yield Farm and DeFi Aggregator on Binance Smart Chain.')}</Text>
      </Hero>
      <div>
        <ReferralLink/>
      </div>
      <div>
        <Cards>
          <AirDropCard />
          <LotteryCard />
        </Cards>
      </div>
    </Page>
  )
}

export default Home

