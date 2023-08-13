import { useFormikContext } from 'formik'
import { ChangeEvent, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

const useForm = () => {
  const formik = useFormikContext()
  const { t } = useTranslation('exercises')

  const handleChangeDescription = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      formik.setFieldValue('description', event.target.value)
    },
    [formik],
  )

  const handleChangeName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      formik.setFieldValue('name', event.target.value)
    },
    [formik],
  )

  return { handleChangeDescription, handleChangeName, t }
}

export default useForm
