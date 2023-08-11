import { gql } from '@apollo/client'

import EXERCISE_FRAGMENT from '../fragments/exercise'

const CREATE_EXERCISE = gql`
  ${EXERCISE_FRAGMENT}
  mutation EditExercise(
    $editExerciseId: String!
    $exerciseInput: ExerciseInput!
  ) {
    editExercise(id: $editExerciseId, exerciseInput: $exerciseInput) {
      ...Exercise
    }
  }
`

export default CREATE_EXERCISE
