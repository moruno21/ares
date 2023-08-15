import { useFormikContext } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import useRoutine from '~/hooks/useRoutine'
import { encrypt } from '~/lib/encryption'
import { ROUTES } from '~/services/routing/Routes/constants'

import { Values } from '../types'

const useHeader = () => {
  const { errors, handleSubmit } = useFormikContext<Values>()
  const { id } = useParams()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditHeaderOpen, setIsEditHeaderOpen] = useState(false)
  const navigate = useNavigate()
  const { remove: deleteRoutine } = useRoutine({ id })
  const { t } = useTranslation('routine')

  const idHash = useMemo(() => encodeURIComponent(encrypt(id ?? '')), [id])

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false)
  }, [])

  const handleCloseEditHeader = useCallback(() => {
    setIsEditHeaderOpen(false)
  }, [])

  const handleDeleteRoutine = useCallback(async () => {
    await deleteRoutine(id ?? '')

    navigate(ROUTES.HOME)
    handleCloseDeleteModal()
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

  const handleSaveHeader = useCallback(() => {
    handleSubmit()

    if (Object.keys(errors).length > 0) return

    handleCloseEditHeader()
  }, [errors, handleCloseEditHeader, handleSubmit])

  return {
    handleCloseDeleteModal,
    handleDeleteRoutine,
    handleGoBack,
    handleOpenDeleteModal,
    handleOpenEditHeader,
    handleSaveHeader,
    idHash,
    isDeleteModalOpen,
    isEditHeaderOpen,
    t,
  }
}

export default useHeader
