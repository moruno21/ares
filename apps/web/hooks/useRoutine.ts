import { useApolloClient, useQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'

import DELETE_ROUTINE from '~/graphql/mutations/deleteRoutine'
import ROUTINE from '~/graphql/queries/routine'
import {
  DeleteRoutineMutation,
  DeleteRoutineMutationVariables,
  RoutineQuery,
} from '~/graphql/types'

const useRoutine = ({ id }: { id: string }) => {
  const { cache, mutate } = useApolloClient()
  const { data } = useQuery<RoutineQuery>(ROUTINE, {
    variables: { routineId: id ?? '' },
  })

  const routine = useMemo(() => (data ? data.routine : undefined), [data])

  const remove = useCallback(
    async (deleteRoutineId: string) => {
      try {
        await mutate<DeleteRoutineMutation, DeleteRoutineMutationVariables>({
          mutation: DELETE_ROUTINE,
          variables: { deleteRoutineId },
        })

        cache.evict({
          id: cache.identify({ __typename: 'Routine', id: deleteRoutineId }),
        })
        cache.gc()
      } catch (err) {
        throw err
      }
    },
    [cache, mutate],
  )

  return { remove, routine }
}

export default useRoutine
