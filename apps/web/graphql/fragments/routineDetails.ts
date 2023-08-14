import { gql } from '@apollo/client'

const ROUTINE_DETAILS_FRAGMENT = gql`
  fragment RoutineDetails on Routine {
    description
    id
    name
    workouts {
      exerciseId
      exerciseName
      exerciseDescription
      sets
      reps
    }
  }
`

export default ROUTINE_DETAILS_FRAGMENT
