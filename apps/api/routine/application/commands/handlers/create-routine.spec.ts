import InvalidRoutineDescription from '~/routine/domain/exceptions/invalid-description'
import InvalidRoutineName from '~/routine/domain/exceptions/invalid-name'
import RoutineDescription from '~/routine/domain/models/description'
import RoutineId from '~/routine/domain/models/id'
import RoutineName from '~/routine/domain/models/name'
import Routine from '~/routine/domain/models/routine'
import Routines from '~/routine/domain/services/routines'
import { InvalidUuid } from '~/shared/domain'
import Either, { Left } from '~/shared/either'
import RoutinesMock from '~/test/mocks/routine/domain/services/routines'

import CreateRoutine from '../create-routine'
import CreateRoutineHandler from './create-routine'

describe('CreateRoutineHandler', () => {
  let routines: Routines
  let createRoutineHandler: CreateRoutineHandler

  const idValue = '700b5619-9448-44c6-b21b-06ab1392e9e8'
  const id = RoutineId.fromString(idValue).value as RoutineId
  const nameValue = 'name'
  const name = RoutineName.fromString(nameValue).value as RoutineName
  const descriptionValue = 'description'
  const description = RoutineDescription.fromString(descriptionValue)
    .value as RoutineDescription
  const routine = Routine.create({ description, id, name })

  beforeEach(() => {
    routines = RoutinesMock.mock()
    createRoutineHandler = new CreateRoutineHandler(routines)
  })

  it('creates a routine', async () => {
    const routinesSave = jest.spyOn(routines, 'save')

    const response = await createRoutineHandler.execute(
      CreateRoutine.with({
        description: descriptionValue,
        id: idValue,
        name: nameValue,
      }),
    )

    expect(routinesSave).toHaveBeenCalledWith(routine)
    expect(Either.isRight(response)).toBe(true)
    expect(response).toStrictEqual(Either.right(routine))
  })

  it.each([
    {
      descriptionMock:
        'InvalidDescription: In the vast expanse of the cosmos, countless stars twinkle in the darkness, each one a beacon of light amidst the void. Galaxies spiral and collide, giving birth to new worlds and cosmic wonders. On our tiny planet Earth, life flourishes in all its forms.',
      idMock: idValue,
      nameMock: nameValue,
    },
    {
      descriptionMock: descriptionValue,
      idMock: 'InvalidId',
      nameMock: nameValue,
    },
    {
      descriptionMock: descriptionValue,
      idMock: ' ',
      nameMock: nameValue,
    },
    {
      descriptionMock: descriptionValue,
      idMock: idValue,
      nameMock: ' ',
    },
    {
      descriptionMock: descriptionValue,
      idMock: idValue,
      nameMock: 'InvalidName because it is longer than fifty characters',
    },
  ])(
    'cannot create a routine with invalid params',
    async ({ descriptionMock, idMock, nameMock }) => {
      const routinesSave = jest.spyOn(routines, 'save')

      const response = (await createRoutineHandler.execute(
        CreateRoutine.with({
          description: descriptionMock,
          id: idMock,
          name: nameMock,
        }),
      )) as Left<
        (InvalidUuid | InvalidRoutineName | InvalidRoutineDescription)[]
      >

      expect(routinesSave).not.toHaveBeenCalled()
      expect(Either.isRight(response)).toBe(false)

      if (Either.isLeft(RoutineId.fromString(idMock))) {
        const responseResult = Either.left(response.value[0] as InvalidUuid)
        const invalidUuid = InvalidUuid.causeTheFormatIsNotValid(idMock)

        expect(Either.isRight(responseResult)).toBe(false)
        expect(responseResult.value.__name__).toBe(invalidUuid.__name__)
        expect(responseResult.value.code).toBe(invalidUuid.code)
      }

      if (Either.isLeft(RoutineDescription.fromString(descriptionMock))) {
        const responseResult = Either.left(
          response.value[0] as InvalidRoutineDescription,
        )
        const invalidDescription = InvalidRoutineDescription.causeIsTooLong()

        expect(Either.isRight(responseResult)).toBe(false)
        expect(responseResult.value.__name__).toBe(invalidDescription.__name__)
        expect(responseResult.value.code).toBe(invalidDescription.code)
      }

      if (Either.isLeft(RoutineName.fromString(nameMock))) {
        const responseResult = Either.left(
          response.value[0] as InvalidRoutineName,
        )
        const invalidNameCauseIsBlank = InvalidRoutineName.causeIsBlank()
        const invalidNameCauseIsTooLong = InvalidRoutineName.causeIsTooLong()

        expect(Either.isRight(responseResult)).toBe(false)
        if (nameMock === ' ') {
          expect(responseResult.value.__name__).toBe(
            invalidNameCauseIsBlank.__name__,
          )
          expect(responseResult.value.code).toBe(invalidNameCauseIsBlank.code)
        } else {
          expect(responseResult.value.__name__).toBe(
            invalidNameCauseIsTooLong.__name__,
          )
          expect(responseResult.value.code).toBe(invalidNameCauseIsTooLong.code)
        }
      }
    },
  )
})
