import { BadRequestException } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import CreateRoutine from '~/routine/application/commands/create-routine'
import InvalidRoutineDescription from '~/routine/domain/exceptions/invalid-description'
import InvalidRoutineName from '~/routine/domain/exceptions/invalid-name'
import RoutineDescription from '~/routine/domain/models/description'
import RoutineId from '~/routine/domain/models/id'
import RoutineName from '~/routine/domain/models/name'
import Routine from '~/routine/domain/models/routine'
import RoutineDto from '~/routine/infrastructure/models/http/dto'
import PostRoutineDto from '~/routine/infrastructure/models/http/post-dto'
import Either from '~/shared/either'
import HttpError from '~/shared/http/error'
import Uuid from '~/shared/uuid'
import CommandBusMock from '~/test/mocks/@nestjs/cqrs/command-bus'

import RoutinesController from './routines'

describe('RoutinesController', () => {
  let commandBus: CommandBus
  let routinesController: RoutinesController

  describe('PostRoutine', () => {
    const idValue = 'd9783895-1fea-4a1c-8952-8ebf0aeb819e'
    const id = RoutineId.fromString(idValue).value as RoutineId
    const nameValue = 'name'
    const name = RoutineName.fromString(nameValue).value as RoutineName
    const descriptionValue = 'description'
    const description = RoutineDescription.fromString(descriptionValue)
      .value as RoutineDescription
    const routine = Routine.create({ description, id, name })
    const dto = RoutineDto.fromRoutine(routine)

    beforeEach(() => {
      commandBus = CommandBusMock.mock()
      routinesController = new RoutinesController(commandBus)
    })

    it('creates an routine', async () => {
      const uuidGenerate = jest.spyOn(Uuid, 'generate')
      const commandBusExecute = jest.spyOn(commandBus, 'execute')

      uuidGenerate.mockReturnValue(idValue)
      commandBusExecute.mockResolvedValue(Either.right(routine))

      const response = (await routinesController.createRoutine(
        PostRoutineDto.with({
          description: descriptionValue,
          name: nameValue,
        }),
      )) as RoutineDto

      expect(uuidGenerate).toHaveBeenCalled()
      expect(commandBusExecute).toHaveBeenCalledWith(
        CreateRoutine.with({
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
          }),
        )

        expect(uuidGenerate).toHaveBeenCalled()
        expect(commandBusExecute).toHaveBeenCalledWith(
          CreateRoutine.with({
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
  })
})
