import { gql } from '@apollo/client'

const USER_FRAGMENT = gql`
  fragment User on User {
    email
    id
    name
  }
`

export default USER_FRAGMENT
