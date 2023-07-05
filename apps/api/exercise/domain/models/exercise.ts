import { AggregateRoot } from '@nestjs/cqrs'

import { Entity } from '~/shared/domain'

import ExerciseCreated from '../events/exercise-created'
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

  private constructor() {
    super()
  }

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get description() {
    return this._description
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

  private onExerciseCreated(event: ExerciseCreated) {
    this._id = ExerciseId.fromString(event.id).value as ExerciseId
    this._name = ExerciseName.fromString(event.name).value as ExerciseName
    this._description = ExerciseDescription.fromString(event.description)
      .value as ExerciseDescription
  }
}

export default Exercise
