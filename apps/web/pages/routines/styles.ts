import { H1, H3 } from '@ares/ui/components/Text'
import styled from 'styled-components'

import pxToRem from '~/lib/px-to-rem'

export const RoutineCards = styled.div`
  display: grid;
  gap: 4rem 3rem;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.large)}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.medium)}) {
    grid-template-columns: 1fr;
  }
`

export const RoutineCardsContainer = styled.div`
  display: grid;
  gap: 3rem;
  justify-items: center;
`

export const RoutineCardsHeader = styled(H3)`
  width: fit-content;
`

export const Container = styled.div`
  display: grid;
  gap: 4.5rem;
  justify-items: center;
`

export const Header = styled(H1)`
  width: fit-content;
`
