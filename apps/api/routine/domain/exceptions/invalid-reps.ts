import { Exception } from '~/shared/domain'

const __name__ = 'InvalidWorkoutReps'

const nonPositiveCode = 'non_positive'
const tooHighCode = 'too_high'

type InvalidWorkoutReps = Exception<
  typeof __name__,
  typeof nonPositiveCode | typeof tooHighCode
>

const InvalidWorkoutReps = {
  causeIsNonPositive: (): InvalidWorkoutReps => ({
    ...Exception.with({
      __name__,
      code: nonPositiveCode,
      message: 'Workout reps cannot be non positive',
    }),
  }),
  causeIsTooHigh: (): InvalidWorkoutReps => ({
    ...Exception.with({
      __name__,
      code: tooHighCode,
      message: 'Workout reps cannot be higher than 100',
    }),
  }),
} as const

export default InvalidWorkoutReps
