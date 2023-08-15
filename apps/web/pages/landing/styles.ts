import { Body2 } from '@ares/ui/components/Text'
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

export const Field = styled.span`
  align-items: baseline;
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  width: fit-content;
`

export const Header = styled.div`
  display: grid;
  gap: 2rem;
`

export const Settings = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: column;
  width: fit-content;
`

export const NotFoundMessage = styled(Body2)`
  color: ${({ theme }) => theme.colors.text.error};
`

export const Routine = styled.div`
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.light};
  display: grid;
  gap: 4.5rem;
  margin: auto;
  max-width: 45rem;
  padding: 2rem;
`

export const Workout = styled.div`
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.light};
  display: grid;
  gap: 2rem;
  grid-auto-flow: column;
  justify-content: space-between;
  padding: 2rem;

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.medium)}) {
    gap: 2rem;
    grid-auto-flow: row;
    justify-content: center;
  }
`

export const Workouts = styled.div`
  display: grid;
  gap: 2rem;
`
