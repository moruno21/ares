import { H3 } from '@ares/ui/components/Text'

import { ROUTES } from '~/services/routing/Routes/constants'

import { ArrowRightIcon, Container } from './styles'
import { UserCardProps } from './types'

const UserCard = ({ id, name }: UserCardProps) => {
  return (
    <Container to={`${ROUTES.USER}/${id}`}>
      <H3>{name}</H3>
      <ArrowRightIcon />
    </Container>
  )
}

export default UserCard
