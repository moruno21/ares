import { Body2, H1, H3 } from '@ares/ui/components/Text'
import pxToRem from '@ares/ui/lib/px-to-rem'
import styled from 'styled-components'

export const Card = styled.div`
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: grid;
  height: 10rem;
  justify-content: center;
  padding: 3rem;
  max-width: 18rem;
`

export const Container = styled.div`
  display: grid;
  gap: 4rem;
  height: fit-content;
  justify-items: center;
  padding: 10rem 4rem;

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.medium)}) {
    padding: 3rem 2rem 5rem;
  }

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.small)}) {
    padding: 2rem 1rem 4rem;
  }
`

export const Description = styled(H3)`
  font-style: italic;
  text-align: center;
`

export const ErrorMessage = styled(Body2)`
  color: ${({ theme }) => theme.colors.text.error};
`

export const Title = styled(H1)`
  text-align: center;
`
