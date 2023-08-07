import { Body1 } from '@ares/ui/components/Text'
import styled from 'styled-components'

export const Container = styled.div`
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: grid;
  gap: 2rem;
  max-width: 70rem;
  min-height: 10rem;
  padding: 1.5rem;
  width: 100%;
`

export const Description = styled(Body1)`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`
