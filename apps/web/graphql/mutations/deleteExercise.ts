import { gql } from '@apollo/client'

import EXERCISE_FRAGMENT from '../fragments/exercise'

const DELETE_EXERCISE = gql`
  ${EXERCISE_FRAGMENT}
  mutation deleteExercise($deleteExerciseId: String!) {
    deleteExercise(id: $deleteExerciseId) {
      ...Exercise
    }
  }
`

export default DELETE_EXERCISE
