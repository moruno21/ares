import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { getAuthToken } from '~/services/auth'

import { ROUTES } from '../Routes/constants'

const RequireAuth = () => {
  const location = useLocation()

  if (!getAuthToken())
    return <Navigate replace state={{ from: location }} to={ROUTES.LOGIN} />

  return <Outlet />
}

export default RequireAuth
