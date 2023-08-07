import styled from 'styled-components'

export const Component = styled.span`
  animation: rotation 1s linear infinite;
  border: 0.5rem solid ${({ theme }) => theme.colors.ui.blue10};
  border-right-color: ${({ theme }) => theme.colors.ui.white};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.ui.white};
  box-sizing: border-box;
  display: inline-block;
  min-height: 3.5rem;
  min-width: 3.5rem;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
