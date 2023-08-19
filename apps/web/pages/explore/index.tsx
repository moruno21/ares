import Search from '@ares/ui/components/Search'

import useExplore from './hooks'
import { Container, Header, UserCards } from './styles'
import UserCard from './UserCard'

const Explore = () => {
  const { filteredUsers, handleSearch, t } = useExplore()

  return (
    <Container>
      <Header>
        <Search onChange={handleSearch} placeholder={t('search.placeholder')} />
      </Header>
      <UserCards>
        {filteredUsers.map(({ id, name }) => (
          <UserCard id={id} key={id} name={name} />
        ))}
      </UserCards>
    </Container>
  )
}

export default Explore
