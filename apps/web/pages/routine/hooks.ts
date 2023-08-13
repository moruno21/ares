import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import useRoutine from '~/hooks/useRoutine'
import { ROUTES } from '~/services/routing/Routes/constants'

import { initialValues as emptyInitialValues } from './constants'
import { Values } from './types'

const useLayout = () => {
  const { id } = useParams()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditHeaderOpen, setIsEditHeaderOpen] = useState(false)
  const { edit: editRoutine, routine } = useRoutine({ id })
  const navigate = useNavigate()
  const { remove: deleteRoutine } = useRoutine({ id })
  const { t } = useTranslation('routine')

  const initialValues = useMemo(() => routine ?? emptyInitialValues, [routine])

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false)
  }, [])

  const handleCloseEditHeader = useCallback(() => {
    setIsEditHeaderOpen(false)
  }, [])

  const handleDeleteRoutine = useCallback(async () => {
    await deleteRoutine(id ?? '')

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
      const result = await editRoutine(id ?? '', values)
      if (!result) return

      handleCloseEditHeader()
    },
    [editRoutine, handleCloseEditHeader, id],
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
    routine,
    t,
  }
}

export default useLayout
