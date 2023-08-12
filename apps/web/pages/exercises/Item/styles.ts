import { ReactComponent as DefaultCloseIcon } from '@ares/ui/assets/icons/close.svg'
import { ReactComponent as DefaultDeleteIcon } from '@ares/ui/assets/icons/delete.svg'
import { ReactComponent as DefaultEditIcon } from '@ares/ui/assets/icons/edit.svg'
import DefaultIconButton from '@ares/ui/components/IconButton'
import DefaultModal from '@ares/ui/components/Modal'
import { Body1 } from '@ares/ui/components/Text'
import pxToRem from '@ares/ui/lib/px-to-rem'
import styled from 'styled-components'

export const CardButtons = styled.div`
  display: grid;
  grid-auto-flow: column;
`

export const CloseIcon = styled(DefaultCloseIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Container = styled.div`
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: grid;
  max-width: 37.5rem;
  min-height: 7.25rem;
  padding: 1.5rem;
  width: 100%;
`

export const Content = styled.div`
  align-items: center;
  display: grid;
  grid-auto-flow: column;
  height: 100%;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.small)}) {
    gap: 1rem;
    grid-auto-flow: row;
    grid-template-columns: 1fr;
    justify-items: center;
  }
`

export const DeleteIcon = styled(DefaultDeleteIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Description = styled(Body1)`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.small)}) {
    display: none;
  }
`

export const EditIcon = styled(DefaultEditIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const IconButton = styled(DefaultIconButton)`
  justify-self: end;
`

export const Info = styled.div`
  display: grid;
  gap: 1.5rem;
`

export const Footer = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  justify-content: end;
`

export const Modal = styled(DefaultModal)`
  em {
    font-weight: ${({ theme }) => theme.font.weights.bold};
  }
`
