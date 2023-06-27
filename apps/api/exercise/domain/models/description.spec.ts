import Either, { Left, Right } from '~/shared/either'
import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import InvalidExerciseDescription from '../exceptions/invalid-description'
import ExerciseDescription from './description'

describe('ExerciseDescription', () => {
  const __name__ = 'ExerciseDescription'
  const value = 'value'
  const description = ExerciseDescription.fromString(
    value,
  ) as Right<ExerciseDescription>

  itIsAValueObject(description.value)

  it.concurrent('can be created from string', () => {
    expect(Either.isRight(description)).toBe(true)
    expect(description.value.__name__).toBe(__name__)
    expect(description.value.value).toBe(value)
  })

  it.concurrent('cannot be longer than 250 characters', () => {
    const tooLongDescription = ExerciseDescription.fromString(
      'In the vast expanse of the cosmos, countless stars twinkle in the darkness, each one a beacon of light amidst the void. Galaxies spiral and collide, giving birth to new worlds and cosmic wonders. On our tiny planet Earth, life flourishes in all its forms.',
    ) as Left<InvalidExerciseDescription>
    const invalidDescription = InvalidExerciseDescription.causeIsTooLong()

    expect(Either.isRight(tooLongDescription)).toBe(false)
    expect(tooLongDescription.value.__name__).toBe(invalidDescription.__name__)
    expect(tooLongDescription.value.code).toBe(invalidDescription.code)
  })
})
