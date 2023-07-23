import NameType from '~/shared/name-type'

const __name__ = 'GetExercises'

type GetExercisesType = NameType<
  Readonly<Record<never, never>>,
  typeof __name__
>

class GetExercises implements GetExercisesType {
  readonly __name__ = __name__

  static all(): GetExercises {
    return new this()
  }
}

export default GetExercises
