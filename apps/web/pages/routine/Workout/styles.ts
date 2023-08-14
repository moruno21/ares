import { ReactComponent as DefaultDeleteIcon } from '@ares/ui/assets/icons/delete.svg'
import { ReactComponent as DefaultEditIcon } from '@ares/ui/assets/icons/edit.svg'
import { Body2Styles } from '@ares/ui/components/Text'
import pxToRem from '@ares/ui/lib/px-to-rem'
import styled from 'styled-components'

export const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
`

export const Container = styled.div`
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.light};
  padding: 2rem;
`

export const Content = styled.div`
  display: grid;
  gap: 2rem;
  grid-auto-flow: column;
  grid-template-columns: 1fr min-content;

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.medium)}) {
    grid-auto-flow: revert;
    grid-template-columns: none;
    justify-items: center;
  }
`

export const DeleteIcon = styled(DefaultDeleteIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const EditIcon = styled(DefaultEditIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Field = styled.div`
  align-items: baseline;
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
  justify-content: start;
`

export const Form = styled.div`
  display: grid;
  gap: 2rem;
`

export const Info = styled.div`
  display: grid;
  gap: 2rem;
`

export const Label = styled.label`
  ${Body2Styles}
`

export const WorkoutSettings = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-auto-flow: column;
  justify-content: start;
`
