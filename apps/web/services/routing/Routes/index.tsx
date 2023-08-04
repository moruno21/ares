import { Route, Routes } from 'react-router-dom'

import Layout from '~/pages/layout'

import { ROUTES } from './constants'

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path={ROUTES.HOME} element={<>Home</>}></Route>
      <Route path={ROUTES.EXPLORE} element={<>Explore</>}></Route>
    </Route>
  </Routes>
)

export default AppRoutes
