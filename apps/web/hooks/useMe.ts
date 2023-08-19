import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import USER_BY_EMAIL from '~/graphql/queries/userByEmail'
import { UserByEmailQuery, UserByEmailQueryVariables } from '~/graphql/types'
import { decodeAuthToken, getAuthToken } from '~/services/auth'

const useMe = () => {
  const { data } = useQuery<UserByEmailQuery, UserByEmailQueryVariables>(
    USER_BY_EMAIL,
    { variables: { userEmail: decodeAuthToken(getAuthToken()).email } },
  )

  const me = useMemo(
    () =>
      data
        ? {
            email: data.userByEmail.email,
            id: data.userByEmail.id,
            name: data.userByEmail.name,
          }
        : undefined,
    [data],
  )

  return { me }
}

export default useMe
