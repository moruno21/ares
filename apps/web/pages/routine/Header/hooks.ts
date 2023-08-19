import { useFormikContext } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import useMe from '~/hooks/useMe'
import useRoutine from '~/hooks/useRoutine'
import { encrypt } from '~/lib/encryption'
import { ROUTES } from '~/services/routing/Routes/constants'

import { Routine } from '../types'

const useHeader = () => {
  const { errors, handleSubmit } = useFormikContext<Routine>()
  const { id } = useParams()
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isEditHeaderOpen, setIsEditHeaderOpen] = useState(false)
  const { me } = useMe()
  const navigate = useNavigate()
  const {
    create: createRoutine,
    remove: deleteRoutine,
    routine,
  } = useRoutine({ id })
  const isUserOwnRoutine = routine?.ownerId === me?.id
  const { t } = useTranslation('routine')

  const idHash = useMemo(() => encodeURIComponent(encrypt(id ?? '')), [id])

  const handleCloseCopyModal = useCallback(() => {
    setIsCopyModalOpen(false)
  }, [])

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false)
  }, [])

  const handleCloseEditHeader = useCallback(() => {
    setIsEditHeaderOpen(false)
  }, [])

  const handleCloseShareModal = useCallback(() => {
    setIsShareModalOpen(false)
  }, [])

  const handleCopyRoutine = useCallback(async () => {
    if (!routine) return

    await createRoutine({
      description: routine.description,
      name: routine.name,
      workouts: routine.workouts.map((workout) => ({
        exerciseId: workout.exerciseId,
        reps: workout.reps,
        sets: workout.sets,
      })),
    })

    handleCloseCopyModal()
  }, [createRoutine, routine, handleCloseCopyModal])

  const handleDeleteRoutine = useCallback(async () => {
    await deleteRoutine(id ?? '')

    navigate(ROUTES.HOME)
    handleCloseDeleteModal()
  }, [deleteRoutine, handleCloseDeleteModal, id, navigate])

  const handleGoBack = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const handleOpenCopyModal = useCallback(() => {
    setIsCopyModalOpen(true)
  }, [])

  const handleOpenDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(true)
  }, [])

  const handleOpenEditHeader = useCallback(() => {
    setIsEditHeaderOpen(true)
  }, [])

  const handleOpenShareModal = useCallback(() => {
    setIsShareModalOpen(true)
  }, [])

  const handleSaveHeader = useCallback(() => {
    handleSubmit()

    if (Object.keys(errors).length > 0) return

    handleCloseEditHeader()
  }, [errors, handleCloseEditHeader, handleSubmit])

  return {
    handleCloseCopyModal,
    handleCloseDeleteModal,
    handleCloseShareModal,
    handleCopyRoutine,
    handleDeleteRoutine,
    handleGoBack,
    handleOpenCopyModal,
    handleOpenDeleteModal,
    handleOpenEditHeader,
    handleOpenShareModal,
    handleSaveHeader,
    idHash,
    isCopyModalOpen,
    isDeleteModalOpen,
    isEditHeaderOpen,
    isShareModalOpen,
    isUserOwnRoutine,
    t,
  }
}

export default useHeader
