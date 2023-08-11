import styled from 'styled-components'

export const Component = styled.button`
  background-color: ${({ theme }) => theme.colors.clickables.defaultIcon};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.icon.main};
  height: 2.5rem;
  padding: 0.25rem;
  width: 2.5rem;

  :enabled:hover {
    background-color: ${({ theme }) =>
      theme.colors.buttonStates.defaultIcon.hover};
  }

  :enabled:active,
  :enabled:focus-visible {
    background-color: ${({ theme }) =>
      theme.colors.buttonStates.defaultIcon.pressed};
  }

  :disabled {
    color: ${({ theme }) => theme.colors.icon.disabled};
  }
`
