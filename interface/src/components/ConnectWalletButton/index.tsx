import React from 'react'
import { Button, ButtonProps, useWalletModal} from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useAuth from 'hooks/useAuth'
import styled from 'styled-components'

const Wrap = styled.div`
  button:not([disabled]) {
    background: linear-gradient(133.54deg, #1D1EF5 5.3%, #F31AB5 122.3%);
    border-radius: 5px;
  }
`

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const TranslateString = useI18n()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <Wrap>
        <Button onClick={onPresentConnectModal} {...props}>
          {TranslateString(292, 'Unlock Wallet')}
        </Button>
    </Wrap>  
  )
}

export default UnlockButton
