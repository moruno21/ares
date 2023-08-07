import { ReactComponent as EditIcon } from '@ares/ui/assets/icons/edit.svg'
import { ReactComponent as ExploreIcon } from '@ares/ui/assets/icons/explore.svg'
import { ReactComponent as HomeIcon } from '@ares/ui/assets/icons/home.svg'
import { useMemo } from 'react'

import { ROUTES } from '~/services/routing/Routes/constants'

const useNavbar = () => {
  const menuItems = useMemo(
    () => [
      {
        icon: HomeIcon,
        id: 'home',
        route: ROUTES.ROUTINES,
      },
      {
        icon: ExploreIcon,
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
