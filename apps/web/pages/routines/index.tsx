import useRoutines from './hooks'
import RoutineCard from './RoutineCard'
import { Container, Description, Header, RoutineCards, Title } from './styles'

const Routines = () => {
  const { routines, t } = useRoutines()

  return (
    <Container>
      <Header>
        <Title>{t('title')}</Title>
        <Description>{t('description')}</Description>
      </Header>
      <RoutineCards>
        {routines.map(({ description, id, name }) => (
          <RoutineCard
            key={id}
            id={id}
            description={description}
            name={name}
          ></RoutineCard>
        ))}
      </RoutineCards>
    </Container>
  )
}

export default Routines
