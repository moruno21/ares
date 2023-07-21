import { AggregateRoot as BaseAggregateRoot } from '@nestjs/cqrs'

import Entity from './entity'
import Event from './event'
import ValueObject from './value-object'

const STREAM = Symbol()

abstract class AggregateRoot<
    Name extends string,
    Id extends ValueObject<string, string | number>,
  >
  extends BaseAggregateRoot<Event>
  implements Entity<Name, Id>
{
  readonly __name__: Name;
  readonly [STREAM] = this.constructor.name

  _id: Id

  public get id(): Id {
    return this._id
  }

  public get stream(): string {
    return this[STREAM]
  }

  override apply(event: Event, isFromHistory?: boolean): void {
    super.apply(event.withStream(this[STREAM]), isFromHistory)
  }
}

export default AggregateRoot
