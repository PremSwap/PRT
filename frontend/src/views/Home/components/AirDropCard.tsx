import { Card, Heading } from '@pancakeswap-libs/uikit';
import { ThemeContext } from 'contexts/ThemeContext';
import React, { useContext } from 'react';
import styled from 'styled-components';
import Claim from './Claim';

const StyledAirDropCard = styled(Card)`
  min-height: 496px;
  border-radius: 10px;
  font-family: 'Tajawal', sans-serif;
`
const Wrap = styled.div`
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const InnerWrap = styled.div`
    padding: 24px;
    width: 100%;
    height: 100%;
    h2 {
        color: ${props => props.color === 'true' ? "#fff" : "#110f37"};
        opacity: 0.9;
        font-weight: 700;
        font-size: 36px;
        text-align: center;
        font-family: 'Tajawal', sans-serif;
    }
`
const Block = styled.div`
	margin-bottom: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	> div {
		margin-bottom: 7px;
		text-align: center;
		width: 100%;
		font-weight: bold;
		font-size: 20px;
	}
    & > div:first-child {
        margin-bottom: 20px;
    }

    ${({ theme }) => theme.mediaQueries.lg } {
		margin-bottom: 70px;
	}
`

const WrapLabel = styled.div`
    position: absolute;
    bottom: 89px;
    left: 0;
    right: 0;
    padding: 0 24px;
    margin: 0 auto;
`
const Label = styled.div`
	text-align: center;
	margin-bottom: 5px;
	opacity: 0.9;
	font-weight: bold;
    font-family: 'Tajawal', sans-serif;

	color: ${props => props.color === 'true' ? "#EDB64F" : "#5B5A99"};
`
const LabelCustom = styled.div`
	font-size: 32.6px;
	color: ${props => props.color === 'true' ? "#fff" : "#110f37"};
	text-align: center;
	font-weight: bold;
    font-family: 'Tajawal', sans-serif;
    
    a {
        font-family: 'Tajawal', sans-serif;
        color: ${props => props.color === 'true' ? "#EDB64F" : "#5B5A99"};
    }
`
const WrapButton = styled.div`
	width: calc(100% - 48px);
	margin-top: 20px;
    position: absolute;
    bottom: 34px;
    left: 0;
    right: 0;
    margin: 0 auto;

	${({ theme }) => theme.mediaQueries.lg} {
		width: calc(50% - 24px);
	}
`
const AirDropCard = () => {
    const theme = useContext(ThemeContext)
    return (
        <StyledAirDropCard>
            <Wrap>
                <InnerWrap color={(theme.isDark).toString()}>
                    <Heading size="xl" mb="40px">
                        AIRDROP
                    </Heading>
                    <Block>
                        <LabelCustom color={(theme.isDark).toString()}>To get PRT, please <a href="https://twitter.com/PremSwap" target="_blank" rel="noreferrer">retweet this tweet</a>,</LabelCustom>
                        <LabelCustom color={(theme.isDark).toString()}>follow <a href="https://twitter.com/PremSwap" target="_blank" rel="noreferrer">PRT Twitter</a>, and join <a href="https://t.me/PremSwapOffcial" target="_blank" rel="noreferrer">PRT Telegram</a></LabelCustom>
                    </Block>
                    <LabelCustom color={(theme.isDark).toString()}>Get at random from <br /> 5,000,000,000 to 10,000,000,000 PRT</LabelCustom>
                    <WrapLabel>
                        <Label color={(theme.isDark).toString()}>Invite 1 friend to participate in Airdrop to receive 1,000,000,000 PRT and 3% Bonus when friends buy PRT</Label>
                    </WrapLabel>
                    <WrapButton>
                        <Claim />
                    </WrapButton>
                </InnerWrap>         
            </Wrap>
        </StyledAirDropCard>
    )
}

export default AirDropCard