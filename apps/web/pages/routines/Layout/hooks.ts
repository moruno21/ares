import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useRoutine from '~/hooks/useRoutine'
import useRoutines from '~/hooks/useRoutines'

import { Values } from './types'

const useLayout = () => {
  const [isCreateRoutineOpen, setIsCreateRoutineOpen] = useState(false)
  const { routines } = useRoutines()
  const { create: createRoutine } = useRoutine({})
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
    },
    [createRoutine, handleCloseCreateRoutine],
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
