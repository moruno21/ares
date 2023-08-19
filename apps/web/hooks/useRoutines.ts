import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import ROUTINES from '~/graphql/queries/routines'
import { RoutinesQuery, RoutinesQueryVariables } from '~/graphql/types'

const useRoutines = () => {
  const { data, loading } = useQuery<RoutinesQuery, RoutinesQueryVariables>(
    ROUTINES,
  )

  const routines = useMemo(() => data?.routines ?? [], [data])

  return { loading, routines }
}

export default useRoutines
