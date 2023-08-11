import styled from 'styled-components'

import { InputStyles } from '~/components/Text'

export const Component = styled.input`
  ${InputStyles}
  border-bottom: 0.0625rem solid ${({ theme }) => theme.colors.stroke.main};
  border-radius: 0.25rem 0.25rem 0 0;
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
  }

  :focus {
    border-width: 0.125rem;
    padding-bottom: 0.375rem;
  }

  &[aria-invalid='true'] {
    background-color: ${({ theme }) => theme.colors.background.error};
    border-color: ${({ theme }) => theme.colors.stroke.error};
  }

  :disabled {
    border-color: ${({ theme }) => theme.colors.stroke.disabled};
    color: ${({ theme }) => theme.colors.text.disabled};

    ::placeholder {
      color: ${({ theme }) => theme.colors.text.disabled};
    }
  }
`

export const Container = styled.div`
  border-radius: 0.25rem 0.25rem 0 0;
`
