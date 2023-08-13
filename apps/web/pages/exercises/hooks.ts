import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useExercise from '~/hooks/useExercise'
import useExercises from '~/hooks/useExercises'

import { Values } from './types'

const useLayout = () => {
  const { create: createExercise } = useExercise()
  const [createError, setCreateError] = useState<string>()
  const { exercises } = useExercises()
  const [isCreateExerciseOpen, setIsCreateExerciseOpen] = useState(false)
  const { t } = useTranslation('exercises')

  const handleCloseCreateExercise = useCallback(() => {
    setCreateError('')
    setIsCreateExerciseOpen(false)
  }, [])

  const handleOpenCreateExercise = useCallback(() => {
    setIsCreateExerciseOpen(true)
  }, [])

  const handleSubmit = useCallback(
    async (values: Values) => {
      const result = await createExercise(values)
      if (!result) return

      const { error } = result
      if (error) {
        setCreateError(error)
        return
      }

      handleCloseCreateExercise()
    },
    [createExercise, handleCloseCreateExercise],
  )

  return {
    createError,
    exercises,
    handleCloseCreateExercise,
    handleOpenCreateExercise,
    handleSubmit,
    isCreateExerciseOpen,
    t,
  }
}

export default useLayout
