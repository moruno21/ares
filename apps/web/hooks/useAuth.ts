import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '~/services/routing/Routes/constants'
import { removeAuth, setAuth } from '~/services/storage'

export const useAuth = () => {
  const navigate = useNavigate()

  const login = useCallback(
    (auth: string) => {
      setAuth(auth)
      navigate(ROUTES.HOME)
    },
    [navigate],
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
