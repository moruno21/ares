import { AggregateRoot } from '@nestjs/cqrs'

import { Entity } from '~/shared/domain'
import Either from '~/shared/either'

import ExerciseCreated from '../events/exercise-created'
import ExerciseDeleted from '../events/exercise-deleted'
import NotFoundExercise from '../exceptions/not-found'
import ExerciseDescription from './description'
import ExerciseId from './id'
import ExerciseName from './name'

const __name__ = 'Exercise'

class Exercise
  extends AggregateRoot
  implements Entity<typeof __name__, ExerciseId>
{
  readonly __name__ = __name__

  private _id: ExerciseId
  private _description: ExerciseDescription
  private _name: ExerciseName
  private _isDeleted: boolean

  get id(): ExerciseId {
    return this._id
  }

  get name(): ExerciseName {
    return this._name
  }

  get description(): ExerciseDescription {
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
    description: ExerciseDescription
    id: ExerciseId
    name: ExerciseName
  }): Exercise {
    const exercise = new this()

    exercise.apply(
      ExerciseCreated.with({
        description: description.value,
        id: id.value,
        name: name.value,
      }),
    )

    return exercise
  }

  delete(): Either<NotFoundExercise, Exercise> {
    if (this._isDeleted)
      return Either.left(NotFoundExercise.withId(this.id.value))

    this.apply(ExerciseDeleted.with({ id: this._id.value }))

    return Either.right(this)
  }

  private onExerciseCreated(event: ExerciseCreated) {
    this._id = ExerciseId.fromString(event.id).value as ExerciseId
    this._name = ExerciseName.fromString(event.name).value as ExerciseName
    this._description = ExerciseDescription.fromString(event.description)
      .value as ExerciseDescription
    this._isDeleted = false
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onExerciseDeleted(event: ExerciseDeleted) {
    this._isDeleted = true
  }
}

export default Exercise
