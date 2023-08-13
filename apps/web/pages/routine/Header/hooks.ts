import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import useRoutine from '~/hooks/useRoutine'
import { ROUTES } from '~/services/routing/Routes/constants'

import { UseHeaderProps } from './types'

const useHeader = ({ id }: UseHeaderProps) => {
  const { remove: deleteRoutine } = useRoutine({ id })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation('routine')

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false)
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

  return {
    handleCloseDeleteModal,
    handleDeleteRoutine,
    handleGoBack,
    handleOpenDeleteModal,
    isDeleteModalOpen,
    t,
  }
}

export default useHeader
