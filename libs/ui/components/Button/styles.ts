import styled, { css } from 'styled-components'

import { ButtonStyles } from '~/components/Text'

import { ComponentProps } from './types'

export const Content = styled.span`
  display: grid;
  grid-auto-flow: column;

  svg {
    height: 1rem;
  }
`

const PrimaryStyles = css`
  background-color: ${({ theme }) => theme.colors.clickables.primaryButton};
  color: ${({ theme }) => theme.colors.text.white};

  ${ButtonStyles}

  :enabled:hover {
    background-color: ${({ theme }) => theme.colors.buttonStates.primary.hover};
  }

  :enabled:active,
  :enabled:focus-visible {
    background-color: ${({ theme }) =>
      theme.colors.buttonStates.primary.pressed};
  }

  :disabled {
    background-color: ${({ theme }) =>
      theme.colors.buttonStates.primary.disabled};
  }
`

const SecondaryStyles = css`
  background-color: ${({ theme }) => theme.colors.clickables.secondaryButton};
  border-color: ${({ theme }) => theme.colors.stroke.main};
  color: ${({ theme }) => theme.colors.text.main};

  ${ButtonStyles}

  :enabled:hover {
    background-color: ${({ theme }) =>
      theme.colors.buttonStates.secondary.hover};
  }

  :enabled:active,
  :enabled:focus-visible {
    background-color: ${({ theme }) =>
      theme.colors.buttonStates.secondary.pressed};
  }

  :disabled {
    color: ${({ theme }) => theme.colors.buttonStates.secondary.disabled};
    border-color: ${({ theme }) =>
      theme.colors.buttonStates.secondary.disabled};
  }
`

export const Component = styled.button<ComponentProps>`
  align-items: center;
  border: 0.0625rem solid transparent;
  border-radius: 0.25rem;
  display: inline-grid;
  justify-items: center;
  overflow: hidden;
  position: relative;

  ${Content} {
    gap: 0.5rem;
    padding: 6px 0.9375rem;
  }

  ${({ $variant }) => {
    switch ($variant) {
      case 'secondary':
        return SecondaryStyles
      case 'primary':
      default:
        return PrimaryStyles
    }
  }}
`
