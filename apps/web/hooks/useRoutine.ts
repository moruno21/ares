import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import ROUTINE from '~/graphql/queries/routine'
import { RoutineQuery } from '~/graphql/types'

const useRoutine = ({ id }: { id?: string }) => {
  const { data } = useQuery<RoutineQuery>(ROUTINE, {
    variables: { routineId: id ?? '' },
  })

  const routine = useMemo(() => (data ? data.routine : undefined), [data])

  return { routine }
}

export default useRoutine
