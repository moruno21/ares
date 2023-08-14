import Button from '@ares/ui/components/Button'
import Input from '@ares/ui/components/Input'
import { ErrorMessage, Field as FormikField } from 'formik'
import { useTranslation } from 'react-i18next'

import {
  Container,
  Content,
  CustomErrorMessage,
  Field,
  Fields,
  Label,
} from './styles'

const Form = () => {
  const { t } = useTranslation('exercises')

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
              placeholder={t('form.inputs.description.placeholder')}
            />
            <ErrorMessage name="description">
              {(msg) => <CustomErrorMessage>{msg}</CustomErrorMessage>}
            </ErrorMessage>
          </Field>
        </Fields>
        <Button type="submit">{t('form.save.label')}</Button>
      </Content>
    </Container>
  )
}

export default Form
