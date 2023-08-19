import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '~/services/routing/Routes/constants'
import { removeAuth } from '~/services/storage'

export const useAuth = () => {
  const navigate = useNavigate()

  const logout = useCallback(() => {
    removeAuth()
    navigate(ROUTES.LOGIN, { replace: true })
  }, [navigate])

  return {
    logout,
  }
}
