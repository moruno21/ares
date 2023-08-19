import { gql } from '@apollo/client'

const ROUTINE_DETAILS_FRAGMENT = gql`
  fragment RoutineDetails on Routine {
    description
    id
    name
    ownerId
    workouts {
      exerciseId
      exerciseName
      sets
      reps
    }
  }
`

export default ROUTINE_DETAILS_FRAGMENT
