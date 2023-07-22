// import { AggregateRoot } from '@nestjs/cqrs'

import { AggregateRoot } from '~/shared/domain'

import RoutineCreated from '../events/routine-created'
import RoutineDescription from './description'
import RoutineId from './id'
import RoutineName from './name'

const __name__ = 'Routine'

class Routine extends AggregateRoot<typeof __name__, RoutineId> {
  readonly __name__ = __name__

  private _description: RoutineDescription
  private _name: RoutineName
  private _isDeleted: boolean

  get name(): RoutineName {
    return this._name
  }

  get description(): RoutineDescription {
    return this._description
  }

  get isDeleted(): boolean {
    return this._isDeleted
  }

  static create({
    description,
    id,
    name,
  }: {
    description: RoutineDescription
    id: RoutineId
    name: RoutineName
  }): Routine {
    const routine = new this()

    routine.apply(
      RoutineCreated.with({
        description: description.value,
        id: id.value,
        name: name.value,
      }),
    )

    return routine
  }

  private onRoutineCreated(event: RoutineCreated) {
    this._id = RoutineId.fromString(event.id).value as RoutineId
    this._name = RoutineName.fromString(event.name).value as RoutineName
    this._description = RoutineDescription.fromString(event.description)
      .value as RoutineDescription
    this._isDeleted = false
  }
}

export default Routine
