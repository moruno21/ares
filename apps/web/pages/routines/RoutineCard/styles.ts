import { Body1, H2 } from '@ares/ui/components/Text'
import styled from 'styled-components'

export const Container = styled.a`
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: grid;
  gap: 2rem;
  max-width: 25rem;
  min-height: 10rem;
  padding: 1.5rem;
`

export const Description = styled(Body1)`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

export const Name = styled(H2)``
