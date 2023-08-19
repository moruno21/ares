import { gql } from '@apollo/client'

const ROUTINE_FRAGMENT = gql`
  fragment Routine on Routine {
    description
    id
    name
    ownerId
  }
`

export default ROUTINE_FRAGMENT
