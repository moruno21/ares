import { gql } from '@apollo/client'

import ROUTINE_FRAGMENT from '../fragments/routine'

const DELETE_ROUTINE = gql`
  ${ROUTINE_FRAGMENT}
  mutation DeleteRoutine($deleteRoutineId: String!) {
    deleteRoutine(id: $deleteRoutineId) {
      ...Routine
    }
  }
`

export default DELETE_ROUTINE
