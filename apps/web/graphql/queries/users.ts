import { gql } from '@apollo/client'

import USER_FRAGMENT from '~/graphql/fragments/user'

const USERS = gql`
  ${USER_FRAGMENT}
  query Users {
    users {
      ...User
    }
  }
`

export default USERS
