import Button from '@ares/ui/components/Button'
import Input from '@ares/ui/components/Input'
import { ErrorMessage, Field } from 'formik'

import useForm from './hooks'
import { Container, Content, CustomErrorMessage, Fields } from './styles'

const Form = () => {
  const { handleChangeDescription, handleChangeName, t } = useForm()

  return (
    <Container>
      <Content>
        <Fields>
          <Field
            as={Input}
            name="name"
            onChange={handleChangeName}
            placeholder={t('form.inputs.name.placeholder')}
          />
          <ErrorMessage name="name">
            {(msg) => <CustomErrorMessage>{msg}</CustomErrorMessage>}
          </ErrorMessage>
          <Field
            as={Input}
            name="description"
            onChange={handleChangeDescription}
            placeholder={t('form.inputs.description.placeholder')}
          />
          <ErrorMessage name="description">
            {(msg) => <CustomErrorMessage>{msg}</CustomErrorMessage>}
          </ErrorMessage>
        </Fields>
        <Button type="submit">{t('form.save.label')}</Button>
      </Content>
    </Container>
  )
}

export default Form
