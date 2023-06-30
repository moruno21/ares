import { BadRequestException } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import CreateExercise from '~/exercise/application/commands/create-exercise'
import ExerciseView from '~/exercise/application/models/view'
import GetExercise from '~/exercise/application/queries/get-exercise'
import GetExercises from '~/exercise/application/queries/get-exercises'
import InvalidExerciseDescription from '~/exercise/domain/exceptions/invalid-description'
import InvalidExerciseName from '~/exercise/domain/exceptions/invalid-name'
import NotCreatedExercise from '~/exercise/domain/exceptions/not-created'
import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseDescription from '~/exercise/domain/models/description'
import Exercise from '~/exercise/domain/models/exercise'
import ExerciseId from '~/exercise/domain/models/id'
import ExerciseName from '~/exercise/domain/models/name'
import ExerciseDto from '~/exercise/infrastructure/models/http/dto'
import PostExerciseDto from '~/exercise/infrastructure/models/http/post-dto'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'
import CommandBusMock from '~/test/mocks/@nestjs/cqrs/command-bus'
import QueryBusMock from '~/test/mocks/@nestjs/cqrs/query-bus'

import ExerciseController from './exercises'

describe('ExerciseController', () => {
  let commandBus: CommandBus
  let queryBus: QueryBus
  let exerciseController: ExerciseController

  describe('GetExercises', () => {
    const id = 'dbeffe3c-a516-479c-8570-e802eda92243'
    const name = 'name'
    const description = 'description'

    const exerciseViewOne = ExerciseView.with({ description, id, name })
    const exerciseViewTwo = ExerciseView.with({ description, id, name })

    beforeEach(() => {
      commandBus = CommandBusMock.mock()
      queryBus = QueryBusMock.mock()
      exerciseController = new ExerciseController(commandBus, queryBus)
    })

    it('can get all the exercises', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')
      const exerciseViews = [exerciseViewOne, exerciseViewTwo]

      queryBusExecute.mockResolvedValue(exerciseViews)

      const exercises = exerciseViews.map((exerciseView) =>
        ExerciseDto.fromExerciseView(exerciseView),
      )

      const response = await exerciseController.getExercises()

      expect(queryBusExecute).toHaveBeenCalledWith(GetExercises.all())
      expect(response).toStrictEqual(exercises)
    })

    it('can return empty value when there are no exercises', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')

      queryBusExecute.mockResolvedValue([])

      const response = await exerciseController.getExercises()

      expect(queryBusExecute).toHaveBeenCalledWith(GetExercises.all())
      expect(response).toStrictEqual([])
    })
  })

  describe('GetExercise', () => {
    const id = '973da9f1-d338-4544-b09c-00ed8fed2abc'
    const name = 'name'
    const description = 'description'

    const exerciseView = ExerciseView.with({ description, id, name })

    beforeEach(() => {
      commandBus = CommandBusMock.mock()
      queryBus = QueryBusMock.mock()
      exerciseController = new ExerciseController(commandBus, queryBus)
    })

    it('can get an exercise from an id', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')

      queryBusExecute.mockResolvedValue(Either.right(exerciseView))

      const exercise = ExerciseDto.fromExerciseView(exerciseView)

      const response = (await exerciseController.getExercise(id)) as ExerciseDto

      expect(queryBusExecute).toHaveBeenCalledWith(GetExercise.with({ id }))
      expect(response.id).toStrictEqual(exercise.id)
      expect(response.name).toStrictEqual(exercise.name)
      expect(response.description).toStrictEqual(exercise.description)
    })

    it('cannot get an exercise from an invalid id', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')
      const invalidUuid = 'invalidUuid'
      const exception = InvalidUuid.causeTheFormatIsNotValid('invalidUuid')

      queryBusExecute.mockResolvedValue(Either.left(exception))

      const response = exerciseController.getExercise(invalidUuid)

      expect(queryBusExecute).toHaveBeenCalledWith(
        GetExercise.with({ id: invalidUuid }),
      )
      await expect(response).rejects.toThrow(
        new BadRequestException(HttpError.fromExceptions([exception])),
      )
    })

    it('cannot get an exercise that does not exist', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')
      const nonExistentUuid = '29b3d5fa-c770-40a0-b1a0-5ff771f5b5f7'
      const exception = NotFoundExercise.withId(nonExistentUuid)

      queryBusExecute.mockResolvedValue(Either.left(exception))

      const response = exerciseController.getExercise(nonExistentUuid)

      expect(queryBusExecute).toHaveBeenCalledWith(
        GetExercise.with({ id: nonExistentUuid }),
      )
      await expect(response).rejects.toThrow(
        new BadRequestException(HttpError.fromExceptions([exception])),
      )
    })
  })

  describe('PostExercise', () => {
    const idValue = '75c0db11-f5b2-4616-aee6-c531ae602183'
    const id = ExerciseId.fromString(idValue).value as ExerciseId
    const nameValue = 'name'
    const name = ExerciseName.fromString(nameValue).value as ExerciseName
    const descriptionValue = 'description'
    const description = ExerciseDescription.fromString(descriptionValue)
      .value as ExerciseDescription
    const exercise = Exercise.create({ description, id, name })
    const dto = ExerciseDto.fromExercise(exercise)

    beforeEach(() => {
      commandBus = CommandBusMock.mock()
      queryBus = QueryBusMock.mock()
      exerciseController = new ExerciseController(commandBus, queryBus)
    })

    it('creates an exercise', async () => {
      const uuidGenerate = jest.spyOn(Uuid, 'generate')
      const commandBusExecute = jest.spyOn(commandBus, 'execute')

      uuidGenerate.mockReturnValue(idValue)
      commandBusExecute.mockResolvedValue(Either.right(exercise))

      const response = (await exerciseController.createExercise(
        PostExerciseDto.with({
          description: descriptionValue,
          name: nameValue,
        }),
      )) as ExerciseDto

      expect(uuidGenerate).toHaveBeenCalled()
      expect(commandBusExecute).toHaveBeenCalledWith(
        CreateExercise.with({
          description: descriptionValue,
          id: idValue,
          name: nameValue,
        }),
      )
      expect(response.id).toBe(dto.id)
      expect(response.name).toBe(dto.name)
      expect(response.description).toBe(dto.description)
    })

    it.each([
      {
        descriptionMock:
          'InvalidDescription: In the vast expanse of the cosmos, countless stars twinkle in the darkness, each one a beacon of light amidst the void. Galaxies spiral and collide, giving birth to new worlds and cosmic wonders. On our tiny planet Earth, life flourishes in all its forms.',
        nameMock: nameValue,
      },
      {
        descriptionMock: descriptionValue,
        nameMock: ' ',
      },
      {
        descriptionMock: descriptionValue,
        nameMock: 'InvalidName because it is longer than fifty characters',
      },
    ])(
      'cannot create an exercise with invalid params',
      async ({ descriptionMock, nameMock }) => {
        const commandBusExecute = jest.spyOn(commandBus, 'execute')
        const uuidGenerate = jest.spyOn(Uuid, 'generate')
        const exceptions = [
          Either.isLeft(ExerciseDescription.fromString(descriptionMock)) &&
            InvalidExerciseDescription.causeIsTooLong(),
          Either.isLeft(ExerciseName.fromString(nameMock)) && nameMock === ' '
            ? InvalidExerciseName.causeIsBlank()
            : InvalidExerciseName.causeIsTooLong(),
        ]

        uuidGenerate.mockReturnValue(idValue)
        commandBusExecute.mockResolvedValue(Either.left(exceptions))

        const response = exerciseController.createExercise(
          PostExerciseDto.with({
            description: descriptionMock,
            name: nameMock,
          }),
        )

        expect(uuidGenerate).toHaveBeenCalled()
        expect(commandBusExecute).toHaveBeenCalledWith(
          CreateExercise.with({
            description: descriptionMock,
            id: idValue,
            name: nameMock,
          }),
        )
        await expect(response).rejects.toThrow(
          new BadRequestException(HttpError.fromExceptions(exceptions)),
        )
      },
    )

    it('cannot create an exercise whose name is already used by another exercise', async () => {
      const commandBusExecute = jest.spyOn(commandBus, 'execute')
      const uuidGenerate = jest.spyOn(Uuid, 'generate')
      const exceptions = [
        NotCreatedExercise.causeAlreadyExistsOneWithName(nameValue),
      ]

      uuidGenerate.mockReturnValue(idValue)
      commandBusExecute.mockResolvedValue(Either.left(exceptions))

      const response = exerciseController.createExercise(
        PostExerciseDto.with({
          description: descriptionValue,
          name: nameValue,
        }),
      )

      expect(uuidGenerate).toHaveBeenCalled()
      expect(commandBusExecute).toHaveBeenCalledWith(
        CreateExercise.with({
          description: descriptionValue,
          id: idValue,
          name: nameValue,
        }),
      )
      await expect(response).rejects.toThrow(
        new BadRequestException(HttpError.fromExceptions(exceptions)),
      )
    })
  })
})
