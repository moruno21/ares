import Either, { Left, Right } from '~/shared/either'
import { itIsAValueObject } from '~/test/closures/shared/domain/value-object'

import InvalidRoutineDescription from '../exceptions/invalid-description'
import RoutineDescription from './description'

describe('RoutineDescription', () => {
  const __name__ = 'RoutineDescription'
  const value = 'value'
  const description = RoutineDescription.fromString(
    value,
  ) as Right<RoutineDescription>

  itIsAValueObject(description.value)

  it.concurrent('can be created from string', () => {
    expect(Either.isRight(description)).toBe(true)
    expect(description.value.__name__).toBe(__name__)
    expect(description.value.value).toBe(value)
  })

  it.concurrent('cannot be longer than 250 characters', () => {
    const tooLongDescription = RoutineDescription.fromString(
      'In the vast expanse of the cosmos, countless stars twinkle in the darkness, each one a beacon of light amidst the void. Galaxies spiral and collide, giving birth to new worlds and cosmic wonders. On our tiny planet Earth, life flourishes in all its forms.',
    ) as Left<InvalidRoutineDescription>
    const invalidDescription = InvalidRoutineDescription.causeIsTooLong()

    expect(Either.isRight(tooLongDescription)).toBe(false)
    expect(tooLongDescription.value.__name__).toBe(invalidDescription.__name__)
    expect(tooLongDescription.value.code).toBe(invalidDescription.code)
  })
})
