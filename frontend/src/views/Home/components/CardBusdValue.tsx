import React from 'react'
import CardValue, { CardValueProps } from './CardValue'

const CardBusdValue: React.FC<CardValueProps> = (props) => {
  return (
    <CardValue fontSize="16px" lineHeight="1.5" color="#1d1ef5" prefix="~$" bold={false} decimals={2} {...props} />
  )
}

export default CardBusdValue
