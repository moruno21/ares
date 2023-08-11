import { forwardRef, InputHTMLAttributes, memo } from 'react'

import { ReactComponent as SearchIcon } from '~/assets/icons/search.svg'

import { Component, Container, Label } from './styles'
import { InputProps } from './types'

const Search = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, maxLength, placeholder, type, value, ...props }, ref) => {
  return (
    <Container className={className}>
      <Component
        id="search-input"
        maxLength={maxLength}
        placeholder={placeholder}
        ref={ref}
        type="text"
        value={value}
        {...props}
      />
      <Label htmlFor="search-input">
        <SearchIcon />
      </Label>
    </Container>
  )
})

export default memo(Search)

export type { InputProps }
