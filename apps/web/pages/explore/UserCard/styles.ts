import { ReactComponent as DefaultArrowRightIcon } from '@ares/ui/assets/icons/arrow-right.svg'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ArrowRightIcon = styled(DefaultArrowRightIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Container = styled(Link)`
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.light};
  display: flex;
  justify-content: space-between;
  max-width: 35rem;
  min-height: 6rem;
  padding: 1.5rem;
  width: 100%;
`
