import NamedType from '~/shared/named-type'

import DefaultId from './id'
import ValueObject from './value-object'

type Entity<Id extends ValueObject<number | string> = DefaultId> = Readonly<{
  id: Id
}>

const Entity = {
  same: <
    Name extends string,
    Id extends NamedType<ValueObject<number | string>, string>,
  >(
    a: NamedType<Entity<Id>, Name>,
    b: NamedType<Entity<Id>, Name>,
  ): boolean => a.__name__ === b.__name__ && ValueObject.equals(a.id, b.id),
} as const

export default Entity
