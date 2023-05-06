import { Route, Routes } from 'react-router-dom'

import { ROUTES } from './constants'

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<>Home Page</>}></Route>
  </Routes>
)

export default AppRoutes
