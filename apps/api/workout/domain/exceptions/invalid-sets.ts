import { Exception } from '~/shared/domain'

const __name__ = 'InvalidWorkoutSets'

const nonPositiveCode = 'non_positive'
const tooHighCode = 'too_high'

type InvalidWorkoutSets = Exception<
  typeof __name__,
  typeof nonPositiveCode | typeof tooHighCode
>

const InvalidWorkoutSets = {
  causeIsNonPositive: (): InvalidWorkoutSets => ({
    ...Exception.with({
      __name__,
      code: nonPositiveCode,
      message: 'Workout sets cannot be non positive',
    }),
  }),
  causeIsTooHigh: (): InvalidWorkoutSets => ({
    ...Exception.with({
      __name__,
      code: tooHighCode,
      message: 'Workout sets cannot be higher than 100',
    }),
  }),
} as const

export default InvalidWorkoutSets
