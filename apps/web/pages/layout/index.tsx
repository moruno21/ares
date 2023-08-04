import { Outlet } from 'react-router-dom'

import Navbar from './Navbar'
import { Container } from './styles'

const Layout = () => (
  <>
    <Container>
      <Outlet />
    </Container>
    <Navbar />
  </>
)

export default Layout
