import styled from 'styled-components'

import { InputStyles } from '../Text'

export const Component = styled.input`
  ${InputStyles}
  border: 0.0625rem solid ${({ theme }) => theme.colors.stroke.grey};
  background-color: ${({ theme }) => theme.colors.background.white};
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.text.main};
  padding: 0.5rem 0.5rem 0.375rem;
  width: 100%;

  ::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
  }

  :enabled:hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.background.white};
    border-color: ${({ theme }) => theme.colors.stroke.main};
    color: ${({ theme }) => theme.colors.stroke.main};
  }

  :focus {
    border-width: 0.125rem;
  }
`

export const Container = styled.div`
  border-radius: 0.25rem;
  position: relative;
`

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.stroke.grey};
  height: 1.25rem;
  position: absolute;
  top: 0.4375rem;
  right: 1rem;
  width: 1.25rem;
`
