import { gql } from '@apollo/client'

import EXERCISE_FRAGMENT from '../fragments/exercise'

const CREATE_EXERCISE = gql`
  ${EXERCISE_FRAGMENT}
  mutation CreateExercise($exerciseInput: ExerciseInput!) {
    createExercise(exerciseInput: $exerciseInput) {
      ...Exercise
    }
  }
`

export default CREATE_EXERCISE
