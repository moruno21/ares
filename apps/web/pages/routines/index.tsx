import useRoutines from './hooks'
import RoutineCard from './RoutineCard'
import { Container, Description, Header, RoutineCards, Title } from './styles'

const Routines = () => {
  const { routines } = useRoutines()

  return (
    <Container>
      <Header>
        <Title>Welcome</Title>
        <Description>Your Routines</Description>
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
