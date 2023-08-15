import { DropdownProps } from '@ares/ui/components/Dropdown'
import { useFormikContext } from 'formik'
import { FocusEvent, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useExercises from '~/hooks/useExercises'

import { Values } from '../types'
import { UseWorkoutProps } from './types'

const useWorkout = ({ exerciseId, index }: UseWorkoutProps) => {
  const { errors, handleBlur, handleSubmit, initialValues, setFieldValue } =
    useFormikContext<Values>()
  const [exercise, setExercise] = useState<string>(exerciseId)
  const { exercises } = useExercises()
  const [isEditWorkoutOpen, setIsEditWorkoutOpen] = useState(false)
  const { t } = useTranslation('routine')

  const dropdownOptions = useMemo(
    () => exercises.map(({ id, name }) => ({ text: name, value: id })),
    [exercises],
  )

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

  const handleExerciseChange: DropdownProps['onChange'] = useCallback(
    (value) => {
      if (!value) return

      setFieldValue(`workouts[${index}].exerciseId`, value)
      setExercise(value)
    },
    [index, setFieldValue],
  )

  const handleOpenEditWorkout = useCallback(() => {
    setIsEditWorkoutOpen(true)
  }, [])

  const handleSaveWorkout = useCallback(() => {
    handleSubmit()

    if (Object.keys(errors).length > 0) return

    handleCloseEditWorkout()
  }, [handleCloseEditWorkout, handleSubmit, errors])

  return {
    dropdownOptions,
    exercise,
    handleBlurInput,
    handleExerciseChange,
    handleOpenEditWorkout,
    handleSaveWorkout,
    initialValues,
    isEditWorkoutOpen,
    t,
  }
}

export default useWorkout
