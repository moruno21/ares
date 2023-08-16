import { Navigate, Outlet } from 'react-router-dom'

import { getAuthToken } from '~/services/auth'

import { ROUTES } from '../Routes/constants'

const PreventAuth = () => {
  const auth = getAuthToken()

  if (auth) return <Navigate replace to={ROUTES.HOME} />

  return <Outlet />
}

export default PreventAuth
