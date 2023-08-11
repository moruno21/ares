import { ButtonHTMLAttributes, memo } from 'react'

import { Component } from './styles'

const IconButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Component type="button" {...props}>
    {children}
  </Component>
)

export default memo(IconButton)
