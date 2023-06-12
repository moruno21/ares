import { AggregateRoot } from '@nestjs/cqrs'

import { Entity } from '~/shared/domain'
import NamedType from '~/shared/named-type'

import ExerciseCreated from '../events/exercise-created'
import ExerciseId from './id'
import ExerciseName from './name'

class Exercise
  extends AggregateRoot
  implements NamedType<Entity<ExerciseId>, 'Exercise'>
{
  readonly __name__: 'Exercise'

  private constructor(readonly id: ExerciseId, readonly name: ExerciseName) {
    super()
  }

  static create({
    id,
    name,
  }: {
    id: ExerciseId
    name: ExerciseName
  }): Exercise {
    const exercise = new this(id, name)

    exercise.apply(ExerciseCreated.with({ id: id.value, name: name.value }))

    return exercise
  }
}

export default Exercise
