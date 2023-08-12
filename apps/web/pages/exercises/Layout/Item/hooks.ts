import { ApolloError, useApolloClient } from '@apollo/client'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import DELETE_EXERCISE from '~/graphql/mutations/deleteExercise'
import EDIT_EXERCISE from '~/graphql/mutations/editExercise'
import {
  DeleteExerciseMutation,
  DeleteExerciseMutationVariables,
  EditExerciseMutation,
  EditExerciseMutationVariables,
} from '~/graphql/types'

import { Values } from '../types'
import { UseItemProps } from './types'

const useItem = ({ description, id, name }: UseItemProps) => {
  const { cache, mutate } = useApolloClient()
  const [editError, setEditError] = useState<string>()
  const [isEditError, setIsEditError] = useState(false)
  const [isEditExerciseOpen, setIsEditExerciseOpen] = useState(false)
  const { t } = useTranslation('exercises')

  const initialValues = useMemo(
    () => ({ description, name }),
    [description, name],
  )

  const handleCloseEditExercise = useCallback(() => {
    setIsEditExerciseOpen(false)
  }, [])

  const handleDeleteExercise = useCallback(async () => {
    await mutate<DeleteExerciseMutation, DeleteExerciseMutationVariables>({
      mutation: DELETE_EXERCISE,
      variables: { deleteExerciseId: id },
    })

    cache.evict({
      id: cache.identify({ __typename: 'Exercise', id }),
    })
    cache.gc()
  }, [mutate, id, cache])

  const handleOpenEditExercise = useCallback(() => {
    setIsEditExerciseOpen(true)
  }, [])

  const handleSubmit = useCallback(
    async (values: Values) => {
      try {
        await mutate<EditExerciseMutation, EditExerciseMutationVariables>({
          mutation: EDIT_EXERCISE,
          variables: {
            editExerciseId: id,
            exerciseInput: {
              description: values.description,
              name: values.name,
            },
          },
        })

        setIsEditError(false)
        handleCloseEditExercise()
      } catch (err) {
        if (err instanceof ApolloError) {
          setEditError(err.message)
          setIsEditError(true)
        }
      }
    },
    [mutate, id, handleCloseEditExercise],
  )

  return {
    editError,
    handleCloseEditExercise,
    handleDeleteExercise,
    handleOpenEditExercise,
    handleSubmit,
    initialValues,
    isEditError,
    isEditExerciseOpen,
    t,
  }
}

export default useItem
