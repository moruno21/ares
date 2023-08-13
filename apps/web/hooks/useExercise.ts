import { ApolloError, useApolloClient } from '@apollo/client'
import { useCallback } from 'react'

import CREATE_EXERCISE from '~/graphql/mutations/createExercise'
import DELETE_EXERCISE from '~/graphql/mutations/deleteExercise'
import EDIT_EXERCISE from '~/graphql/mutations/editExercise'
import EXERCISES from '~/graphql/queries/exercises'
import {
  CreateExerciseMutation,
  CreateExerciseMutationVariables,
  DeleteExerciseMutation,
  DeleteExerciseMutationVariables,
  EditExerciseMutation,
  EditExerciseMutationVariables,
  ExerciseInput,
  ExercisesQuery,
} from '~/graphql/types'

const useExercise = () => {
  const { cache, mutate } = useApolloClient()

  const create = useCallback(
    async ({ description, name }: ExerciseInput) => {
      try {
        const response = await mutate<
          CreateExerciseMutation,
          CreateExerciseMutationVariables
        >({
          mutation: CREATE_EXERCISE,
          variables: {
            exerciseInput: {
              description,
              name,
            },
          },
        })

        const createdExercise = response.data?.createExercise

        const cachedExercises = cache.readQuery<ExercisesQuery>({
          query: EXERCISES,
        })

        cache.writeQuery({
          data: {
            exercises: [
              ...(cachedExercises ? cachedExercises.exercises : []),
              response.data?.createExercise,
            ],
          },
          query: EXERCISES,
        })

        return { createdExercise }
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
    async (id: string, { description, name }: ExerciseInput) => {
      try {
        const response = await mutate<
          EditExerciseMutation,
          EditExerciseMutationVariables
        >({
          mutation: EDIT_EXERCISE,
          variables: {
            editExerciseId: id,
            exerciseInput: {
              description,
              name,
            },
          },
        })

        return { editedExercise: response.data?.editExercise }
      } catch (err) {
        if (err instanceof ApolloError)
          return {
            error: err.message,
          }
      }
    },
    [mutate],
  )

  const remove = useCallback(
    async (id: string) => {
      try {
        await mutate<DeleteExerciseMutation, DeleteExerciseMutationVariables>({
          mutation: DELETE_EXERCISE,
          variables: { deleteExerciseId: id },
        })

        cache.evict({
          id: cache.identify({ __typename: 'Exercise', id }),
        })
        cache.gc()
      } catch (err) {
        throw err
      }
    },
    [cache, mutate],
  )

  return { create, edit, remove }
}

export default useExercise
