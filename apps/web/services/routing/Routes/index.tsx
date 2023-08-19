import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import PageLoading from '~/pages/layout/Loading'

import { ROUTES } from './constants'

const Exercises = lazy(() => import('~/pages/exercises'))
const Explore = lazy(() => import('~/pages/explore'))
const Landing = lazy(() => import('~/pages/landing'))
const Auth = lazy(() => import('~/pages/auth'))
const Layout = lazy(() => import('~/pages/layout'))
const PreventAuth = lazy(() => import('../PreventAuth'))
const Profile = lazy(() => import('~/pages/profile'))
const RequireAuth = lazy(() => import('../RequireAuth'))
const Routine = lazy(() => import('~/pages/routine'))
const Routines = lazy(() => import('~/pages/routines'))

const AppRoutes = () => (
  <Suspense fallback={<PageLoading />}>
    <Routes>
      <Route element={<PreventAuth />}>
        <Route path={`${ROUTES.LOGIN}`} element={<Auth />}></Route>
      </Route>
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<Routines />}></Route>
          <Route path={`${ROUTES.USER}/:id`} element={<Routines />}></Route>
          <Route path={`${ROUTES.ROUTINE}/:id`} element={<Routine />}></Route>
          <Route path={ROUTES.EXPLORE} element={<Explore />}></Route>
          <Route path={ROUTES.EXERCISES} element={<Exercises />}></Route>
          <Route path={ROUTES.PROFILE} element={<Profile />}></Route>
          <Route path="*" element={<Navigate to={ROUTES.HOME} />}></Route>
        </Route>
      </Route>
      <Route path={`${ROUTES.LANDING}/:idHash`} element={<Landing />}></Route>
    </Routes>
  </Suspense>
)

export default AppRoutes
