import NameType from '~/shared/name-type'

import DefaultId from './id'
import ValueObject from './value-object'

type Entity<Id extends ValueObject<number | string> = DefaultId> = Readonly<{
  id: Id
}>

const Entity = {
  same: <
    Name extends string,
    Id extends NameType<ValueObject<number | string>, string>,
  >(
    a: NameType<Entity<Id>, Name>,
    b: NameType<Entity<Id>, Name>,
  ): boolean => a.__name__ === b.__name__ && ValueObject.equals(a.id, b.id),
} as const

export default Entity
