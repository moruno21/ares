import { CredentialResponse } from '@react-oauth/google'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAuth } from '~/hooks/useAuth'

const useLayout = () => {
  const { t } = useTranslation('auth')
  const [error, setError] = useState<string>()
  const { login } = useAuth()

  const handleError = useCallback(() => {
    setError(t('error'))
  }, [t])

  const handleSuccess = useCallback(
    (response: CredentialResponse) => {
      const auth = response.credential
      if (!auth) return

      login(auth)
    },
    [login],
  )

  return { error, handleError, handleSuccess, t }
}

export default useLayout
