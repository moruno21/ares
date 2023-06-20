import NameType from '~/shared/name-type'

import ValueObject from './value-object'

type Entity<
  Name extends string,
  Id extends ValueObject<string, number | string> = ValueObject<
    string,
    number | string
  >,
> = NameType<
  Readonly<{
    id: Id
  }>,
  Name
>

const Entity = {
  same: <Name extends string, Id extends ValueObject<string, number | string>>(
    a: Entity<Name, Id>,
    b: Entity<Name, Id>,
  ): boolean => a.__name__ === b.__name__ && ValueObject.equals(a.id, b.id),
  with: <Name extends string, Id extends ValueObject<string, number | string>>(
    props: Entity<Name, Id>,
  ): Entity<Name, Id> => props,
} as const

export default Entity
