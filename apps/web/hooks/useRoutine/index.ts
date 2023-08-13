import { ApolloError, useApolloClient, useQuery } from '@apollo/client'
import { useCallback, useMemo } from 'react'

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
  RoutinesQuery,
} from '~/graphql/types'

import { UseRoutineProps } from './types'

const useRoutine = ({ id }: UseRoutineProps) => {
  const { cache, mutate } = useApolloClient()
  const { data } = useQuery<RoutineQuery>(ROUTINE, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    skip: !id,
    variables: { routineId: id ?? '' },
  })

  const routine = useMemo(() => (data ? data.routine : undefined), [data])

  const create = useCallback(
    async ({ description, name, workouts }: RoutineInput) => {
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
    [cache, mutate],
  )

  const edit = useCallback(
    async (
      editRoutineId: string,
      { description, name, workouts }: RoutineInput,
    ) => {
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
              workouts: workouts.map(({ exerciseId, reps, sets }) => ({
                exerciseId,
                reps,
                sets,
              })),
            },
          },
        })

        return { editedExercise: response.data?.editRoutine }
      } catch (err) {
        throw err
      }
    },
    [mutate],
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
