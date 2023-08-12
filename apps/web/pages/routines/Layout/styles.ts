import pxToRem from '@ares/ui/lib/px-to-rem'
import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  gap: 4.5rem;
  justify-items: center;
`

export const Header = styled.div`
  display: grid;
  gap: 4.5rem;
  justify-items: center;
`

export const Routines = styled.div`
  display: grid;
  gap: 4rem 3rem;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 5rem;
  width: 100%;

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.extralarge)}) {
    grid-template-columns: 1fr 1fr;
    padding: 0;
  }

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.medium)}) {
    grid-template-columns: 1fr;
    padding: 0;
  }
`
