import { H2 } from '@ares/ui/components/Text'

import useRoutineCard from './hooks'
import { Container, Description } from './styles'
import { RoutineCardProps } from './types'

const RoutineCard = ({ description, id, name }: RoutineCardProps) => {
  const { href } = useRoutineCard({ id })

  return (
    <Container href={href}>
      <H2>{name}</H2>
      <Description>{description} </Description>
    </Container>
  )
}

export default RoutineCard
