import useNavbar from './hooks'
import { Container, Item, Menu } from './styles'

const Navbar = () => {
  const { menuItems } = useNavbar()

  return (
    <Container>
      <Menu>
        {menuItems.map(({ icon: Icon, id, route }) => (
          <Item key={id} to={route}>
            <Icon />
          </Item>
        ))}
      </Menu>
    </Container>
  )
}

export default Navbar
