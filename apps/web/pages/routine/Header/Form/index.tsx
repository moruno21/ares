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

const Form = () => {
  const { handleChangeDescription, handleChangeName, t } = useForm()

  return (
    <Container>
      <Content>
        <Fields>
          <Field>
            <Label htmlFor="routine_name">
              {t('header_form.inputs.name.label')}
            </Label>
            <FormikField
              as={Input}
              id="routine_name"
              name="name"
              onChange={handleChangeName}
              placeholder={t('header_form.inputs.name.placeholder')}
            />
            <ErrorMessage name="name">
              {(msg) => <CustomErrorMessage>{msg}</CustomErrorMessage>}
            </ErrorMessage>
          </Field>
          <Field>
            <Label htmlFor="routine_description">
              {t('header_form.inputs.description.label')}
            </Label>
            <FormikField
              as={Input}
              id="routine_description"
              name="description"
              onChange={handleChangeDescription}
              placeholder={t('header_form.inputs.description.placeholder')}
            />
            <ErrorMessage name="description">
              {(msg) => <CustomErrorMessage>{msg}</CustomErrorMessage>}
            </ErrorMessage>
          </Field>
        </Fields>
        <Button type="submit">{t('header_form.save.label')}</Button>
      </Content>
    </Container>
  )
}

export default Form
