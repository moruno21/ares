import { ReactComponent as EditIcon } from '@ares/ui/assets/icons/edit.svg'
import { ReactComponent as HomeIcon } from '@ares/ui/assets/icons/home.svg'
import { ReactComponent as SearchIcon } from '@ares/ui/assets/icons/search.svg'
import { useMemo } from 'react'

import { ROUTES } from '~/services/routing/Routes/constants'

const useNavbar = () => {
  const menuItems = useMemo(
    () => [
      {
        icon: HomeIcon,
        id: 'home',
        route: ROUTES.HOME,
      },
      {
        icon: SearchIcon,
        id: 'explore',
        route: ROUTES.EXPLORE,
      },
      {
        icon: EditIcon,
        id: 'exercises',
        route: ROUTES.EXERCISES,
      },
    ],
    [],
  )

  return { menuItems }
}

export default useNavbar
