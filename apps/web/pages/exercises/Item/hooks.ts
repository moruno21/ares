import { useCallback, useMemo, useState } from 'react'

import useExercise from '~/hooks/useExercise'

import { Values } from '../Layout/types'
import { UseItemProps } from './types'

const useItem = ({ description, id, name }: UseItemProps) => {
  const { edit: editExercise, remove: deleteExercise } = useExercise()
  const [editError, setEditError] = useState<string>()
  const [isEditExerciseOpen, setIsEditExerciseOpen] = useState(false)

  const initialValues = useMemo(
    () => ({ description, name }),
    [description, name],
  )

  const handleCloseEditExercise = useCallback(() => {
    setIsEditExerciseOpen(false)
    setEditError('')
  }, [])

  const handleDeleteExercise = useCallback(async () => {
    await deleteExercise(id)
  }, [deleteExercise, id])

  const handleOpenEditExercise = useCallback(() => {
    setIsEditExerciseOpen(true)
  }, [])

  const handleSubmit = useCallback(
    async (values: Values) => {
      const result = await editExercise(id, values)
      if (!result) return

      const { error } = result
      if (error) {
        setEditError(error)
        return
      }

      handleCloseEditExercise()
    },
    [editExercise, id, handleCloseEditExercise],
  )

  return {
    editError,
    handleCloseEditExercise,
    handleDeleteExercise,
    handleOpenEditExercise,
    handleSubmit,
    initialValues,
    isEditExerciseOpen,
  }
}

export default useItem
