import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Exercises from '~/pages/exercises'

import { ROUTES } from './constants'

const Layout = lazy(() => import('~/pages/layout'))
const Routines = lazy(() => import('~/pages/routines'))

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path={ROUTES.ROUTINES} element={<Routines />}></Route>
      <Route path={ROUTES.EXPLORE} element={<>Explore</>}></Route>
      <Route path={ROUTES.EXERCISES} element={<Exercises />}></Route>
      <Route path="*" element={<Navigate to={ROUTES.ROUTINES} />}></Route>
    </Route>
  </Routes>
)

export default AppRoutes
