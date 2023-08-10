import { ReactComponent as DefaultDeleteIcon } from '@ares/ui/assets/icons/delete.svg'
import { ReactComponent as DefaultEditIcon } from '@ares/ui/assets/icons/edit.svg'
import { Body1 } from '@ares/ui/components/Text'
import styled from 'styled-components'

export const CardButtons = styled.div`
  display: grid;
  gap: 1rem;
  grid-auto-flow: column;
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
`

export const EditIcon = styled(DefaultEditIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Exercise = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`

export const Info = styled.div`
  display: grid;
  gap: 1.5rem;
`
