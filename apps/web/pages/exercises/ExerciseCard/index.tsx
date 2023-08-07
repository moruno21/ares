import { Container, Description, Name } from './styles'
import { ExerciseCardProps } from './types'

const ExerciseCard = ({ description, name }: ExerciseCardProps) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Description>{description} </Description>
    </Container>
  )
}

export default ExerciseCard
