import { ReactComponent as DefaultArrowRightIcon } from '@ares/ui/assets/icons/arrow-right.svg'
import { H3 } from '@ares/ui/components/Text'
import styled from 'styled-components'

export const ArrowRightIcon = styled(DefaultArrowRightIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Container = styled.div`
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  display: flex;
  justify-content: space-between;
  max-width: 35rem;
  min-height: 6rem;
  padding: 1.5rem;
  width: 100%;
`

export const Name = styled(H3)``
