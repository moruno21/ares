import { gql } from '@apollo/client'

import EXERCISE_FRAGMENT from '../fragments/exercise'

const EDIT_EXERCISE = gql`
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

export default EDIT_EXERCISE
