import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ROUTES } from './constants'

const Layout = lazy(() => import('~/pages/layout'))
const Routines = lazy(() => import('~/pages/routines'))

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path={ROUTES.ROUTINES} element={<Routines />}></Route>
      <Route path={ROUTES.EXPLORE} element={<>Explore</>}></Route>
    </Route>
  </Routes>
)

export default AppRoutes
