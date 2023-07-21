import { BadRequestException } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import NotFoundExercise from '~/exercise/domain/exceptions/not-found'
import ExerciseId from '~/exercise/domain/models/id'
import { InvalidUuid } from '~/shared/domain'
import Either from '~/shared/either'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'
import CommandBusMock from '~/test/mocks/@nestjs/cqrs/command-bus'
import CreateWorkout from '~/workout/application/commands/create-workout'
import InvalidWorkoutReps from '~/workout/domain/exceptions/invalid-reps'
import InvalidWorkoutSets from '~/workout/domain/exceptions/invalid-sets'
import WorkoutId from '~/workout/domain/models/id'
import WorkoutReps from '~/workout/domain/models/reps'
import WorkoutSets from '~/workout/domain/models/sets'
import Workout from '~/workout/domain/models/workout'

import WorkoutDto from '../models/http/dto'
import PostWorkoutDto from '../models/http/post-dto'
import WorkoutsController from './workouts'

describe('WorkoutsController', () => {
  let commandBus: CommandBus
  let workoutsController: WorkoutsController

  describe('PostExercise', () => {
    const idValue = 'b05b2bac-8c53-47aa-8b7f-ea929a869063'
    const id = WorkoutId.fromString(idValue).value as WorkoutId
    const exerciseIdValue = '77d31fea-e192-4c53-936d-dee2a6fabe32'
    const exerciseId = ExerciseId.fromString(exerciseIdValue)
      .value as ExerciseId
    const repsValue = 8
    const reps = WorkoutReps.fromNumber(repsValue).value as WorkoutReps
    const setsValue = 4
    const sets = WorkoutSets.fromNumber(setsValue).value as WorkoutSets
    const workout = Workout.create({ exerciseId, id, reps, sets })
    const dto = WorkoutDto.fromWorkout(workout)

    beforeEach(() => {
      commandBus = CommandBusMock.mock()
      workoutsController = new WorkoutsController(commandBus)
    })

    it('creates a workout', async () => {
      const uuidGenerate = jest.spyOn(Uuid, 'generate')
      const commandBusExecute = jest.spyOn(commandBus, 'execute')

      uuidGenerate.mockReturnValue(idValue)
      commandBusExecute.mockResolvedValue(Either.right(workout))

      const response = (await workoutsController.createWorkout(
        PostWorkoutDto.with({
          exerciseId: exerciseIdValue,
          reps: repsValue,
          sets: setsValue,
        }),
      )) as WorkoutDto

      expect(uuidGenerate).toHaveBeenCalled()
      expect(commandBusExecute).toHaveBeenCalledWith(
        CreateWorkout.with({
          exerciseId: exerciseIdValue,
          id: idValue,
          reps: repsValue,
          sets: setsValue,
        }),
      )
      expect(response.id).toBe(dto.id)
      expect(response.exerciseId).toBe(dto.exerciseId)
      expect(response.reps).toBe(dto.reps)
      expect(response.sets).toBe(dto.sets)
    })

    it.each([
      {
        exerciseIdMock: 'InvalidId',
        repsMock: repsValue,
        setsMock: setsValue,
      },
      {
        exerciseIdMock: exerciseIdValue,
        repsMock: repsValue,
        setsMock: setsValue,
      },
      {
        exerciseIdMock: exerciseIdValue,
        repsMock: -1,
        setsMock: setsValue,
      },
      {
        exerciseIdMock: exerciseIdValue,
        repsMock: 200,
        setsMock: setsValue,
      },
      {
        exerciseIdMock: exerciseIdValue,
        repsMock: repsValue,
        setsMock: 0,
      },
      {
        exerciseIdMock: exerciseIdValue,
        repsMock: repsValue,
        setsMock: 150,
      },
    ])(
      'cannot create a workout with invalid params',
      async ({ exerciseIdMock, repsMock, setsMock }) => {
        const commandBusExecute = jest.spyOn(commandBus, 'execute')
        const uuidGenerate = jest.spyOn(Uuid, 'generate')
        const exceptions = [
          Either.isLeft(ExerciseId.fromString(exerciseIdMock)) &&
            InvalidUuid.causeTheFormatIsNotValid(exerciseIdMock),
          Either.isLeft(WorkoutReps.fromNumber(repsMock)) && repsMock < 1
            ? InvalidWorkoutReps.causeIsNonPositive()
            : InvalidWorkoutReps.causeIsTooHigh(),
          Either.isLeft(WorkoutSets.fromNumber(setsMock)) && setsMock < 1
            ? InvalidWorkoutSets.causeIsNonPositive()
            : InvalidWorkoutSets.causeIsTooHigh(),
        ]

        uuidGenerate.mockReturnValue(idValue)
        commandBusExecute.mockResolvedValue(Either.left(exceptions))

        const response = workoutsController.createWorkout(
          PostWorkoutDto.with({
            exerciseId: exerciseIdMock,
            reps: repsMock,
            sets: setsMock,
          }),
        )

        expect(uuidGenerate).toHaveBeenCalled()
        expect(commandBusExecute).toHaveBeenCalledWith(
          CreateWorkout.with({
            exerciseId: exerciseIdMock,
            id: idValue,
            reps: repsMock,
            sets: setsMock,
          }),
        )
        await expect(response).rejects.toThrow(
          new BadRequestException(HttpError.fromExceptions(exceptions)),
        )
      },
    )

    it('cannot create a workout with an exercise that does not exist', async () => {
      const commandBusExecute = jest.spyOn(commandBus, 'execute')
      const uuidGenerate = jest.spyOn(Uuid, 'generate')
      const exceptions = [NotFoundExercise.withId(exerciseIdValue)]

      uuidGenerate.mockReturnValue(idValue)
      commandBusExecute.mockResolvedValue(Either.left(exceptions))

      const response = workoutsController.createWorkout(
        PostWorkoutDto.with({
          exerciseId: exerciseIdValue,
          reps: repsValue,
          sets: setsValue,
        }),
      )

      expect(uuidGenerate).toHaveBeenCalled()
      expect(commandBusExecute).toHaveBeenCalledWith(
        CreateWorkout.with({
          exerciseId: exerciseIdValue,
          id: idValue,
          reps: repsValue,
          sets: setsValue,
        }),
      )
      await expect(response).rejects.toThrow(
        new BadRequestException(HttpError.fromExceptions(exceptions)),
      )
    })
  })
})
