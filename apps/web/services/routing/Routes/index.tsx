import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import PageLoading from '~/pages/layout/Loading'

import { ROUTES } from './constants'

const ExercisesLayout = lazy(() => import('~/pages/exercises'))
const Explore = lazy(() => import('~/pages/explore'))
const LandingLayout = lazy(() => import('~/pages/landing'))
const AuthLayout = lazy(() => import('~/pages/auth'))
const Layout = lazy(() => import('~/pages/layout'))
const PreventAuth = lazy(() => import('../PreventAuth'))
const RequireAuth = lazy(() => import('../RequireAuth'))
const RoutineLayout = lazy(() => import('~/pages/routine'))
const RoutinesLayout = lazy(() => import('~/pages/routines'))

const AppRoutes = () => (
  <Suspense fallback={<PageLoading />}>
    <Routes>
      <Route element={<PreventAuth />}>
        <Route path={`${ROUTES.LOGIN}`} element={<AuthLayout />}></Route>
      </Route>
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path={ROUTES.HOME} element={<RoutinesLayout />}></Route>
          <Route
            path={`${ROUTES.USER}/:id`}
            element={<RoutinesLayout />}
          ></Route>
          <Route
            path={`${ROUTES.ROUTINE}/:id`}
            element={<RoutineLayout />}
          ></Route>
          <Route path={ROUTES.EXPLORE} element={<Explore />}></Route>
          <Route path={ROUTES.EXERCISES} element={<ExercisesLayout />}></Route>
          <Route path="*" element={<Navigate to={ROUTES.HOME} />}></Route>
        </Route>
      </Route>
      <Route
        path={`${ROUTES.LANDING}/:idHash`}
        element={<LandingLayout />}
      ></Route>
    </Routes>
  </Suspense>
)

export default AppRoutes
