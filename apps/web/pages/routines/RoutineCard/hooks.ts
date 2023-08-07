import { useMemo } from 'react'
import { generatePath } from 'react-router-dom'

import { ROUTES } from '~/services/routing/Routes/constants'

import { UseRoutineCardProps } from './types'

const useRoutineCard = ({ id }: UseRoutineCardProps) => {
  const href = useMemo(() => generatePath(ROUTES.ROUTINE, { id }), [id])

  return { href }
}

export default useRoutineCard
