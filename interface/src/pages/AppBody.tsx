import React, { useContext } from 'react'
import styled from 'styled-components'
import { Card } from '@pancakeswap-libs/uikit'
import { ThemeContext } from 'ThemeContext';

export const BodyWrapper = styled(Card)`
  position: relative;
  max-width: 350px;
  width: 100%;
  z-index: 5;
  border-radius: 10px;
  box-shadow: ${props => props.color === 'true' ? 'unset' : '0px 8px 21px #D9D9DA'};
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  const theme = useContext(ThemeContext);
  return <BodyWrapper color={(theme.isDark).toString()}>{children}</BodyWrapper>
}
