import { ApolloError, useApolloClient, useQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'

import InternalException from '~/exceptions/Internal'
import CREATE_ROUTINE from '~/graphql/mutations/createRoutine'
import DELETE_ROUTINE from '~/graphql/mutations/deleteRoutine'
import EDIT_ROUTINE from '~/graphql/mutations/editRoutine'
import ROUTINE from '~/graphql/queries/routine'
import ROUTINES from '~/graphql/queries/routines'
import {
  CreateRoutineMutation,
  CreateRoutineMutationVariables,
  DeleteRoutineMutation,
  DeleteRoutineMutationVariables,
  EditRoutineMutation,
  EditRoutineMutationVariables,
  RoutineInput,
  RoutineQuery,
  RoutineQueryVariables,
  RoutinesQuery,
} from '~/graphql/types'
import useMe from '~/hooks/useMe'

import { UseRoutineProps } from './types'

const useRoutine = ({ id }: UseRoutineProps) => {
  const { cache, mutate } = useApolloClient()
  const { data, refetch } = useQuery<RoutineQuery, RoutineQueryVariables>(
    ROUTINE,
    {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
      skip: !id,
      variables: { routineId: id ?? '' },
    },
  )
  const { me } = useMe()

  const routine = useMemo(() => (data ? data.routine : undefined), [data])

  const create = useCallback(
    async ({ description, name, workouts }: Omit<RoutineInput, 'ownerId'>) => {
      if (!me) throw InternalException

      try {
        const response = await mutate<
          CreateRoutineMutation,
          CreateRoutineMutationVariables
        >({
          mutation: CREATE_ROUTINE,
          variables: {
            routineInput: {
              description,
              name,
              ownerId: me.id,
              workouts,
            },
          },
        })

        const createdRoutine = response.data?.createRoutine

        const cachedRoutines = cache.readQuery<RoutinesQuery>({
          query: ROUTINES,
        })

        cache.writeQuery({
          data: {
            routines: [
              ...(cachedRoutines ? cachedRoutines.routines : []),
              response.data?.createRoutine,
            ],
          },
          query: ROUTINES,
        })

        return { createdRoutine }
      } catch (err) {
        if (err instanceof ApolloError)
          return {
            error: err.message,
          }
      }
    },
    [cache, me, mutate],
  )

  const edit = useCallback(
    async (
      editRoutineId: string,
      { description, name, workouts }: Omit<RoutineInput, 'ownerId'>,
    ) => {
      if (!me) throw InternalException

      try {
        const response = await mutate<
          EditRoutineMutation,
          EditRoutineMutationVariables
        >({
          mutation: EDIT_ROUTINE,
          variables: {
            editRoutineId: editRoutineId,
            routineInput: {
              description,
              name,
              ownerId: me.id,
              workouts: workouts.map(({ exerciseId, reps, sets }) => ({
                exerciseId,
                reps,
                sets,
              })),
            },
          },
        })

        const updatedRoutine = await refetch()
        cache.writeQuery({
          data: {
            routine: updatedRoutine,
          },
          query: ROUTINE,
        })

        return { editedExercise: response.data?.editRoutine }
      } catch (err) {
        throw err
      }
    },
    [cache, me, mutate, refetch],
  )

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

  return { create, edit, remove, routine }
}

export default useRoutine
