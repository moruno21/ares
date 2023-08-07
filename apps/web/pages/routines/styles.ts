import styled from 'styled-components'

import pxToRem from '~/lib/px-to-rem'

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

export const RoutineCards = styled.div`
  display: grid;
  gap: 4rem 3rem;
  grid-template-columns: 1fr 1fr 1fr;
  width: fit-content;

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.large)}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.medium)}) {
    grid-template-columns: 1fr;
  }
`
