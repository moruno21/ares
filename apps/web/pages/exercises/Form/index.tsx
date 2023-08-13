import Button from '@ares/ui/components/Button'
import Input from '@ares/ui/components/Input'
import { ErrorMessage, Field as FormikField } from 'formik'

import useForm from './hooks'
import {
  Container,
  Content,
  CustomErrorMessage,
  Field,
  Fields,
  Label,
} from './styles'
import { FormProps } from './types'

const Form = ({ error }: FormProps) => {
  const { handleChangeDescription, handleChangeName, t } = useForm()

  return (
    <Container>
      <Content>
        <Fields>
          <Field>
            <Label htmlFor="exercise_name">{t('form.inputs.name.label')}</Label>
            <FormikField
              as={Input}
              id="exercise_name"
              name="name"
              onChange={handleChangeName}
              placeholder={t('form.inputs.name.placeholder')}
            />
            <ErrorMessage name="name">
              {(msg) => <CustomErrorMessage>{msg}</CustomErrorMessage>}
            </ErrorMessage>
          </Field>
          <Field>
            <Label htmlFor="exercise_description">
              {t('form.inputs.description.label')}
            </Label>
            <FormikField
              as={Input}
              id="exercise_description"
              name="description"
              onChange={handleChangeDescription}
              placeholder={t('form.inputs.description.placeholder')}
            />
            <ErrorMessage name="description">
              {(msg) => <CustomErrorMessage>{msg}</CustomErrorMessage>}
            </ErrorMessage>
          </Field>
        </Fields>
        <Button type="submit">{t('form.save.label')}</Button>
      </Content>
      {error ? <CustomErrorMessage>{error}</CustomErrorMessage> : null}
    </Container>
  )
}

export default Form
