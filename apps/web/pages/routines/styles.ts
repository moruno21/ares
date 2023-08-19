import { ReactComponent as DefaultCloseIcon } from '@ares/ui/assets/icons/close.svg'
import DefaultButton from '@ares/ui/components/Button'
import DefaultIconButton from '@ares/ui/components/IconButton'
import { Body3Styles, H1 } from '@ares/ui/components/Text'
import pxToRem from '@ares/ui/lib/px-to-rem'
import styled from 'styled-components'

export const Button = styled(DefaultButton)`
  max-width: 37.5rem;
  width: 100%;
`

export const Card = styled.div`
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: grid;
  max-width: 37.5rem;
  min-height: 7.25rem;
  padding: 1.5rem;
  width: 100%;
`

export const CloseIcon = styled(DefaultCloseIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Container = styled.div`
  display: grid;
  gap: 4.5rem;
  justify-items: center;
`

export const CreateRoutineSection = styled.div`
  display: grid;
  justify-items: center;
  width: 100%;
`

export const EmptyMessage = styled.div`
  ${Body3Styles}
  font-size: ${({ theme }) => theme.font.sizes.medium};
`

export const Header = styled.div`
  display: grid;
  gap: 4.5rem;
  justify-items: center;
`

export const IconButton = styled(DefaultIconButton)`
  justify-self: end;
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

export const Title = styled(H1)`
  text-align: center;
`
