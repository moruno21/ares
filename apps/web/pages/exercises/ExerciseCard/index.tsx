import { H2 } from '@ares/ui/components/Text'

import { Container, Description } from './styles'
import { ExerciseCardProps } from './types'

const ExerciseCard = ({ description, name }: ExerciseCardProps) => {
  return (
    <Container>
      <H2>{name}</H2>
      <Description>{description} </Description>
    </Container>
  )
}

export default ExerciseCard
