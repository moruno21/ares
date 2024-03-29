import { BadRequestException } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import CreateRoutine from '~/routine/application/commands/create-routine'
import DeleteRoutine from '~/routine/application/commands/delete-routine'
import EditRoutine from '~/routine/application/commands/edit-routine'
import RoutineView from '~/routine/application/models/view'
import GetRoutine from '~/routine/application/queries/get-routine'
import GetRoutines from '~/routine/application/queries/get-routines'
import InvalidRoutineDescription from '~/routine/domain/exceptions/invalid-description'
import InvalidRoutineName from '~/routine/domain/exceptions/invalid-name'
import NotFoundRoutine from '~/routine/domain/exceptions/not-found'
import RoutineDescription from '~/routine/domain/models/description'
import RoutineId from '~/routine/domain/models/id'
import RoutineName from '~/routine/domain/models/name'
import Routine from '~/routine/domain/models/routine'
import RoutineWorkout from '~/routine/domain/models/workout'
import RoutineDto from '~/routine/infrastructure/models/http/dto'
import PostRoutineDto from '~/routine/infrastructure/models/http/post-dto'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'
import CommandBusMock from '~/test/mocks/@nestjs/cqrs/command-bus'
import QueryBusMock from '~/test/mocks/@nestjs/cqrs/query-bus'
import UserId from '~/user/domain/models/id'

import PutRoutineDto from '../models/http/put-dto'
import RoutinesController from './routines'

