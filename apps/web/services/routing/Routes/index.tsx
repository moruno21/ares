import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import PageLoading from '~/pages/layout/Loading'

import { ROUTES } from './constants'

const ExercisesLayout = lazy(() => import('~/pages/exercises/Layout'))
const Explore = lazy(() => import('~/pages/explore'))
const Layout = lazy(() => import('~/pages/layout'))
const Routine = lazy(() => import('~/pages/routine'))
const Routines = lazy(() => import('~/pages/routines'))

const AppRoutes = () => (
  <Suspense fallback={<PageLoading />}>
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<Routines />}></Route>
        <Route path={`${ROUTES.USER}/:id`} element={<Routines />}></Route>
        <Route path={`${ROUTES.ROUTINE}/:id`} element={<Routine />}></Route>
        <Route path={ROUTES.EXPLORE} element={<Explore />}></Route>
        <Route path={ROUTES.EXERCISES} element={<ExercisesLayout />}></Route>
        <Route path="*" element={<Navigate to={ROUTES.HOME} />}></Route>
      </Route>
    </Routes>
  </Suspense>
)

export default AppRoutes
