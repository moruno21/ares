import { useQuery } from '@apollo/client'
import { useMemo } from 'react'

import USERS from '~/graphql/queries/users'
import { UsersQuery, UsersQueryVariables } from '~/graphql/types'

const useUsers = () => {
  const { data, loading } = useQuery<UsersQuery, UsersQueryVariables>(USERS)

  const users = useMemo(() => data?.users ?? [], [data])

  return { loading, users }
}

export default useUsers
