import Input from '@ares/ui/components/Input'
import { ErrorMessage, Field } from 'formik'

import { CustomErrorMessage } from '../styles'
import useInputField from './hooks'
import { InputFieldProps } from './types'

const InputField = ({ name, placeholder }: InputFieldProps) => {
  const { handleChangeInputField } = useInputField({ name })

  return (
    <>
      <Field
        as={Input}
        name={name}
        onChange={handleChangeInputField}
        placeholder={placeholder}
      />
      <ErrorMessage name={name}>
        {(msg) => <CustomErrorMessage>{msg}</CustomErrorMessage>}
      </ErrorMessage>
    </>
  )
}

export default InputField
