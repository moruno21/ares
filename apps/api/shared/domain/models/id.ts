import Either from '~/shared/either'
import NameType from '~/shared/name-type'

import InvalidId from '../exceptions/invalid-id'
import ValueObject from './value-object'

type Id<Type extends number | string = number | string> = NameType<
  ValueObject<Type>,
  'Id'
>

const Id = {
  fromValue: <Type extends number | string>(
    value: Type,
  ): Either<InvalidId, Id<Type>> => {
    const isBlank = !value.toString().trim()

    if (isBlank) return Either.left(InvalidId.causeIsBlank())

    return Either.right({ __name__: 'Id', value })
  },
} as const

export default Id
