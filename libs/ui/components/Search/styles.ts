import styled from 'styled-components'

import { InputStyles } from '~/components/Text'

export const Component = styled.input`
  ${InputStyles}
  background-color: ${({ theme }) => theme.colors.background.white};
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.text.main};
  outline: 0.0625rem solid ${({ theme }) => theme.colors.stroke.grey};
  padding: 0.5rem 1rem;
  width: 100%;

  ::placeholder {
    color: ${({ theme }) => theme.colors.text.placeholder};
  }

  :enabled:hover,
  :focus {
    background-color: ${({ theme }) => theme.colors.background.white};
    color: ${({ theme }) => theme.colors.stroke.main};
    outline-color: ${({ theme }) => theme.colors.stroke.main};
  }

  :focus {
    outline-width: 0.125rem;
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
