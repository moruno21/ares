import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import useRoutine from '~/hooks/useRoutine'
import { ROUTES } from '~/services/routing/Routes/constants'

import { UseHeaderProps, Values } from './types'

const useHeader = ({ description, id, name }: UseHeaderProps) => {
  const {
    edit: editRoutine,
    remove: deleteRoutine,
    routine,
  } = useRoutine({ id })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditHeaderOpen, setIsEditHeaderOpen] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation('routine')

  const initialValues = useMemo(
    () => ({ description, name }),
    [description, name],
  )

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false)
  }, [])

  const handleCloseEditHeader = useCallback(() => {
    setIsEditHeaderOpen(false)
  }, [])

  const handleDeleteRoutine = useCallback(async () => {
    await deleteRoutine(id)

    handleCloseDeleteModal()
    navigate(ROUTES.HOME)
  }, [deleteRoutine, handleCloseDeleteModal, id, navigate])

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const handleOpenDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(true)
  }, [])

  const handleOpenEditHeader = useCallback(() => {
    setIsEditHeaderOpen(true)
  }, [])

  const handleSubmit = useCallback(
    async (values: Values) => {
      const input = { ...values, workouts: routine?.workouts ?? [] }
      const result = await editRoutine(id, input)
      if (!result) return

      handleCloseEditHeader()
    },
    [routine, editRoutine, id, handleCloseEditHeader],
  )

  return {
    handleCloseDeleteModal,
    handleDeleteRoutine,
    handleGoBack,
    handleOpenDeleteModal,
    handleOpenEditHeader,
    handleSubmit,
    initialValues,
    isDeleteModalOpen,
    isEditHeaderOpen,
    t,
  }
}

export default useHeader
