import ExerciseCard from './ExerciseCard'
import useExercises from './hooks'
import { Container, Description, ExerciseCards, Header, Title } from './styles'

const Exercises = () => {
  const { exercises } = useExercises()

  return (
    <Container>
      <Header>
        <Title>Exercises</Title>
        <Description>All the existing exercises</Description>
      </Header>
      <ExerciseCards>
        {exercises.map(({ description, id, name }) => (
          <ExerciseCard
            key={id}
            description={description}
            name={name}
          ></ExerciseCard>
        ))}
      </ExerciseCards>
    </Container>
  )
}

export default Exercises
