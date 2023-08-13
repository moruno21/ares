import { Body2, Body2Styles } from '@ares/ui/components/Text'
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

export const Field = styled.div`
  display: grid;
  gap: 0.75rem;
`

export const Fields = styled.div`
  display: grid;
  gap: 3rem;
`

export const Label = styled.label`
  ${Body2Styles}
`
