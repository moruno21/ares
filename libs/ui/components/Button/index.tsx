import { memo } from 'react'

import { Component, Content } from './styles'
import { ButtonProps } from './types'

const Button = ({
  children,
  disabled,
  variant = 'primary',
  ...props
}: ButtonProps) => (
  <Component $variant={variant} disabled={disabled} {...props}>
    <Content>{children}</Content>
  </Component>
)

export default memo(Button)

export type { ButtonProps }
