import jwtDecode from 'jwt-decode'

import { getAuth, removeAuth } from '~/services/storage'

import { Token } from './types'

export const decodeAuthToken = (auth: string) => jwtDecode(auth) as Token

export const getAuthToken = () => {
  const auth = getAuth()
  if (!auth) return

  if (decodeAuthToken(auth).exp < Date.now() / 1000) {
    removeAuth()
    return
  }

  return auth
}
