import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import useExercises from '~/hooks/useExercises'
import useRoutine from '~/hooks/useRoutine'

import { initialValues as emptyInitialValues } from './constants'
import { Values } from './types'

const useLayout = () => {
  const { id } = useParams()
  const { edit: editRoutine, routine } = useRoutine({ id })
  const { exercises } = useExercises()
  const { t } = useTranslation('routine')

  const initialValues = useMemo(() => routine ?? emptyInitialValues, [routine])

  const addWorkoutInitialValues = useMemo(() => {
    if (exercises.length < 1) return

    return { exerciseId: exercises[0].id, reps: 1, sets: 1 }
  }, [exercises])

  const handleSubmit = useCallback(
    async (values: Values) => {
      await editRoutine(id ?? '', values)
    },
    [editRoutine, id],
  )

  return {
    addWorkoutInitialValues,
    handleSubmit,
    initialValues,
    routine,
    t,
  }
}

export default useLayout
