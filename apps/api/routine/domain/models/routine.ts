import { AggregateRoot, ValueObject } from '~/shared/domain'
import Either from '~/shared/either'

import RoutineCreated from '../events/routine-created'
import RoutineDeleted from '../events/routine-deleted'
import RoutineRedescribed from '../events/routine-redescribed'
import RoutineRenamed from '../events/routine-renamed'
import RoutineWorkoutsChanged from '../events/routine-workouts-changed'
import NotFoundRoutine from '../exceptions/not-found'
import RoutineDescription from './description'
import RoutineId from './id'
import RoutineName from './name'
import RoutineWorkout from './workout'

const __name__ = 'Routine'

class Routine extends AggregateRoot<typeof __name__, RoutineId> {
  readonly __name__ = __name__

  private _description: RoutineDescription
  private _name: RoutineName
  private _workouts: RoutineWorkout[]
  private _isDeleted: boolean

  get name(): RoutineName {
    return this._name
  }

  get description(): RoutineDescription {
    return this._description
  }

  get workouts(): RoutineWorkout[] {
    return this._workouts
  }

  get isDeleted(): boolean {
    return this._isDeleted
  }

  static create({
    description,
    id,
    name,
    workouts,
  }: {
    description: RoutineDescription
    id: RoutineId
    name: RoutineName
    workouts: RoutineWorkout[]
  }): Routine {
    const routine = new this()

    routine.apply(
      RoutineCreated.with({
        description: description.value,
        id: id.value,
        name: name.value,
        workouts: workouts.map((workout) => workout.value),
      }),
    )

    return routine
  }

  changeWorkouts(workouts: RoutineWorkout[]) {
    const isSameWorkouts =
      this.workouts.length === workouts.length &&
      workouts.every((workout, index) =>
        ValueObject.equals(workout, this.workouts[index]),
      )

    if (isSameWorkouts) return

    this.apply(
      RoutineWorkoutsChanged.with({
        id: this.id.value,
        workouts: workouts.map((workout) => workout.value),
      }),
    )
  }

  delete(): Either<NotFoundRoutine, Routine> {
    if (this.isDeleted)
      return Either.left(NotFoundRoutine.withId(this.id.value))

    this.apply(RoutineDeleted.with({ id: this.id.value }))

    return Either.right(this)
  }

  redescribe(description: RoutineDescription) {
    if (ValueObject.equals(this.description, description)) return

    this.apply(
      RoutineRedescribed.with({
        description: description.value,
        id: this.id.value,
      }),
    )
  }

  rename(name: RoutineName) {
    if (ValueObject.equals(this.name, name)) return

    this.apply(RoutineRenamed.with({ id: this.id.value, name: name.value }))
  }

  private onRoutineCreated(event: RoutineCreated) {
    this._id = RoutineId.fromString(event.id).value as RoutineId
    this._name = RoutineName.fromString(event.name).value as RoutineName
    this._description = RoutineDescription.fromString(event.description)
      .value as RoutineDescription
    this._workouts = event.workouts.map(
      (workout) => RoutineWorkout.fromValue(workout).value as RoutineWorkout,
    )
    this._isDeleted = false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onRoutineDeleted(event: RoutineDeleted) {
    this._isDeleted = true
  }

  private onRoutineRedescribed(event: RoutineRedescribed) {
    this._description = RoutineDescription.fromString(event.description)
      .value as RoutineDescription
  }

  private onRoutineRenamed(event: RoutineRenamed) {
    this._name = RoutineName.fromString(event.name).value as RoutineName
  }

  private onRoutineWorkoutsChanged(event: RoutineWorkoutsChanged) {
    this._workouts = event.workouts.map(
      (workout) => RoutineWorkout.fromValue(workout).value as RoutineWorkout,
    )
  }
}

export default Routine
