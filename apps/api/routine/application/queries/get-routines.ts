import NameType from '~/shared/name-type'

const __name__ = 'GetRoutines'

type GetRoutinesType = NameType<Readonly<Record<never, never>>, typeof __name__>

class GetRoutines implements GetRoutinesType {
  readonly __name__ = __name__

  static all(): GetRoutines {
    return new this()
  }
}

export default GetRoutines
