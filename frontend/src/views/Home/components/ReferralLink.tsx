import React, { useContext } from 'react'
import { Button, Input } from '@pancakeswap-libs/uikit'
import styled from 'styled-components';
import { ThemeContext } from 'contexts/ThemeContext';


const Wrap = styled.div`
	margin: 0 auto 15px;
	width: 70%;
	button:not([disabled]) {
		background: linear-gradient(133.54deg, #1D1EF5 5.3%, #F31AB5 122.3%);
		box-shadow: 0px 4px 31px rgba(186, 19, 88, 0.25);
		border-radius: 39px;
	}

	${({ theme }) => theme.mediaQueries.lg} {
		max-width: 196px;
	}
`
const WrapInput = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	position: relative;

	i {
		margin-left: 10px;
	}

	i:before {
		color: ${(props) => props.color === 'true' ? '#fff' : '#000'}
	}

	i:hover:before {
		color : ${(props) => props.color === 'true' ? '#abaadd' : '#000'}
	}
`

export default function ReferralLink() {	
	const theme = useContext(ThemeContext);

	return (
		<Wrap id="ReferralButton">
			<Button 
				width='100%' 
				padding='0 16px' 
				height='40px' 
				style={{'display':'block'}} 
			>
				Referral Link
			</Button>
			<WrapInput style={{'display': 'none'}} color={(theme.isDark).toString()}>
				<Input id="referrInput" />
				<i className="fas fa-copy" aria-hidden="true"/>
				<span className="tooltiptext">Copied!</span>
			</WrapInput>
		</Wrap>
	);
}