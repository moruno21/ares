import { ReactComponent as HomeIcon } from '@ares/ui/assets/icons/home.svg'
import { ReactComponent as InfoIcon } from '@ares/ui/assets/icons/info.svg'
import { ReactComponent as SearchIcon } from '@ares/ui/assets/icons/search.svg'
import { ReactComponent as UserIcon } from '@ares/ui/assets/icons/user.svg'
import { useCallback, useMemo } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import { ROUTES } from '~/services/routing/Routes/constants'

const useNavbar = () => {
  const { pathname } = useLocation()

  const isActive = useCallback(
    (route: string) => !!matchPath(route, pathname),
    [pathname],
  )

  const menuItems = useMemo(
    () => [
      {
        icon: HomeIcon,
        id: 'home',
        isActive: isActive(ROUTES.HOME),
        route: ROUTES.HOME,
      },
      {
        icon: SearchIcon,
        id: 'explore',
        isActive: isActive(ROUTES.EXPLORE),
        route: ROUTES.EXPLORE,
      },
      {
        icon: InfoIcon,
        id: 'exercises',
        isActive: isActive(ROUTES.EXERCISES),
        route: ROUTES.EXERCISES,
      },
      {
        icon: UserIcon,
        id: 'profile',
        isActive: isActive(ROUTES.PROFILE),
        route: ROUTES.PROFILE,
      },
    ],
    [isActive],
  )

  return { menuItems }
}

export default useNavbar
