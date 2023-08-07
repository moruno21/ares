import Search from '@ares/ui/components/Search'

import useExplore from './hooks'
import { Container, Header } from './styles'
import UserCard from './UserCard'

const Explore = () => {
  const { t } = useExplore()

  return (
    <Container>
      <Header>
        <Search placeholder={t('search.placeholder')} />
      </Header>
      <UserCard name="Mock User" />
    </Container>
  )
}

export default Explore
