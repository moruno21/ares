import { gql } from '@apollo/client'

const ROUTINE_FRAGMENT = gql`
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

export default ROUTINE_FRAGMENT
