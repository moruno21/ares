import { H1, H3 } from '@ares/ui/components/Text'

import useRoutines from './hooks'
import RoutineCard from './RoutineCard'
import { Container, Header, RoutineCards } from './styles'

const Routines = () => {
  const { routines, t } = useRoutines()

  return (
    <Container>
      <Header>
        <H1>{t('title')}</H1>
        <H3>{t('description')}</H3>
      </Header>
      <RoutineCards>
        {routines.map(({ description, id, name }) => (
          <RoutineCard
            id={id}
            description={description}
            key={id}
            name={name}
          ></RoutineCard>
        ))}
      </RoutineCards>
    </Container>
  )
}

export default Routines
