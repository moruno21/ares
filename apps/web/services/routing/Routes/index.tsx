import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import PageLoading from '~/pages/layout/Loading'

import { ROUTES } from './constants'

const ExercisesLayout = lazy(() => import('~/pages/exercises/Layout'))
const Explore = lazy(() => import('~/pages/explore'))
const Layout = lazy(() => import('~/pages/layout'))
const RoutineLayout = lazy(() => import('~/pages/routine/Layout'))
const RoutinesLayout = lazy(() => import('~/pages/routines/Layout'))

const AppRoutes = () => (
  <Suspense fallback={<PageLoading />}>
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<RoutinesLayout />}></Route>
        <Route path={`${ROUTES.USER}/:id`} element={<RoutinesLayout />}></Route>
        <Route
          path={`${ROUTES.ROUTINE}/:id`}
          element={<RoutineLayout />}
        ></Route>
        <Route path={ROUTES.EXPLORE} element={<Explore />}></Route>
        <Route path={ROUTES.EXERCISES} element={<ExercisesLayout />}></Route>
        <Route path="*" element={<Navigate to={ROUTES.HOME} />}></Route>
      </Route>
    </Routes>
  </Suspense>
)

export default AppRoutes
