import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

import useMe from '~/hooks/useMe'
import useRoutine from '~/hooks/useRoutine'
import useRoutines from '~/hooks/useRoutines'
import { ROUTES } from '~/services/routing/Routes/constants'

import { Routine } from './types'

const useLayout = () => {
  const { create: createRoutine } = useRoutine({})
  const { id } = useParams()
  const [isCreateRoutineOpen, setIsCreateRoutineOpen] = useState(false)
  const isUserOwnRoutines = !id
  const { me } = useMe()
  const navigate = useNavigate()
  const { routines } = useRoutines({ ownerId: id ?? me?.id ?? '' })
  const { t } = useTranslation('routines')

  const handleCloseCreateRoutine = useCallback(() => {
    setIsCreateRoutineOpen(false)
  }, [])

  const handleOpenCreateRoutine = useCallback(() => {
    setIsCreateRoutineOpen(true)
  }, [])

  const handleSubmit = useCallback(
    async (routine: Routine) => {
      const result = await createRoutine(routine)
      if (!result) return

      handleCloseCreateRoutine()
      navigate(`${ROUTES.ROUTINE}/${result.createdRoutine?.id}`)
    },
    [createRoutine, handleCloseCreateRoutine, navigate],
  )

  useEffect(() => {
    if (id === me?.id) navigate(ROUTES.HOME)
  }, [id, me, navigate])

  return {
    handleCloseCreateRoutine,
    handleOpenCreateRoutine,
    handleSubmit,
    isCreateRoutineOpen,
    isUserOwnRoutines,
    routines,
    t,
  }
}

export default useLayout
