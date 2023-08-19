import { ChangeEventHandler, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { User } from '~/graphql/types'
import useUsers from '~/hooks/useUsers'

const useExplore = () => {
  const { t } = useTranslation('explore')
  const { users } = useUsers()
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  const handleSearch: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (!event.target.value) {
        setFilteredUsers([])
        return
      }

      setFilteredUsers(
        users.filter(({ name }) => name.startsWith(event.target.value)),
      )
    },
    [users],
  )

  return { filteredUsers, handleSearch, t }
}

export default useExplore
