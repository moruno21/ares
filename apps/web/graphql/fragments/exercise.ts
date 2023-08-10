import { gql } from '@apollo/client'

const EXERCISE_FRAGMENT = gql`
  fragment Exercise on Exercise {
    description
    id
    name
  }
`

export default EXERCISE_FRAGMENT
