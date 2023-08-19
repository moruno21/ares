import { ReactComponent as DefaultCopyIcon } from '@ares/ui/assets/icons/copy.svg'
import { ReactComponent as DefaultDeleteIcon } from '@ares/ui/assets/icons/delete.svg'
import { ReactComponent as DefaultEditIcon } from '@ares/ui/assets/icons/edit.svg'
import { Body2, Body2Styles } from '@ares/ui/components/Text'
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

export const CopyIcon = styled(DefaultCopyIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const CustomErrorMessage = styled(Body2)`
  color: ${({ theme }) => theme.colors.text.error};
`

export const DeleteIcon = styled(DefaultDeleteIcon)`
  color: ${({ theme }) => theme.colors.icon.red};
  height: 1.5rem;
  width: 1.5rem;
`

export const EditIcon = styled(DefaultEditIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Label = styled.label`
  ${Body2Styles}
`

export const Workouts = styled.div`
  display: grid;
  gap: 2rem;
`
