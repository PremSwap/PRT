import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Flex } from 'rebass'
import Link from '../Link'
import { RowFixed } from '../Row'
import Logo from '../../assets/new-logo.png'

const TitleWrapper = styled.div`
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }

  z-index: 10;
`

const UniIcon = styled(Link)`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

export default function Title() {
  const history = useHistory()

  return (
    <TitleWrapper onClick={() => history.push('/')}>
      <Flex alignItems="center">
        <RowFixed>
          <UniIcon id="link" onClick={() => history.push('/')} style={{ display: 'flex', alignItems: 'center' }}>
            <img width={'40px'} height={'40px'} src={Logo} alt="logo" />
            <span style={{ color: 'white', fontSize: '18px', marginLeft: '10px', fontWeight: 'bold' }}>PremSwap</span>
          </UniIcon>
        </RowFixed>
      </Flex>
    </TitleWrapper>
  )
}

