import { H2 } from '@ares/ui/components/Text'

import { ROUTES } from '~/services/routing/Routes/constants'

import { Container, Description } from './styles'
import { RoutineCardProps } from './types'

const RoutineCard = ({ description, id, name }: RoutineCardProps) => {
  return (
    <Container to={`${ROUTES.ROUTINE}/${id}`}>
      <H2>{name}</H2>
      <Description>{description} </Description>
    </Container>
  )
}

export default RoutineCard
