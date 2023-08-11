import { gql } from '@apollo/client'

import EXERCISE_FRAGMENT from '~/graphql/fragments/exercise'

const EXERCISES = gql`
  ${EXERCISE_FRAGMENT}
  query Exercises {
    exercises {
      ...Exercise
    }
  }
`

export default EXERCISES
