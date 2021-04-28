import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { ThemeContext } from 'ThemeContext'

const StyledNav = styled.div`
  margin-bottom: 40px;

  & > div:first-child {
    border-radius: 39px;
    border: 1px solid transparent;
    background: ${props => props.color === 'true' ? 'linear-gradient(#110F34,#110F34) padding-box,linear-gradient(180deg, #1D1EF5 5.3%, #F31AB5 122.3%) border-box;' : 
    'linear-gradient(#ececff,#ececff) padding-box,linear-gradient(180deg, #1D1EF5 5.3%, #F31AB5 122.3%) border-box;'};
  }

  a {
    height: 42px;
    min-width: 90px;
    border-radius: 39px;
    color: ${props => props.color === 'true' ? '#ABAADD' : '#555390'};

    ${({ theme }) => theme.mediaQueries.lg} {
      min-width: 114px;
    }
  }
`

function Nav({ activeIndex = 0 }: { activeIndex?: number }) {
  const TranslateString = useI18n()
  const theme = useContext(ThemeContext);

  useEffect(() => {  
    const swap = document.getElementById('swap-nav-link');
    const liquidity = document.getElementById('pool-nav-link');
    const bridge = document.getElementById('bridge-nav-link');
    if(activeIndex === 0 && swap){
      swap.style.color = '#fff';
      swap.style.background = "linear-gradient(133.54deg, rgb(29, 30, 245) 5.3%, rgb(243, 26, 181) 122.3%)";
    }else if( activeIndex === 1 && liquidity){
      liquidity.style.color = '#fff';
      liquidity.style.background = "linear-gradient(133.54deg, rgb(29, 30, 245) 5.3%, rgb(243, 26, 181) 122.3%)"
    }else if( activeIndex === 2 && bridge ){
      bridge.style.background = "linear-gradient(133.54deg, rgb(29, 30, 245) 5.3%, rgb(243, 26, 181) 122.3%)"
    }
  },[activeIndex])

  return (
    <StyledNav color={(theme.isDark.toString())}>
      <ButtonMenu activeIndex={activeIndex} scale="sm" variant="subtle">
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          {TranslateString(1142, 'Swap')}
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          {TranslateString(262, 'Liquidity')}
        </ButtonMenuItem>
        <ButtonMenuItem id="bridge-nav-link" to="/bridge" as={Link}>
          {TranslateString(262, 'Bridge')}
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  )
}

export default Nav
