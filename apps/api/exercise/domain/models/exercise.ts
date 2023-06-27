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

  private constructor(
    readonly id: ExerciseId,
    readonly description: ExerciseDescription,
    readonly name: ExerciseName,
  ) {
    super()
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
    const exercise = new this(id, description, name)

    exercise.apply(
      ExerciseCreated.with({
        description: description.value,
        id: id.value,
        name: name.value,
      }),
    )

    return exercise
  }
}

export default Exercise
