import { FormikHelpers } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useExercise from '~/hooks/useExercise'

import { Exercise } from '../types'
import { UseItemProps } from './types'

const useItem = ({ description, id, name }: UseItemProps) => {
  const { edit: editExercise, remove: deleteExercise } = useExercise()
  const [isEditExerciseOpen, setIsEditExerciseOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { t } = useTranslation('exercises')

  const initialValues = useMemo(
    () => ({ description, name }),
    [description, name],
  )

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false)
  }, [])

  const handleCloseEditExercise = useCallback(() => {
    setIsEditExerciseOpen(false)
  }, [])

  const handleDeleteExercise = useCallback(async () => {
    await deleteExercise(id)
    handleCloseDeleteModal()
  }, [deleteExercise, handleCloseDeleteModal, id])

  const handleOpenDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(true)
  }, [])

  const handleOpenEditExercise = useCallback(() => {
    setIsEditExerciseOpen(true)
  }, [])

  const handleSubmit = useCallback(
    async (exercise: Exercise, { setFieldError }: FormikHelpers<Exercise>) => {
      const result = await editExercise(id, exercise)
      if (!result) return

      const { error } = result
      if (error) {
        setFieldError('name', error)
        return
      }

      handleCloseEditExercise()
    },
    [editExercise, id, handleCloseEditExercise],
  )

  return {
    handleCloseDeleteModal,
    handleCloseEditExercise,
    handleDeleteExercise,
    handleOpenDeleteModal,
    handleOpenEditExercise,
    handleSubmit,
    initialValues,
    isDeleteModalOpen,
    isEditExerciseOpen,
    t,
  }
}

export default useItem
