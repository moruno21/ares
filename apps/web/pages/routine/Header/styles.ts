import { ReactComponent as DefaultChevronLeftIcon } from '@ares/ui/assets/icons/chevron-left.svg'
import DefaultModal from '@ares/ui/components/Modal'
import { H1, H4 } from '@ares/ui/components/Text'
import pxToRem from '@ares/ui/lib/px-to-rem'
import styled from 'styled-components'

export const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.medium)}) {
    order: -1;
  }
`

export const ChevronLeftIcon = styled(DefaultChevronLeftIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Content = styled.div`
  align-items: center;
  display: grid;
  gap: 2rem;
  grid-auto-flow: column;
  grid-template-columns: 1fr min-content;
  justify-items: start;

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.medium)}) {
    grid-auto-flow: revert;
    grid-template-columns: none;
  }
`

export const Description = styled(H4)`
  width: fit-content;
`

export const Field = styled.div`
  display: grid;
  gap: 0.75rem;
`

export const Fields = styled.div`
  display: grid;
  gap: 2.5rem;
`

export const Footer = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  justify-content: end;
`

export const Form = styled.div`
  display: grid;
  gap: 3.5rem;
`

export const Info = styled.div`
  display: grid;
  gap: 2rem;
`

export const Modal = styled(DefaultModal)`
  em {
    font-weight: ${({ theme }) => theme.font.weights.bold};
  }
`

export const Title = styled(H1)`
  width: fit-content;
`
