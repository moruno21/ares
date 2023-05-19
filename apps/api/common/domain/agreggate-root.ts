import { AggregateRoot as NestAggregateRoot } from '@nestjs/cqrs'

import Entity from './entity'
import Id from './models/id'

export abstract class AggregateRoot
  extends NestAggregateRoot
  implements Entity
{
  protected constructor() {
    super()
  }

  protected _id: Id

  get id(): Id {
    return this._id
  }

  isTheSameAs({ id }: AggregateRoot): boolean {
    return this.id.isEqualTo(id)
  }
}
