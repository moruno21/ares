import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import useRoutine from '~/hooks/useRoutine'
import useRoutines from '~/hooks/useRoutines'
import { ROUTES } from '~/services/routing/Routes/constants'

import { Values } from './types'

const useLayout = () => {
  const { create: createRoutine } = useRoutine({})
  const [isCreateRoutineOpen, setIsCreateRoutineOpen] = useState(false)
  const navigate = useNavigate()
  const { routines } = useRoutines()
  const { t } = useTranslation('routines')

  const handleCloseCreateRoutine = useCallback(() => {
    setIsCreateRoutineOpen(false)
  }, [])

  const handleOpenCreateRoutine = useCallback(() => {
    setIsCreateRoutineOpen(true)
  }, [])

  const handleSubmit = useCallback(
    async (values: Values) => {
      const result = await createRoutine(values)
      if (!result) return

      handleCloseCreateRoutine()
      navigate(`${ROUTES.ROUTINE}/${result.createdRoutine?.id}`)
    },
    [createRoutine, handleCloseCreateRoutine, navigate],
  )

  return {
    handleCloseCreateRoutine,
    handleOpenCreateRoutine,
    handleSubmit,
    isCreateRoutineOpen,
    routines,
    t,
  }
}

export default useLayout
