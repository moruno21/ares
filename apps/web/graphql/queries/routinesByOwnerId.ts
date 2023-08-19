import { gql } from '@apollo/client'

import ROUTINE_DETAILS_FRAGMENT from '~/graphql/fragments/routineDetails'

const ROUTINES_BY_OWNER_ID = gql`
  ${ROUTINE_DETAILS_FRAGMENT}
  query RoutinesByOwnerId($ownerId: String!) {
    routinesByOwnerId(ownerId: $ownerId) {
      ...RoutineDetails
    }
  }
`

export default ROUTINES_BY_OWNER_ID
