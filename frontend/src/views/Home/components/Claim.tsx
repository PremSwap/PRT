import React from 'react'
import { Button } from '@pancakeswap-libs/uikit'
import styled from 'styled-components';


const Wrap = styled.p`
	margin: 0 auto;
	button:not([disabled]) {
		background: linear-gradient(133.54deg, #1D1EF5 5.3%, #F31AB5 122.3%);
		box-shadow: 0px 4px 31px rgba(186, 19, 88, 0.25);
		border-radius: 39px;
	}

	${({ theme }) => theme.mediaQueries.lg } {
		max-width: 196px;
	}
`

export default function Claim() {
	return (
		<Wrap id="claimButton">
			<Button width='100%' padding='0 16px' height='40px'>
				Claim
			</Button>
		</Wrap>
	);
}