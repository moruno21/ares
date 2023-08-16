import jwtDecode from 'jwt-decode'

import { getAuth, removeAuth } from '~/services/storage'

import { Token } from './types'

export const getAuthToken = () => {
  const auth = getAuth()
  if (!auth) return

  const decodedAuth = jwtDecode(auth) as Token

  if (decodedAuth.exp < Date.now() / 1000) {
    removeAuth()
    return
  }

  return auth
}
