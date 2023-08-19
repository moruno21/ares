import { useApolloClient } from '@apollo/client'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import CREATE_USER from '~/graphql/mutations/createUser'
import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from '~/graphql/types'
import { decodeAuthToken } from '~/services/auth'
import { ROUTES } from '~/services/routing/Routes/constants'
import { removeAuth, setAuth } from '~/services/storage'

export const useAuth = () => {
  const navigate = useNavigate()
  const { mutate } = useApolloClient()

  const login = useCallback(
    async (auth: string) => {
      try {
        await mutate<CreateUserMutation, CreateUserMutationVariables>({
          mutation: CREATE_USER,
          variables: {
            userInput: {
              email: decodeAuthToken(auth).email,
            },
          },
        })
      } catch (e) {}

      setAuth(auth)
      navigate(ROUTES.HOME)
    },
    [mutate, navigate],
  )

  const logout = useCallback(() => {
    removeAuth()
    navigate(ROUTES.LOGIN, { replace: true })
  }, [navigate])

  return {
    login,
    logout,
  }
}