describe('RoutinesController', () => {
  let commandBus: CommandBus
  let queryBus: QueryBus
  let routinesController: RoutinesController

  describe('GetRoutines', () => {
    const id = '481e9d6d-86e4-47c0-ab96-9c02a8218618'
    const name = 'name'
    const description = 'description'
    const ownerId = '3f3f448e-c57c-4d8a-9eb5-9fe09f8e67fc'
    const workouts = [
      {
        exerciseId: 'exerciseId',
        exerciseName: 'exerciseName',
        reps: 10,
        sets: 8,
      },
    ]

    const routineViewOne = RoutineView.with({
      description,
      id,
      name,
      ownerId,
      workouts,
    })
    const routineViewTwo = RoutineView.with({
      description,
      id,
      name,
      ownerId,
      workouts,
    })

    beforeEach(() => {
      queryBus = QueryBusMock.mock()
      routinesController = new RoutinesController(commandBus, queryBus)
    })

    it('gets all the routines', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')
      const routineViews = [routineViewOne, routineViewTwo]

      queryBusExecute.mockResolvedValue(routineViews)

      const routines = routineViews.map((routineView) =>
        RoutineDto.fromRoutineView(routineView),
      )

      const response = await routinesController.getRoutines()

      expect(queryBusExecute).toHaveBeenCalledWith(GetRoutines.all())
      expect(response).toStrictEqual(routines)
    })

    it('returns an empty value when there are no routines', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')

      queryBusExecute.mockResolvedValue([])

      const response = await routinesController.getRoutines()

      expect(queryBusExecute).toHaveBeenCalledWith(GetRoutines.all())
      expect(response).toStrictEqual([])
    })
  })

  describe('GetRoutine', () => {
    const id = '0792bf7d-4104-4bee-82c3-39900969e869'
    const name = 'name'
    const description = 'description'
    const ownerId = 'dfeb3822-7679-4b90-95d4-2d6c270c3c89'
    const workouts = [
      {
        exerciseId: 'exerciseId',
        exerciseName: 'exerciseName',
        reps: 8,
        sets: 10,
      },
    ]

    const routineView = RoutineView.with({
      description,
      id,
      name,
      ownerId,
      workouts,
    })

    beforeEach(() => {
      queryBus = QueryBusMock.mock()
      routinesController = new RoutinesController(commandBus, queryBus)
    })

    it('gets a routine from an id', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')

      queryBusExecute.mockResolvedValue(Either.right(routineView))

      const routine = RoutineDto.fromRoutineView(routineView)

      const response = (await routinesController.getRoutine(id)) as RoutineDto

      expect(queryBusExecute).toHaveBeenCalledWith(GetRoutine.with({ id }))
      expect(response.id).toStrictEqual(routine.id)
      expect(response.name).toStrictEqual(routine.name)
      expect(response.description).toStrictEqual(routine.description)
    })

    it('cannot get a routine from an invalid id', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')
      const invalidUuid = 'invalidUuid'
      const exceptions = [InvalidUuid.causeTheFormatIsNotValid('invalidUuid')]

      queryBusExecute.mockResolvedValue(Either.left(exceptions))

      const response = routinesController.getRoutine(invalidUuid)

      expect(queryBusExecute).toHaveBeenCalledWith(
        GetRoutine.with({ id: invalidUuid }),
      )
      await expect(response).rejects.toThrow(
        new BadRequestException(HttpError.fromExceptions(exceptions)),
      )
    })

    it('cannot get a routine that does not exist', async () => {
      const queryBusExecute = jest.spyOn(queryBus, 'execute')
      const nonExistentUuid = 'ca99d6e7-6d2b-4070-8436-c009f48e9b64'
      const exceptions = [NotFoundRoutine.withId(nonExistentUuid)]

      queryBusExecute.mockResolvedValue(Either.left(exceptions))

      const response = routinesController.getRoutine(nonExistentUuid)

      expect(queryBusExecute).toHaveBeenCalledWith(
        GetRoutine.with({ id: nonExistentUuid }),
      )
      await expect(response).rejects.toThrow(
        new BadRequestException(HttpError.fromExceptions(exceptions)),
      )
    })
  })

  describe('PostRoutine', () => {
    const idValue = 'd9783895-1fea-4a1c-8952-8ebf0aeb819e'
    const id = RoutineId.fromString(idValue).value as RoutineId
    const nameValue = 'name'
    const name = RoutineName.fromString(nameValue).value as RoutineName
    const descriptionValue = 'description'
    const description = RoutineDescription.fromString(descriptionValue)
      .value as RoutineDescription
    const ownerIdValue = 'd9b5cc3d-7977-4aa1-86e1-5a4dbc0e3355'
    const ownerId = UserId.fromString(ownerIdValue).value as UserId
    const workoutsValue = [
      {
        exerciseId: 'cda1aca4-ffce-492e-9cf7-b8ded3c7e5ba',
        reps: 10,
        sets: 5,
      },
    ]
    const workouts = workoutsValue.map(
      (workoutValue) =>
        RoutineWorkout.fromValue(workoutValue).value as RoutineWorkout,
    )
    const routine = Routine.create({ description, id, name, ownerId, workouts })
    const dto = RoutineDto.fromRoutine(routine)

    beforeEach(() => {
      commandBus = CommandBusMock.mock()
      routinesController = new RoutinesController(commandBus, queryBus)
    })

    it('creates a routine', async () => {
      const uuidGenerate = jest.spyOn(Uuid, 'generate')
      const commandBusExecute = jest.spyOn(commandBus, 'execute')

      uuidGenerate.mockReturnValue(idValue)
      commandBusExecute.mockResolvedValue(Either.right(routine))

      const response = (await routinesController.createRoutine(
        PostRoutineDto.with({
          description: descriptionValue,
          name: nameValue,
          ownerId: ownerIdValue,
          workouts: workoutsValue,
        }),
      )) as RoutineDto

      expect(uuidGenerate).toHaveBeenCalled()
      expect(commandBusExecute).toHaveBeenCalledWith(
        CreateRoutine.with({
          description: descriptionValue,
          id: idValue,
          name: nameValue,
          ownerId: ownerIdValue,
          workouts: workoutsValue,
        }),
      )
      expect(response.id).toBe(dto.id)
      expect(response.name).toBe(dto.name)
      expect(response.description).toBe(dto.description)
      expect(response.ownerId).toBe(dto.ownerId)
      expect(response.workouts).toStrictEqual(dto.workouts)
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
      'cannot create a routine with invalid params',
      async ({ descriptionMock, nameMock }) => {
        const commandBusExecute = jest.spyOn(commandBus, 'execute')
        const uuidGenerate = jest.spyOn(Uuid, 'generate')
        const exceptions = [
          Either.isLeft(RoutineDescription.fromString(descriptionMock)) &&
            InvalidRoutineDescription.causeIsTooLong(),
          Either.isLeft(RoutineName.fromString(nameMock)) && nameMock === ' '
            ? InvalidRoutineName.causeIsBlank()
            : InvalidRoutineName.causeIsTooLong(),
        ]

        uuidGenerate.mockReturnValue(idValue)
        commandBusExecute.mockResolvedValue(Either.left(exceptions))

        const response = routinesController.createRoutine(
          PostRoutineDto.with({
            description: descriptionMock,
            name: nameMock,
            ownerId: ownerIdValue,
            workouts: workoutsValue,
          }),
        )

        expect(uuidGenerate).toHaveBeenCalled()
        expect(commandBusExecute).toHaveBeenCalledWith(
          CreateRoutine.with({
            description: descriptionMock,
            id: idValue,
            name: nameMock,
            ownerId: ownerIdValue,
            workouts: workoutsValue,
          }),
        )
        await expect(response).rejects.toThrow(
          new BadRequestException(HttpError.fromExceptions(exceptions)),
        )
      },
    )
  })

  describe('PutRoutine', () => {
    const idValue = '4e0bd42f-7c1e-48a2-91cd-35a741212fbd'
    const id = RoutineId.fromString(idValue).value as RoutineId
    const nameValue = 'name'
    const name = RoutineName.fromString(nameValue).value as RoutineName
    const descriptionValue = 'description'
    const description = RoutineDescription.fromString(descriptionValue)
      .value as RoutineDescription
    const ownerIdValue = 'd51e6d74-3fae-494a-ae09-4b85bef2e4a6'
    const ownerId = UserId.fromString(ownerIdValue).value as UserId
    const workoutsValue = [
      {
        exerciseId: '46a14b1c-14c0-4e7d-be7f-56de38d95984',
        reps: 10,
        sets: 5,
      },
    ]
    const workouts = workoutsValue.map(
      (workoutValue) =>
        RoutineWorkout.fromValue(workoutValue).value as RoutineWorkout,
    )
    const routineEdited = Routine.create({
      description,
      id,
      name,
      ownerId,
      workouts,
    })
    const dto = RoutineDto.fromRoutine(routineEdited)

    beforeEach(() => {
      commandBus = CommandBusMock.mock()
      routinesController = new RoutinesController(commandBus, queryBus)
    })

    it('edits a routine', async () => {
      const commandBusExecute = jest.spyOn(commandBus, 'execute')
      commandBusExecute.mockResolvedValue(Either.right(routineEdited))

      const response = (await routinesController.editRoutine(
        id.value,
        PutRoutineDto.with({
          description: descriptionValue,
          name: nameValue,
          ownerId: ownerIdValue,
          workouts: workoutsValue,
        }),
      )) as RoutineDto

      expect(commandBusExecute).toHaveBeenCalledWith(
        EditRoutine.with({
          description: descriptionValue,
          id: idValue,
          name: nameValue,
          ownerId: ownerIdValue,
          workouts: workoutsValue,
        }),
      )

      expect(response.id).toBe(dto.id)
      expect(response.name).toBe(dto.name)
      expect(response.description).toBe(dto.description)
    })

    it('cannot edit a routine that does not exist', async () => {
      const commandBusExecute = jest.spyOn(commandBus, 'execute')
      const nonExistentUuid = 'c53a8440-bc4b-4096-8d97-11c6ddc643d8'
      const exceptions = [NotFoundRoutine.withId(nonExistentUuid)]

      commandBusExecute.mockResolvedValue(Either.left(exceptions))

      const response = routinesController.editRoutine(
        nonExistentUuid,
        PutRoutineDto.with({
          description: descriptionValue,
          name: nameValue,
          ownerId: ownerIdValue,
          workouts: workoutsValue,
        }),
      )

      expect(commandBusExecute).toHaveBeenCalledWith(
        EditRoutine.with({
          description: descriptionValue,
          id: nonExistentUuid,
          name: nameValue,
          ownerId: ownerIdValue,
          workouts: workoutsValue,
        }),
      )
      await expect(response).rejects.toThrow(
        new BadRequestException(HttpError.fromExceptions(exceptions)),
      )
    })
  })

  describe('DeleteRoutine', () => {
    const idValue = 'ffeb17c2-9728-4747-a760-025293e0af42'
    const id = RoutineId.fromString(idValue).value as RoutineId
    const nameValue = 'name'
    const name = RoutineName.fromString(nameValue).value as RoutineName
    const descriptionValue = 'description'
    const description = RoutineDescription.fromString(descriptionValue)
      .value as RoutineDescription
    const ownerIdValue = 'ab17c525-e11b-41f1-96ec-02936a75138f'
    const ownerId = UserId.fromString(ownerIdValue).value as UserId
    const workoutsValue = [
      {
        exerciseId: 'cda1aca4-ffce-492e-9cf7-b8ded3c7e5ba',
        reps: 10,
        sets: 5,
      },
    ]
    const workouts = workoutsValue.map(
      (workoutValue) =>
        RoutineWorkout.fromValue(workoutValue).value as RoutineWorkout,
    )
    const routine = Routine.create({ description, id, name, ownerId, workouts })
    const dto = RoutineDto.fromRoutine(routine)

    beforeEach(() => {
      commandBus = CommandBusMock.mock()
      routinesController = new RoutinesController(commandBus, queryBus)
    })

    it('deletes a routine from an id', async () => {
      const commandBusExecute = jest.spyOn(commandBus, 'execute')

      commandBusExecute.mockResolvedValue(Either.right(routine))

      const response = (await routinesController.deleteRoutine(
        id.value,
      )) as RoutineDto

      expect(commandBusExecute).toHaveBeenCalledWith(
        DeleteRoutine.with({
          id: idValue,
        }),
      )
      expect(response.id).toBe(dto.id)
    })

    it('cannot delete a routine from an invalid id', async () => {
      const commandBusExecute = jest.spyOn(commandBus, 'execute')
      const invalidUuid = 'invalidUuid'
      const exceptions = [InvalidUuid.causeTheFormatIsNotValid('invalidUuid')]

      commandBusExecute.mockResolvedValue(Either.left(exceptions))

      const response = routinesController.deleteRoutine(invalidUuid)

      expect(commandBusExecute).toHaveBeenCalledWith(
        DeleteRoutine.with({ id: invalidUuid }),
      )
      await expect(response).rejects.toThrow(
        new BadRequestException(HttpError.fromExceptions(exceptions)),
      )
    })

    it('cannot delete a routine that does not exist', async () => {
      const commandBusExecute = jest.spyOn(commandBus, 'execute')
      const nonExistentUuid = '9db641ff-75d2-4a42-939d-e65629f03acb'
      const exceptions = [NotFoundRoutine.withId(nonExistentUuid)]

      commandBusExecute.mockResolvedValue(Either.left(exceptions))

      const response = routinesController.deleteRoutine(nonExistentUuid)

      expect(commandBusExecute).toHaveBeenCalledWith(
        DeleteRoutine.with({ id: nonExistentUuid }),
      )
      await expect(response).rejects.toThrow(
        new BadRequestException(HttpError.fromExceptions(exceptions)),
      )
    })
  })
})
