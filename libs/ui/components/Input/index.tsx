import { forwardRef, memo } from 'react'

import { Component, Container } from './styles'
import { InputProps } from './types'

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, error, maxLength, type, value, ...props }, ref) => {
    return (
      <Container className={className}>
        <Component
          aria-invalid={error}
          disabled={disabled}
          maxLength={maxLength}
          ref={ref}
          value={value}
          type={type}
          {...props}
        />
      </Container>
    )
  },
)

export default memo(Input)

export type { InputProps }
