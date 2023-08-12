import { gql } from '@apollo/client'

import ROUTINE_FRAGMENT from '../fragments/routine'

const CREATE_ROUTINE = gql`
  ${ROUTINE_FRAGMENT}
  mutation CreateRoutine($routineInput: RoutineInput!) {
    createRoutine(routineInput: $routineInput) {
      ...Routine
    }
  }
`

export default CREATE_ROUTINE
