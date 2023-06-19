import { validate, version } from 'uuid'

import Either from '~/shared/either'
import NameType from '~/shared/name-type'

import InvalidUuid from '../exceptions/invalid-uuid'
import Id from './id'

type Uuid = NameType<Id<string>, 'Uuid'>

const Uuid = {
  fromString: (value: string): Either<InvalidUuid, Uuid> => {
    const id = Id.fromValue(value)
    const isInvalidId = Either.isLeft(id)
    const isInvalidUuid =
      isInvalidId || !validate(value) || version(value) !== 4

    if (isInvalidUuid)
      return Either.left(InvalidUuid.causeTheFormatIsNotValid(value))

    return Either.right({ __name__: 'Uuid', value })
  },
} as const

export default Uuid
