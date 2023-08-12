import { Body2 } from '@ares/ui/components/Text'
import { Form } from 'formik'
import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  gap: 1.5rem;
`

export const Content = styled(Form)`
  display: grid;
  gap: 3rem;
`

export const CustomErrorMessage = styled(Body2)`
  color: ${({ theme }) => theme.colors.text.error};
`

export const Fields = styled.div`
  display: grid;
  gap: 1.5rem;
`
