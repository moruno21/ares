import { AUTH_TOKEN } from './constants'

export const getAuth = () => {
  const auth = localStorage.getItem(AUTH_TOKEN)

  if (!auth) return

  return JSON.parse(auth)
}

export const removeAuth = () => {
  localStorage.removeItem(AUTH_TOKEN)
}

export const setAuth = (value: string) => {
  localStorage.setItem(AUTH_TOKEN, JSON.stringify(value))
}
