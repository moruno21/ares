import { gql } from '@apollo/client'

import USER_FRAGMENT from '~/graphql/fragments/user'

const USER_BY_ID = gql`
  ${USER_FRAGMENT}
  query UserById($userId: String!) {
    userById(id: $userId) {
      ...User
    }
  }
`

export default USER_BY_ID
