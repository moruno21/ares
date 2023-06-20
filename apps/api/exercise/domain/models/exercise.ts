import { AggregateRoot } from '@nestjs/cqrs'

import { Entity } from '~/shared/domain'
import NameType from '~/shared/name-type'

import ExerciseCreated from '../events/exercise-created'
import ExerciseDescription from './description'
import ExerciseId from './id'
import ExerciseName from './name'

class Exercise
  extends AggregateRoot
  implements NameType<Entity<'Exercise', ExerciseId>, 'Exercise'>
{
  readonly __name__: 'Exercise'

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
