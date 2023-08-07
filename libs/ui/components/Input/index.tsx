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
          type="text"
          value={value}
          {...props}
        />
      </Container>
    )
  },
)

export default memo(Input)

export type { InputProps }
