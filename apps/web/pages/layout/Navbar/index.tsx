import useNavbar from './hooks'
import { Container, Item, Menu } from './styles'

const Navbar = () => {
  const { menuItems } = useNavbar()

  return (
    <Container>
      <Menu>
        {menuItems.map(({ icon: Icon, id, isActive, route }) => (
          <Item
            aria-current={isActive ? 'page' : undefined}
            key={id}
            to={route}
          >
            <Icon />
          </Item>
        ))}
      </Menu>
    </Container>
  )
}

export default Navbar
