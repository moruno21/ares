import Search from '@ares/ui/components/Search'

import useExplore from './hooks'
import { Container, Header, UserCards } from './styles'
import UserCard from './UserCard'

const Explore = () => {
  const { t, users } = useExplore()

  return (
    <Container>
      <Header>
        <Search placeholder={t('search.placeholder')} />
      </Header>
      <UserCards>
        {users.map(({ id, name }) => (
          <UserCard key={id} id={id} name={name} />
        ))}
      </UserCards>
    </Container>
  )
}

export default Explore
