import useRoutines from './hooks'
import RoutineCard from './RoutineCard'
import {
  Container,
  Header,
  RoutineCards,
  RoutineCardsContainer,
  RoutineCardsHeader,
} from './styles'

const Routines = () => {
  const { routines } = useRoutines()

  return (
    <Container>
      <Header>Welcome</Header>
      <RoutineCardsContainer>
        <RoutineCardsHeader>Your Routines</RoutineCardsHeader>
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
      </RoutineCardsContainer>
    </Container>
  )
}

export default Routines
