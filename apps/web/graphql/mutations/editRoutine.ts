import { gql } from '@apollo/client'

import ROUTINE_FRAGMENT from '../fragments/routine'

const EDIT_ROUTINE = gql`
  ${ROUTINE_FRAGMENT}
  mutation EditRoutine($editRoutineId: String!, $routineInput: RoutineInput!) {
    editRoutine(id: $editRoutineId, routineInput: $routineInput) {
      ...Routine
    }
  }
`

export default EDIT_ROUTINE
