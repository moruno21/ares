import NameType from '~/shared/name-type'

const __name__ = 'DeleteRoutine'

type DeleteRoutineType = NameType<
  Readonly<{
    id: string
  }>,
  typeof __name__
>

class DeleteRoutine implements DeleteRoutineType {
  readonly __name__ = __name__

  private constructor(readonly id: DeleteRoutineType['id']) {}

  static with({ id }: Omit<DeleteRoutineType, '__name__'>): DeleteRoutine {
    return new this(id)
  }
}

export default DeleteRoutine
