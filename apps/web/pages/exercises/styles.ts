import { ReactComponent as DefaultCloseIcon } from '@ares/ui/assets/icons/close.svg'
import DefaultButton from '@ares/ui/components/Button'
import { Body2 } from '@ares/ui/components/Text'
import { Form } from 'formik'
import styled from 'styled-components'

export const Button = styled(DefaultButton)`
  max-width: 37.5rem;
  width: 100%;
`

export const Card = styled.div`
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  max-width: 37.5rem;
  min-height: 7.25rem;
  padding: 1.5rem;
  width: 100%;
`

export const CloseButton = styled.button`
  justify-self: end;
`

export const CloseIcon = styled(DefaultCloseIcon)`
  height: 1.5rem;
  width: 1.5rem;
`

export const Container = styled.div`
  display: grid;
  gap: 4.5rem;
`

export const CreateExerciseSection = styled.div`
  display: grid;
  justify-items: center;
`

export const CustomErrorMessage = styled(Body2)`
  color: ${({ theme }) => theme.colors.text.error};
`

export const ExerciseCards = styled.div`
  display: grid;
  gap: 3rem;
  justify-items: center;
`

export const ExerciseForm = styled(Form)`
  display: grid;
  gap: 3rem;
`

export const ExerciseFormSection = styled.div`
  display: grid;
  gap: 0.5rem;
`

export const Fields = styled.div`
  display: grid;
  gap: 1.5rem;
`

export const Header = styled.div`
  display: grid;
  gap: 4.5rem;
  justify-items: center;
`