import { ReactComponent as DefaultCloseIcon } from '@ares/ui/assets/icons/close.svg'
import DefaultButton from '@ares/ui/components/Button'
import DefaultIconButton from '@ares/ui/components/IconButton'
import { Body3Styles, H3 } from '@ares/ui/components/Text'
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

export const CreateExerciseSection = styled.div`
  display: grid;
  justify-items: center;
  width: 100%;
`

export const Description = styled(H3)`
  text-align: center;
`

export const EmptyMessage = styled.div`
  ${Body3Styles}
  font-size: ${({ theme }) => theme.font.sizes.medium};
`

export const Exercises = styled.div`
  display: grid;
  gap: 3rem;
  justify-items: center;
  width: 100%;
`

export const Header = styled.div`
  display: grid;
  gap: 4.5rem;
  justify-items: center;
`

export const IconButton = styled(DefaultIconButton)`
  justify-self: end;
`
