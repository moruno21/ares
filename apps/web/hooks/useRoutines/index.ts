import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import ROUTINES_BY_OWNER_ID from '~/graphql/queries/routinesByOwnerId'
import {
  RoutinesByOwnerIdQuery,
  RoutinesByOwnerIdQueryVariables,
} from '~/graphql/types'

import { UseRoutinesProps } from './types'

const useRoutines = ({ ownerId }: UseRoutinesProps) => {
  const { data, loading } = useQuery<
    RoutinesByOwnerIdQuery,
    RoutinesByOwnerIdQueryVariables
  >(ROUTINES_BY_OWNER_ID, {
    fetchPolicy: 'cache-first',
    skip: !ownerId,
    variables: { ownerId },
  })

  const routines = useMemo(() => data?.routinesByOwnerId ?? [], [data])

  return { loading, routines }
}

export default useRoutines
