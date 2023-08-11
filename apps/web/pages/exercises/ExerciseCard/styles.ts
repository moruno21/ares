import { ReactComponent as DefaultDeleteIcon } from '@ares/ui/assets/icons/delete.svg'
import { ReactComponent as DefaultEditIcon } from '@ares/ui/assets/icons/edit.svg'
import { Body1 } from '@ares/ui/components/Text'
import styled from 'styled-components'

import pxToRem from '~/lib/px-to-rem'

export const CardButtons = styled.div`
  display: grid;
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

  @media (max-width: ${({ theme }) => pxToRem(theme.breakpoints.small)}) {
    display: none;
  }
`

export const EditIcon = styled(DefaultEditIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Exercise = styled.div`
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

export const Info = styled.div`
  display: grid;
  gap: 1.5rem;
`
