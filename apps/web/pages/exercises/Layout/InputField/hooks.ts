import { useFormikContext } from 'formik'
import { ChangeEvent, useCallback } from 'react'

import { UseInputFieldProps } from './types'

const useInputField = ({ name }: UseInputFieldProps) => {
  const formik = useFormikContext()

  const handleChangeInputField = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      formik.setFieldValue(name, event.target.value)
    },
    [formik, name],
  )
  return { handleChangeInputField }
}

export default useInputField
