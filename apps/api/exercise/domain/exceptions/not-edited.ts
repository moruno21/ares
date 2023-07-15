import { Exception } from '~/shared/domain'

const __name__ = 'NotEditedExercise'

const code = 'name_already_in_use'

type NotEditedExercise = Exception<typeof __name__, typeof code>

const NotEditedExercise = {
  causeAlreadyExistsOneWithName: (name: string): NotEditedExercise => ({
    ...Exception.with({
      __name__,
      code,
      message: `Exercise with name '${name}' already exists`,
    }),
  }),
} as const

export default NotEditedExercise
