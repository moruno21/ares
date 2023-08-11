import { gql } from '@apollo/client'

import ROUTINE_DETAILS_FRAGMENT from '~/graphql/fragments/routineDetails'

const ROUTINE = gql`
  ${ROUTINE_DETAILS_FRAGMENT}
  query Routine($routineId: String!) {
    routine(id: $routineId) {
      ...RoutineDetails
    }
  }
`

export default ROUTINE
