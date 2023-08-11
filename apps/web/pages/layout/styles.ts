import pxToRem from '@ares/ui/lib/px-to-rem'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 3rem 4rem 5rem;

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.medium)}) {
    padding: 3rem 2rem 5rem;
  }

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.small)}) {
    padding: 2rem 1rem 4rem;
  }
`
