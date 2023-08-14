import { Body2 } from '@ares/ui/components/Text'
import styled from 'styled-components'

export const Container = styled.div`
  margin: auto;
  max-width: 45rem;
`

export const Content = styled.div`
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.light};
  display: grid;
  gap: 4.5rem;
  padding: 2rem;
`

export const CustomErrorMessage = styled(Body2)`
  color: ${({ theme }) => theme.colors.text.error};
`

export const Workouts = styled.div`
  display: grid;
  gap: 2rem;
`
