import { gql } from '@apollo/client'

import ROUTINE_FRAGMENT from '~/graphql/fragments/routine'

const ROUTINES = gql`
  ${ROUTINE_FRAGMENT}
  query routines {
    routines {
      ...Routine
    }
  }
`

export default ROUTINES
