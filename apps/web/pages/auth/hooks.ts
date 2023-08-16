import { CredentialResponse } from '@react-oauth/google'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '~/services/routing/Routes/constants'
import { setAuth } from '~/services/storage'

const useLayout = () => {
  const navigate = useNavigate()
  const { t } = useTranslation('auth')
  const [error, setError] = useState<string>()

  const handleError = useCallback(() => {
    setError(t('error'))
  }, [t])

  const handleSuccess = useCallback(
    (response: CredentialResponse) => {
      if (!response.credential) return

      setAuth(response.credential)
      navigate(ROUTES.HOME)
    },
    [navigate],
  )

  return { error, handleError, handleSuccess, t }
}

export default useLayout
