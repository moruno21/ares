import { H1 } from '@ares/ui/components/Text'
import styled from 'styled-components'

export const Card = styled.div`
  border-radius: 0.25rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: grid;
  gap: 2rem;
  max-width: 30rem;
  padding: 2rem;
  width: 100%;
`

export const Container = styled.div`
  display: grid;
  gap: 4.5rem;
  justify-items: center;
`

export const Field = styled.span`
  align-items: baseline;
  display: grid;
  gap: 0.5rem;
  grid-auto-flow: column;
  width: fit-content;
`

export const Footer = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  justify-content: end;
`

export const Title = styled(H1)`
  text-align: center;
`
