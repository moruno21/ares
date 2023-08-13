import { ReactComponent as DefaultChevronLeftIcon } from '@ares/ui/assets/icons/chevron-left.svg'
import { ReactComponent as DefaultDeleteIcon } from '@ares/ui/assets/icons/delete.svg'
import { ReactComponent as DefaultEditIcon } from '@ares/ui/assets/icons/edit.svg'
import DefaultModal from '@ares/ui/components/Modal'
import { H1, H4 } from '@ares/ui/components/Text'
import styled from 'styled-components'

export const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  position: absolute;
  right: 0;
  top: 0;
`

export const ChevronLeftIcon = styled(DefaultChevronLeftIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Container = styled.div`
  display: grid;
  gap: 2rem;
  position: relative;
`

export const DeleteIcon = styled(DefaultDeleteIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Description = styled(H4)`
  width: fit-content;
`

export const EditIcon = styled(DefaultEditIcon)`
  height: 1.5rem;
  width: 1.5rem;
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

export const Title = styled(H1)`
  width: fit-content;
`
