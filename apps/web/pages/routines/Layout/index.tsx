import { H1, H3 } from '@ares/ui/components/Text'

import useRoutines from './hooks'
import Item from './Item'
import { Container, Header, Routines } from './styles'

const Layout = () => {
  const { routines, t } = useRoutines()

  return (
    <Container>
      <Header>
        <H1>{t('title')}</H1>
        <H3>{t('description')}</H3>
      </Header>
      <Routines>
        {routines.map(({ description, id, name }) => (
          <Item id={id} description={description} key={id} name={name}></Item>
        ))}
      </Routines>
    </Container>
  )
}

export default Layout
