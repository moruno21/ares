import { gql } from '@apollo/client'

import USER_FRAGMENT from '~/graphql/fragments/user'

const USER_BY_EMAIL = gql`
  ${USER_FRAGMENT}
  query UserByEmail($userEmail: String!) {
    userByEmail(email: $userEmail) {
      ...User
    }
  }
`

export default USER_BY_EMAIL
