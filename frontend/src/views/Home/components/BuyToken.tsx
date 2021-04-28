import React, { useContext } from 'react'
import { Button, Heading, Input } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { ThemeContext } from 'contexts/ThemeContext'

const Block = styled.div`
	margin-bottom: 16px;
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
`
const BlockCenter = styled.div`
	margin-bottom: 16px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;

	div:first-child {
		margin-bottom: 20px;
		font-weight: 600;
		opacity: 1;
	}
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
	font-size: 23px;
	color: ${props => props.color === 'true' ? "#fff" : "#110f37"};
	text-align: center;
	font-weight: bold;
	margin: 5px 0;
	font-family: 'Tajawal', sans-serif;
`

const Wrap = styled.div`
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
const WrapButton = styled.div`
	width: 100%;
	margin: 0 auto;
	margin-bottom: 10px;
	margin-top: 20px;

	button:not([disabled]) {
		background: linear-gradient(133.54deg, #1D1EF5 5.3%, #F31AB5 122.3%);
		border-radius: 39px;
	}

	${({ theme }) => theme.mediaQueries.lg} {
		width: 50%;
	}
`
const WrapInput = styled.div`
	border: 1px solid #eeeaf4;
	border-radius: 16px;
	width: 45%;
	position: relative;
	margin: 0 auto;
	
	input {
		height: 32px;
		padding-right: 55px;
	}

	p {
		position: absolute;
		right: 20px;
		top: 8px;
		font-weight: 600;
		letter-spacing: 1px;
	}
`

const Price = styled.div`
	font-size: 40px;
	text-align: center;
	width: 100%;
	padding: 10px 0;
	color: #CF18A1;
`

export const BuyToken = () => {
	const TOKEN_SYMBOL = "PRT";
	const theme = useContext(ThemeContext);
	
	return (
		<>
			<Wrap color={(theme.isDark).toString()}>
				<Heading size="xl" mb="40px">
					PRESALE {TOKEN_SYMBOL}
				</Heading>
				<Block>
					<Label color={(theme.isDark).toString()}>PRESALE  IS LIVE WITH 145% BONUS </Label>
					<Label>🔥🔥🔥</Label>
				</Block>
				<BlockCenter>
					<Label color={(theme.isDark).toString()}>I want to buy</Label>
					<WrapInput>
						<Input placeholder='0.04' />
						<p>BNB</p>
					</WrapInput>
				</BlockCenter>
				<Block>
					<Price>
						= <b>{0} {TOKEN_SYMBOL}</b>
					</Price>
				</Block>
				<Label color={(theme.isDark).toString()}>
					PRICE 1 {TOKEN_SYMBOL}={0.002}BNB
				</Label>
				<LabelCustom color={(theme.isDark).toString()}>
					BUY MIN 0.04  BUY MAX 50 BNB
				</LabelCustom>
				<Label color={(theme.isDark).toString()}>
					Invite 1 friend to participate in Airdrop to receive {(1000000000).toLocaleString()} {TOKEN_SYMBOL} and 3% Bonus when friends buy {TOKEN_SYMBOL}
				</Label>
				<WrapButton>
					<Button width='100%' padding='0 16px' height='40px'>
						BUY {TOKEN_SYMBOL}
					</Button>
				</WrapButton>
			</Wrap>	
		</>
	)
}

export default BuyToken;