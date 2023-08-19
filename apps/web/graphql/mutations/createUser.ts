import { gql } from '@apollo/client'

import USER_FRAGMENT from '../fragments/user'

const CREATE_USER = gql`
  ${USER_FRAGMENT}
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      ...User
    }
  }
`

export default CREATE_USER
