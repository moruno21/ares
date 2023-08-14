import { useFormikContext } from 'formik'
import { FocusEvent, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Values } from '../types'

const useWorkout = () => {
  const { errors, handleBlur, handleSubmit, initialValues, setFieldValue } =
    useFormikContext<Values>()
  const [isEditWorkoutOpen, setIsEditWorkoutOpen] = useState(false)
  const { t } = useTranslation('routine')

  const handleBlurInput = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (!event.target.value)
        setFieldValue(
          event.target.name,
          parseInt(event.target.dataset.initialvalue ?? '0'),
          false,
        )

      handleBlur(event)
    },
    [setFieldValue, handleBlur],
  )

  const handleCloseEditWorkout = useCallback(() => {
    setIsEditWorkoutOpen(false)
  }, [])

  const handleOpenEditWorkout = useCallback(() => {
    setIsEditWorkoutOpen(true)
  }, [])

  const handleSaveWorkout = useCallback(() => {
    handleSubmit()

    if (Object.keys(errors).length > 0) return

    handleCloseEditWorkout()
  }, [handleCloseEditWorkout, handleSubmit, errors])

  return {
    handleBlurInput,
    handleCloseEditWorkout,
    handleOpenEditWorkout,
    handleSaveWorkout,
    initialValues,
    isEditWorkoutOpen,
    t,
  }
}

export default useWorkout
