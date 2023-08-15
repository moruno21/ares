import { FormikHelpers } from 'formik'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useExercise from '~/hooks/useExercise'
import useExercises from '~/hooks/useExercises'

import { Exercise } from './types'

const useLayout = () => {
  const { create: createExercise } = useExercise()
  const { exercises } = useExercises()
  const [isCreateExerciseOpen, setIsCreateExerciseOpen] = useState(false)
  const { t } = useTranslation('exercises')

  const handleCloseCreateExercise = useCallback(() => {
    setIsCreateExerciseOpen(false)
  }, [])

  const handleOpenCreateExercise = useCallback(() => {
    setIsCreateExerciseOpen(true)
  }, [])

  const handleSubmit = useCallback(
    async (exercise: Exercise, { setFieldError }: FormikHelpers<Exercise>) => {
      const result = await createExercise(exercise)
      if (!result) return

      const { error } = result
      if (error) {
        setFieldError('name', error)
        return
      }

      handleCloseCreateExercise()
    },
    [createExercise, handleCloseCreateExercise],
  )

  return {
    exercises,
    handleCloseCreateExercise,
    handleOpenCreateExercise,
    handleSubmit,
    isCreateExerciseOpen,
    t,
  }
}

export default useLayout
